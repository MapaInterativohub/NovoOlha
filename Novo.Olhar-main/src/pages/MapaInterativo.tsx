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

  const [loscais, setLocais] = useState([]);
  const getLocais = () => {
    axios
      .get("http://localhost:3001/api/locais")
      .then((res) => {
        console.log(res.data);
        setLocais(res.data);
      })
      .catch((err) => {
        console.error("Erro na busca", err);
      });
  };

  const [categoria, setCategoria] = useState([]);
  const getCategorias = () => {
    axios
      .get("http://localhost:3001/api/categorias")
      .then((res) => {
        console.log(res.data);
        setLocais(res.data);
      })
      .catch((err) => {
        console.error("Erro na busca", err);
      });
  };

  useEffect(() => {
    getCategorias();
    getLocais();
  }, []);

  const categories = [
    { id: "todos", name: "Todos", color: "gray" },
    { id: "eventos", name: "Eventos", color: "blue" },
    { id: "cursos", name: "Cursos", color: "green" },
    { id: "networking", name: "Networking", color: "purple" },
    { id: "saude", name: "Saúde", color: "red" },
  ];

  const locations = [
    {
      id: 1,
      name: "SEBRAE Espírito Santo - Vitória",
      category: "eventos",
      address:
        "Av. Nossa Senhora dos Navegantes, 675 - Enseada do Suá, Vitória - ES",
      description:
        "Centro de apoio ao empreendedorismo capixaba com eventos e capacitações",
      nextEvent: "Workshop de Empreendedorismo Digital - 25/06/2024",
      distance: "0 km",
      lat: -20.3155,
      lng: -40.2849,
    },
    {
      id: 2,
      name: "UFES - Universidade Federal do ES",
      category: "cursos",
      address: "Av. Fernando Ferrari, 514 - Goiabeiras, Vitória - ES",
      description:
        "Principal universidade pública do estado com diversos cursos de extensão",
      nextEvent: "Curso de Gestão de Projetos - 30/06/2024",
      distance: "5 km",
      lat: -20.2767,
      lng: -40.3056,
    },
    {
      id: 3,
      name: "Porto de Vitória Business Center",
      category: "networking",
      address: "Av. Saturnino de Brito, 360 - Praia do Canto, Vitória - ES",
      description: "Centro empresarial com eventos de networking e coworking",
      nextEvent: "Happy Hour Empresarial - 27/06/2024",
      distance: "3 km",
      lat: -20.2963,
      lng: -40.2925,
    },
    {
      id: 4,
      name: "Hospital Santa Rita de Cássia",
      category: "saude",
      address:
        "R. Dr. João Batista Miranda Amaral, 267 - Nazareth, Vitória - ES",
      description: "Centro de excelência médica com programas de bem-estar",
      nextEvent: "Palestra sobre Qualidade de Vida - 28/06/2024",
      distance: "4 km",
      lat: -20.3089,
      lng: -40.2942,
    },
    {
      id: 5,
      name: "Tech Vila Velha Hub",
      category: "eventos",
      address:
        "Av. Luciano das Neves, 2418 - Divino Espírito Santo, Vila Velha - ES",
      description: "Hub de inovação e tecnologia da Grande Vitória",
      nextEvent: "Meetup de Desenvolvedores ES - 02/07/2024",
      distance: "8 km",
      lat: -20.3272,
      lng: -40.2925,
    },
    {
      id: 6,
      name: "FAESA Centro Universitário",
      category: "cursos",
      address:
        "R. Orlando Damasceno Ferreira, 405 - Jardim da Penha, Vitória - ES",
      description: "Universidade com foco em empreendedorismo e inovação",
      nextEvent: "MBA em Gestão Empresarial - 01/07/2024",
      distance: "6 km",
      lat: -20.2856,
      lng: -40.3078,
    },
    {
      id: 7,
      name: "FINDES - Federação das Indústrias do ES",
      category: "networking",
      address: "Av. Nossa Senhora da Penha, 2053 - Santa Lúcia, Vitória - ES",
      description:
        "Centro de relacionamento empresarial e desenvolvimento industrial",
      nextEvent: "Fórum da Indústria Capixaba - 03/07/2024",
      distance: "7 km",
      lat: -20.2889,
      lng: -40.3056,
    },
    {
      id: 8,
      name: "Centro Médico Rede Vitória",
      category: "saude",
      address: "Av. Américo Buaiz, 501 - Enseada do Suá, Vitória - ES",
      description: "Complexo médico com programas de saúde ocupacional",
      nextEvent: "Workshop de Saúde Mental no Trabalho - 29/06/2024",
      distance: "2 km",
      lat: -20.3167,
      lng: -40.2889,
    },
    {
      id: 9,
      name: "Cachoeiro Business Center",
      category: "eventos",
      address:
        "Av. Francisco Lacerda de Aguiar, 200 - Guandu, Cachoeiro de Itapemirim - ES",
      description: "Centro empresarial do sul do estado",
      nextEvent: "Seminário de Agronegócios - 05/07/2024",
      distance: "135 km",
      lat: -20.8483,
      lng: -41.1133,
    },
    {
      id: 10,
      name: "IFES Campus Linhares",
      category: "cursos",
      address: "Av. Filogônio Peixoto, 2220 - Aviso, Linhares - ES",
      description: "Instituto Federal com cursos técnicos e superiores",
      nextEvent: "Curso de Automação Industrial - 08/07/2024",
      distance: "140 km",
      lat: -19.3911,
      lng: -40.0719,
    },
  ];

  const filteredLocations = locations.filter((location) => {
    const matchesCategory =
      selectedCategory === "todos" || location.category === selectedCategory;
    const matchesSearch =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.id === category);
    return cat ? cat.color : "gray";
  };

  const getMarkerIcon = (category: string) => {
    const color = getCategoryColor(category);
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

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map centered on Espírito Santo
    mapRef.current = L.map(mapContainerRef.current).setView(
      [-20.2976, -40.2958],
      10
    );

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add filtered markers
    filteredLocations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: getMarkerIcon(location.category),
      }).addTo(mapRef.current!);

      const popupContent = `
        <div class="p-3 min-w-[250px]">
          <h3 class="font-bold text-lg mb-2">${location.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${location.address}</p>
          <p class="text-sm mb-2">${location.description}</p>
          <div class="flex items-center text-green-600 text-sm">
            <span class="font-medium">${location.nextEvent}</span>
          </div>
          <div class="mt-2 text-xs text-gray-500">${location.distance}</div>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    // Fit map to show all markers if there are any
    if (markersRef.current.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [filteredLocations]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 mb-6">
              <Map className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mapa Interativo - Espírito Santo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubra oportunidades de crescimento profissional e empresarial
              no estado do Espírito Santo. Conecte-se com instituições, eventos
              e recursos da sua região.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar locais no ES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? `bg-${category.color}-500 text-white`
                      : `bg-${category.color}-100 text-${category.color}-700 hover:bg-${category.color}-200`
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map and Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interactive Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden z-40 h-full">
              <div
                ref={mapContainerRef}
                className="w-full h-full"
                style={{ minHeight: "500px" }}
              />
            </div>

            {/* Results List */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Locais Encontrados no ES ({filteredLocations.length})
              </h3>

              {filteredLocations.map((location) => {
                const colorClass = getCategoryColor(location.category);
                return (
                  <div
                    key={location.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => {
                      if (mapRef.current) {
                        mapRef.current.setView(
                          [location.lat, location.lng],
                          15
                        );
                        const marker = markersRef.current.find(
                          (m) =>
                            Math.abs(m.getLatLng().lat - location.lat) <
                              0.001 &&
                            Math.abs(m.getLatLng().lng - location.lng) < 0.001
                        );
                        if (marker) {
                          marker.openPopup();
                        }
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {location.name}
                        </h4>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">{location.address}</span>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-${colorClass}-100 text-${colorClass}-700`}
                      >
                        {
                          categories.find((c) => c.id === location.category)
                            ?.name
                        }
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{location.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">
                          {location.nextEvent}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {location.distance}
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredLocations.length === 0 && (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Nenhum local encontrado
                  </h3>
                  <p className="text-gray-500">
                    Tente ajustar os filtros ou termo de busca
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-500 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Recursos do Mapa - Espírito Santo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <MapPin className="h-8 w-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Localização Precisa no ES
              </h3>
              <p className="text-purple-100">
                Encontre instituições e eventos em todo o estado do Espírito
                Santo
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Calendar className="h-8 w-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Eventos Capixabas
              </h3>
              <p className="text-purple-100">
                Informações sobre eventos e oportunidades no Espírito Santo
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Users className="h-8 w-8 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Comunidade Capixaba
              </h3>
              <p className="text-purple-100">
                Conecte-se com profissionais e empresários do ES
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapaInterativo;
