
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { MapPin, Phone, Clock, Users, Shield, Heart, Search, Filter } from 'lucide-react';

const EncontreApoio = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const supportCenters = [
    {
      id: 1,
      name: 'Casa Abrigo Rosa',
      category: 'abrigo',
      address: 'Rua das Flores, 456 - Centro',
      city: 'São Paulo/SP',
      phone: '(11) 1234-5678',
      hours: '24 horas',
      services: ['Abrigo temporário', 'Apoio psicológico', 'Assistência jurídica'],
      description: 'Casa de acolhimento para mulheres em situação de vulnerabilidade e seus filhos.'
    },
    {
      id: 2,
      name: 'Centro de Referência da Mulher',
      category: 'orientacao',
      address: 'Av. da Esperança, 789 - Vila Nova',
      city: 'São Paulo/SP',
      phone: '(11) 2345-6789',
      hours: 'Segunda a Sexta: 8h às 17h',
      services: ['Orientação jurídica', 'Apoio psicológico', 'Cursos profissionalizantes'],
      description: 'Centro especializado em orientação e apoio integral à mulher.'
    },
    {
      id: 3,
      name: 'Delegacia da Mulher - Centro',
      category: 'juridico',
      address: 'Rua da Justiça, 123 - Centro',
      city: 'São Paulo/SP',
      phone: '(11) 3456-7890',
      hours: '24 horas',
      services: ['Boletim de ocorrência', 'Medidas protetivas', 'Investigação'],
      description: 'Delegacia especializada no atendimento de crimes contra a mulher.'
    },
    {
      id: 4,
      name: 'ONG Mulheres Unidas',
      category: 'ong',
      address: 'Rua da Solidariedade, 321 - Bela Vista',
      city: 'São Paulo/SP',
      phone: '(11) 4567-8901',
      hours: 'Segunda a Sexta: 9h às 16h',
      services: ['Grupos de apoio', 'Capacitação profissional', 'Assistência social'],
      description: 'ONG dedicada ao empoderamento e apoio às mulheres.'
    },
    {
      id: 5,
      name: 'CAPS - Centro de Atenção Psicossocial',
      category: 'saude',
      address: 'Av. da Saúde, 654 - Jardim América',
      city: 'São Paulo/SP',
      phone: '(11) 5678-9012',
      hours: 'Segunda a Sexta: 7h às 19h',
      services: ['Atendimento psicológico', 'Terapia em grupo', 'Acompanhamento médico'],
      description: 'Centro especializado em saúde mental e apoio psicossocial.'
    },
    {
      id: 6,
      name: 'Casa de Passagem Esperança',
      category: 'abrigo',
      address: 'Rua do Acolhimento, 987 - Zona Norte',
      city: 'São Paulo/SP',
      phone: '(11) 6789-0123',
      hours: '24 horas',
      services: ['Acolhimento emergencial', 'Refeições', 'Encaminhamentos'],
      description: 'Acolhimento temporário para mulheres em situação de emergência.'
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos', icon: Heart },
    { id: 'abrigo', name: 'Abrigo', icon: Shield },
    { id: 'juridico', name: 'Jurídico', icon: Users },
    { id: 'orientacao', name: 'Orientação', icon: Users },
    { id: 'saude', name: 'Saúde Mental', icon: Heart },
    { id: 'ong', name: 'ONGs', icon: Users }
  ];

  const filteredCenters = supportCenters.filter(center => {
    const matchesCategory = selectedCategory === 'todos' || center.category === selectedCategory;
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'abrigo': return Shield;
      case 'juridico': return Users;
      case 'orientacao': return Users;
      case 'saude': return Heart;
      case 'ong': return Users;
      default: return Heart;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'abrigo': return 'from-red-400 to-rose-400';
      case 'juridico': return 'from-blue-400 to-indigo-400';
      case 'orientacao': return 'from-green-400 to-emerald-400';
      case 'saude': return 'from-purple-400 to-pink-400';
      case 'ong': return 'from-orange-400 to-amber-400';
      default: return 'from-rose-400 to-pink-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Encontre Apoio
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Localize centros de apoio, abrigos, serviços jurídicos e organizações 
              que oferecem suporte especializado na sua região.
            </p>
          </div>

          {/* Busca e Filtros */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou serviço..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="lg:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Filtros por Categoria */}
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-rose-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-rose-50 shadow-md'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Lista de Centros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((center) => {
              const Icon = getCategoryIcon(center.category);
              const colorClass = getCategoryColor(center.category);
              
              return (
                <div key={center.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`h-2 bg-gradient-to-r ${colorClass} rounded-t-xl`}></div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`bg-gradient-to-br ${colorClass} rounded-lg p-2`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {categories.find(cat => cat.id === center.category)?.name}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{center.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{center.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{center.address}, {center.city}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{center.phone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{center.hours}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Serviços oferecidos:</p>
                      <div className="flex flex-wrap gap-1">
                        {center.services.map((service, index) => (
                          <span
                            key={index}
                            className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200">
                      Entrar em Contato
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCenters.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
                <p className="text-gray-600">Tente ajustar sua busca ou filtros para encontrar o apoio que você precisa.</p>
              </div>
            </div>
          )}

          {/* Informações Emergenciais */}
          <div className="mt-12 bg-rose-100 border border-rose-200 rounded-xl p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-rose-800 mb-4">Em Caso de Emergência</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <Phone className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                  <p className="font-semibold text-rose-800">Central da Mulher</p>
                  <p className="text-2xl font-bold text-rose-600">180</p>
                  <p className="text-sm text-gray-600">Gratuito e sigiloso</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Phone className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                  <p className="font-semibold text-rose-800">Polícia Militar</p>
                  <p className="text-2xl font-bold text-rose-600">190</p>
                  <p className="text-sm text-gray-600">Emergências</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Phone className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                  <p className="font-semibold text-rose-800">SAMU</p>
                  <p className="text-2xl font-bold text-rose-600">192</p>
                  <p className="text-sm text-gray-600">Urgências médicas</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EncontreApoio;
