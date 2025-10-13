import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import ToolForm from '../components/ToolForm';
import { Briefcase, Lightbulb, TrendingUp, Users, Target, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Empreendedorismo = () => {
  const { toast } = useToast();
  const [selectedTool, setSelectedTool] = useState<null | typeof tools[0]>(null);

  const sections = [
    {
      title: 'Ideação e Validação',
      icon: Lightbulb,
      content: 'Aprenda a identificar oportunidades de mercado, validar suas ideias de negócio e desenvolver propostas de valor únicas que realmente resolvam problemas reais.'
    },
    {
      title: 'Planejamento Estratégico',
      icon: Target,
      content: 'Desenvolva um plano de negócios sólido, defina sua estratégia de mercado e estabeleça metas claras para o crescimento sustentável da sua empresa.'
    },
    {
      title: 'Marketing e Vendas',
      icon: TrendingUp,
      content: 'Domine as estratégias de marketing digital, construa sua marca pessoal e aprenda técnicas eficazes de vendas para aumentar sua receita.'
    },
    {
      title: 'Liderança e Equipe',
      icon: Users,
      content: 'Desenvolva habilidades de liderança, aprenda a montar e gerenciar equipes de alta performance e crie uma cultura organizacional forte.'
    }
  ];

  const tools = [
    {
      name: 'Canvas de Modelo de Negócios',
      description: 'Ferramenta visual para mapear e validar seu modelo de negócio de forma estruturada.',
      benefits: 'Ajuda a visualizar propostas de valor, segmentos de clientes e fontes de receita.'
    },
    {
      name: 'Análise SWOT',
      description: 'Método para analisar forças, fraquezas, oportunidades e ameaças do seu negócio.',
      benefits: 'Oferece visão completa do cenário interno e externo da empresa.'
    },
    {
      name: 'Matriz de Validação de Hipóteses',
      description: 'Framework para testar suposições sobre seu negócio antes de investir recursos.',
      benefits: 'Reduz riscos e aumenta chances de sucesso do empreendimento.'
    },
    {
      name: 'Funil de Vendas',
      description: 'Processo estruturado para converter prospects em clientes pagantes.',
      benefits: 'Melhora conversão e previsibilidade de receitas.'
    },
    {
      name: 'Plano Financeiro',
      description: 'Projeções financeiras detalhadas incluindo custos, receitas e fluxo de caixa.',
      benefits: 'Garante sustentabilidade financeira e facilita captação de investimentos.'
    },
    {
      name: 'Roadmap de Produto',
      description: 'Planejamento estratégico do desenvolvimento e evolução do seu produto.',
      benefits: 'Alinha equipe e garante entrega de valor contínuo aos clientes.'
    }
  ];

  const handleToolClick = (tool: typeof tools[0]) => {
    setSelectedTool(tool);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-6">
              <Briefcase className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Empreendedorismo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transforme suas ideias em negócios de sucesso. Aprenda as estratégias, 
              ferramentas e metodologias necessárias para empreender com confiança.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Tools Section */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white mb-16">
            <div className="flex items-center mb-6">
              <Zap className="h-8 w-8 mr-3" />
              <h3 className="text-2xl font-bold">Ferramentas Essenciais</h3>
            </div>
            <p className="text-blue-100 mb-6 text-lg">
              Clique nas ferramentas para começar a utilizá-las em seu negócio:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <div
                  key={tool.name}
                  onClick={() => handleToolClick(tool)}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-200 cursor-pointer group"
                >
                  <span className="font-medium group-hover:text-blue-100 transition-colors">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Primeiros Passos no Empreendedorismo</h3>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-4">
                  O empreendedorismo é uma jornada que exige preparação, dedicação e estratégia. 
                  Antes de iniciar qualquer negócio, é fundamental entender o mercado, identificar 
                  oportunidades e validar suas ideias.
                </p>
                <p className="mb-4">
                  Comece pesquisando seu mercado-alvo, entendendo as necessidades dos clientes 
                  e analisando a concorrência. Use ferramentas como entrevistas, pesquisas e 
                  prototipagem para validar suas hipóteses antes de investir recursos significativos.
                </p>
                <p>
                  Lembre-se: o fracasso é parte do processo de aprendizado. Cada experiência, 
                  seja positiva ou negativa, contribui para seu crescimento como empreendedor.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Construindo um Modelo de Negócio Sustentável</h3>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-4">
                  Um modelo de negócio bem estruturado é a base de qualquer empresa de sucesso. 
                  Ele define como sua empresa cria, entrega e captura valor para seus clientes.
                </p>
                <p className="mb-4">
                  Utilize o Canvas de Modelo de Negócio para visualizar e organizar os principais 
                  componentes do seu negócio: proposta de valor, segmentos de clientes, canais 
                  de distribuição, relacionamento com clientes, fontes de receita, recursos-chave, 
                  atividades-chave, parcerias e estrutura de custos.
                </p>
                <p>
                  Mantenha flexibilidade para adaptar seu modelo conforme aprende mais sobre 
                  o mercado e seus clientes. A inovação contínua é essencial para manter a 
                  competitividade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedTool && (
        <ToolForm
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </div>
  );
};

export default Empreendedorismo;
