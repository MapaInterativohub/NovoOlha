import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import { Map, MapPin, Calendar, Users, Search, Filter } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Fix for default markers in Leaflet
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
  const [searchTerm, setSearchTerm] = useState("");
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [locais, setLocais] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);

  // Busca os locais
  const getLocais = () => {
    axios
      .get("http://localhost:3001/api/locais")
      .then((res) => {
        console.log("Locais:", res.data);
        setLocais(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar locais", err);
      });
  };

  // Busca as categorias
  const getCategorias = () => {
    axios
      .get("http://localhost:3001/api/categorias")
      .then((res) => {
        console.log("Categorias:", res.data);
        setCategorias(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar categorias", err);
      });
  };

  useEffect(() => {
    getCategorias();
    getLocais();
  }, []);

  // 🔹 Cria a lista de categorias para os botões de filtro
  const categoryButtons = [
    { id_categoria: "todos", nome: "Todos", color: "gray" },
    ...categorias.map((cat) => ({
      id_categoria: cat.id_categoria,
      nome: cat.nome,
      color: cat.color,
    })),
  ];

  // 🔹 Filtragem de locais
  const filteredLocations = locais.filter((local) => {
    const matchesCategory =
      selectedCategory === "todos" ||
      local.id_categoria === selectedCategory ||
      local.categoria?.id_categoria === selectedCategory;
    const matchesSearch =
      local.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      local.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 🔹 Retorna a cor da categoria de um local
  const getCategoryColor = (local) => {
    const categoria =
      local.categoria ||
      categorias.find((c) => c.id_categoria === local.id_categoria);
    return categoria ? categoria.color : "gray";
  };

  // 🔹 Ícones personalizados do mapa
  const getMarkerIcon = (local) => {
    const color = getCategoryColor(local);
    const colorMap: { [key: string]: string } = {
      blue: "#3B82F6",
      green: "#10B981",
      purple: "#8B5CF6",
      red: "#EF4444",
      gray: "#6B7280",
    };

    return L.divIcon({
      className: "custom-div-icon",
      html: `<div style="background-color: ${
        colorMap[color] || colorMap.gray
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

  // 🔹 Atualiza os marcadores no mapa
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
        <div class="p-3 min-w-[250px]">
          <h3 class="font-bold text-lg mb-2">${local.nome}</h3>
          <p class="text-sm text-gray-600 mb-2">${local.rua}, ${
        local.numero
      } - ${local.bairro}</p>
          <p class="text-sm mb-2">${local.descricao}</p>
          <div class="flex items-center text-sm text-gray-500">
            ${local.telefone ? `📞 ${local.telefone}` : ""}
          </div>
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

          {/* Categorias */}
          <div className="flex flex-wrap gap-2">
            {categoryButtons.map((cat) => (
              <button
                key={cat.id_categoria}
                onClick={() => setSelectedCategory(cat.id_categoria)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat.id_categoria
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

        {/* Lista */}
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
                onClick={() => {
                  mapRef.current?.setView([local.latitude, local.longitude], 15);
                }}
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
                  📍 {local.rua}, {local.numero} - {local.bairro}
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
