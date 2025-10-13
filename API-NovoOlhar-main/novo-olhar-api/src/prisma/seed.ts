import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';

async function main() {
  const hashed = await bcrypt.hash('senhaSegura123', 10);
  const gestor = await prisma.gestor.create({
    data: {
      nome: 'Mariana Alves',
      email: 'admin@novoolhar.com',
      telefone: '11988887777',
      data_nascimento: new Date('1990-03-14'),
      cpf: '12345678900',
      senha: hashed
    }
  });

  const cat1 = await prisma.categoria.create({ data: { nome: 'Centro de Apoio Social', descricao: 'Atendimento psicológico e assistencial' } });
  const cat2 = await prisma.categoria.create({ data: { nome: 'Delegacia da Mulher', descricao: 'Atendimento especializado para mulheres vítimas de violência' } });

  await prisma.local.create({
    data: {
      nome: 'Centro de Acolhimento Luz do Amanhã',
      descricao: 'Oferece suporte psicológico e jurídico gratuito.',
      breve: 'Acolhimento e apoio',
      telefone: '1130225566',
      email: 'contato@luzdoamanha.org',
      imagem: 'https://placehold.co/400x200',
      latitude: -23.5489,
      longitude: -46.6388,
      numero: '150',
      complemento: 'Sala 3',
      cidade: 'São Paulo',
      estado: 'SP',
      bairro: 'Centro',
      rua: 'Av. Liberdade',
      cep: '01002-000',
      id_categoria: cat1.id_categoria,
      id_gestor: gestor.id_gestor
    }
  });

  await prisma.local.create({
    data: {
      nome: 'Casa Refúgio Esperança',
      descricao: 'Espaço seguro com apoio assistencial 24h.',
      breve: 'Apoio 24h',
      telefone: '1145892356',
      email: 'contato@refugioesperanca.org',
      imagem: 'https://placehold.co/400x200',
      latitude: -22.9068,
      longitude: -43.1729,
      numero: '250',
      complemento: 'Próx. à praça central',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      bairro: 'Glória',
      rua: 'Rua da Paz',
      cep: '20031-050',
      id_categoria: cat2.id_categoria,
      id_gestor: gestor.id_gestor
    }
  });

  await prisma.carrossel.createMany({
    data: [
      {
        titulo: 'Rede de Apoio em Todo o Brasil',
        descricao: 'Conecte-se com instituições próximas e seguras.',
        imagem: 'https://placehold.co/800x400',
        ordem: 1,
        id_gestor: gestor.id_gestor
      },
      {
        titulo: 'Acolhimento e Informação',
        descricao: 'Encontre centros de apoio psicológico e jurídico.',
        imagem: 'https://placehold.co/800x400',
        ordem: 2,
        id_gestor: gestor.id_gestor
      }
    ]
  });

  console.log('Seed finalizado');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
