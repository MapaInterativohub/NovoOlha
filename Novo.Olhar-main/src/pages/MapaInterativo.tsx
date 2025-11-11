import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import { MapPin, Search, Filter } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

// 🔧 Correção para ícones padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapaInterativo = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedCity, setSelectedCity] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [locais, setLocais] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);

  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // 📍 Recebe local vindo da página "EncontreApoio"
  const location = useLocation();
  const localSelecionado = location.state?.local;

  // 🔹 Busca locais e extrai cidades únicas
  const getLocais = () => {
    axios
      .get("http://localhost:3001/api/locais")
      .then((res) => {
        setLocais(res.data);

        const uniqueCities = Array.from(
          new Set(res.data.map((l) => l.cidade?.trim()).filter(Boolean))
        );
        setCities(uniqueCities as string[]);
      })
      .catch((err) => console.error("Erro ao buscar locais", err));
  };

  // 🔹 Busca categorias
  const getCategorias = () => {
    axios
      .get("http://localhost:3001/api/categorias")
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Erro ao buscar categorias", err));
  };

  useEffect(() => {
    getCategorias();
    getLocais();
  }, []);

  // 🔹 Botões de categoria
  const categoryButtons = [
    { id_categoria: "todos", nome: "Todos", color: "gray" },
    ...categorias.map((cat) => ({
      id_categoria: cat.id_categoria,
      nome: cat.nome,
      color: cat.color,
    })),
  ];

  // 🔹 Filtragem principal
  const filteredLocations = locais.filter((local) => {
    const matchesCategory =
      selectedCategory === "todos" ||
      local.id_categoria === selectedCategory ||
      local.categoria?.id_categoria === selectedCategory;

    const matchesSearch =
      local.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      local.descricao.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity =
      selectedCity === "todas" ||
      local.cidade?.toLowerCase() === selectedCity.toLowerCase();

    return matchesCategory && matchesSearch && matchesCity;
  });

  // 🔹 Cor da categoria
  const getCategoryColor = (local) => {
    const categoria =
      local.categoria ||
      categorias.find((c) => c.id_categoria === local.id_categoria);
    return categoria ? categoria.color : "gray";
  };

  // 🔹 Ícone personalizado
  const getMarkerIcon = (local) => {
    const color = getCategoryColor(local);
    const colorMap: Record<string, string> = {
      blue: "#3B82F6",
      green: "#10B981",
      purple: "#8B5CF6",
      red: "#EF4444",
      gray: "#6B7280",
    };

    return L.divIcon({
      className: "custom-div-icon",
      html: `<div style="background-color: ${colorMap[color] || colorMap.gray
        }; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [25, 25],
      iconAnchor: [12, 12],
    });
  };

  // 🔹 Inicializa o mapa
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView(
      [-20.2976, -40.2958],
      10
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // 🔹 Atualiza marcadores com base no filtro
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) =>
      mapRef.current?.removeLayer(marker)
    );
    markersRef.current = [];

    filteredLocations.forEach((local) => {
      const marker = L.marker([local.latitude, local.longitude], {
        icon: getMarkerIcon(local),
      }).addTo(mapRef.current!);

      const popupContent = `
  <div class="p-3 min-w-[250px] font-sans">
    <h3 class="font-bold text-lg text-gray-900 mb-1">
      ${local.nome}
    </h3>

    <p class="text-sm text-gray-700 mb-3 leading-snug">
      ${local.descricao?.replace(/\n/g, "<br>") || ""}
    </p>

    <div class="flex items-start text-sm text-gray-600 mb-1">
      <span class="mr-2">📍</span>
      <span>
        ${local.rua || ""}${local.numero ? `, ${local.numero}` : ""} - ${local.bairro || ""}
        ${local.cidade ? `, ${local.cidade}` : ""}${local.estado ? `/${local.estado}` : ""}
      </span>
    </div>

    ${local.telefone
          ? `
        <div class="flex items-start text-sm text-gray-600">
          <span class="mr-2">📞</span>
          <span>${local.telefone}</span>
        </div>
        `
          : ""
        }
  </div>
`;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    if (markersRef.current.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [filteredLocations]);

  // 🔹 Centraliza o mapa se vier um local selecionado da página anterior
  useEffect(() => {
    if (!localSelecionado || !mapRef.current) return;

    // Desestruturação segura
    const {
      latitude,
      longitude,
      nome,
      descricao,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      telefone
    } = localSelecionado;

    // Remove marcador anterior (caso já exista um)
    if (mapRef.current._highlightMarker) {
      mapRef.current.removeLayer(mapRef.current._highlightMarker);
    }

    // Ícone de destaque
    const highlightIcon = L.divIcon({
      className: "custom-div-icon",
      html: `
      <div style="
        background-color: #E11D48;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.4);
      "></div>
    `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    // Adiciona o marcador ao mapa
    const marker = L.marker([latitude, longitude], { icon: highlightIcon }).addTo(mapRef.current);

    // Armazena referência do marcador para limpeza posterior
    mapRef.current._highlightMarker = marker;

    // Monta popup com formatação e ícones
    const popupHtml = `
    <div class="p-3 min-w-[260px]">
      <h3 class="font-bold text-lg mb-2">${nome}</h3>
      <p class="text-sm text-gray-700 mb-2">
        ${descricao
        ?.replace(/\n/g, "<br>")
        ?.replace(/\/strong/g, "</strong>")
        ?.replace(/strong/g, "<strong>")
      || ""}
      </p>
      <div class="text-sm text-gray-600 mb-2 flex items-start">
        <span class="mr-1">📍</span>
        <span>${rua || ""}${numero ? `, ${numero}` : ""}${bairro ? ` - ${bairro}` : ""}${cidade ? `, ${cidade}` : ""
      }${estado ? `/${estado}` : ""}</span>
      </div>
      ${telefone
        ? `<div class="text-sm text-gray-600 flex items-center">
              <span class="mr-1">📞</span> ${telefone}
            </div>`
        : ""
      }
    </div>
  `;

    // Associa o popup
    marker.bindPopup(popupHtml).openPopup();

    // Centraliza o mapa no local
    mapRef.current.setView([latitude, longitude], 15);

    // Limpa o marcador quando o componente for desmontado
    return () => {
      if (mapRef.current && mapRef.current._highlightMarker) {
        mapRef.current.removeLayer(mapRef.current._highlightMarker);
        mapRef.current._highlightMarker = null;
      }
    };
  }, [localSelecionado]);


  // 🔹 Centraliza o mapa na cidade selecionada
  useEffect(() => {
    if (!mapRef.current || selectedCity === "todas") return;

    const cityLocals = locais.filter(
      (l) => l.cidade?.toLowerCase() === selectedCity.toLowerCase()
    );
    if (cityLocals.length > 0) {
      const group = new L.FeatureGroup(
        cityLocals.map((l) => L.marker([l.latitude, l.longitude]))
      );
      mapRef.current.fitBounds(group.getBounds().pad(0.2));
    }
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Mapa Interativo - Espírito Santo
        </h1>
        <p className="text-gray-600 mt-2">
          Veja instituições, centros de apoio e locais de atendimento no ES
        </p>
      </section>

      {/* Filtros */}
      <section className="px-6 pb-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Busca */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar locais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Filtro por cidade */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 h-5 w-5" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
            >
              <option value="todas">Todas as cidades</option>
              {cities.map((cidade, index) => (
                <option key={index} value={cidade}>
                  {cidade}
                </option>
              ))}
            </select>
          </div>

          {/* Categorias */}
          <div className="flex flex-wrap gap-2">
            {categoryButtons.map((cat) => (
              <button
                key={cat.id_categoria}
                onClick={() => setSelectedCategory(cat.id_categoria)}
                className={`px-4 py-2 rounded-lg font-medium transition ${selectedCategory === cat.id_categoria
                  ? `bg-${cat.color}-500 text-white`
                  : `bg-${cat.color}-100 text-${cat.color}-700 hover:bg-${cat.color}-200`
                  }`}
              >
                {cat.nome}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa e Lista */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Mapa */}
        <div
          ref={mapContainerRef}
          className="bg-white rounded-xl shadow-lg h-[500px]"
        />

        {/* Lista de locais */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Locais Encontrados ({filteredLocations.length})
          </h3>

          {filteredLocations.map((local) => {
            const color = getCategoryColor(local);
            return (
              <div
                key={local.id_local}
                className="bg-white rounded-xl shadow p-4 mb-4 hover:shadow-lg cursor-pointer"
                onClick={() =>
                  mapRef.current?.setView([local.latitude, local.longitude], 15)
                }
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-gray-800">{local.nome}</h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs bg-${color}-100 text-${color}-700`}
                  >
                    {local.categoria?.nome ||
                      categorias.find(
                        (c) => c.id_categoria === local.id_categoria
                      )?.nome}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{local.descricao}</p>
                <p className="text-xs text-gray-500">
                  📍 {local.rua}, {local.numero} - {local.bairro}{" "}
                  {local.cidade ? `(${local.cidade})` : ""}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MapaInterativo;
