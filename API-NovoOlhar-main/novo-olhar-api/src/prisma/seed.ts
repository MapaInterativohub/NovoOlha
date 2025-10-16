import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Limpando banco de dados...");
  await prisma.carrossel.deleteMany();
  await prisma.local.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.gestor.deleteMany();

  console.log("👤 Criando gestor admin...");
  const senhaHash = await bcrypt.hash("admin123", 10);

  const gestor = await prisma.gestor.create({
    data: {
      nome: "Administrador Geral",
      email: "admin@novo-olhar.com",
      telefone: "(27) 99999-9999",
      data_nascimento: new Date("1990-01-01"),
      cpf: "12345678900",
      senha: senhaHash, // ✅ campo obrigatório agora incluído
    },
  });

  console.log("🎨 Criando categorias...");
  await prisma.categoria.createMany({
    data: [
      {
        nome: "Centro de Apoio Social",
        descricao: "Atendimento psicológico e assistencial",
        color: "blue",
      },
      {
        nome: "Delegacia da Mulher",
        descricao: "Atendimento especializado para mulheres vítimas de violência",
        color: "red",
      },
      {
        nome: "Abrigo Temporário",
        descricao: "Abrigos e casas de passagem para mulheres em situação de risco",
        color: "green",
      },
      {
        nome: "Assessoria Jurídica",
        descricao: "Apoio jurídico gratuito ou acessível",
        color: "purple",
      },
    ],
  });

  console.log("📍 Criando locais de exemplo...");
  await prisma.local.create({
    data: {
      nome: "Centro de Apoio Social Margaridas",
      descricao:
        "Oferece acolhimento psicológico e jurídico a mulheres em situação de vulnerabilidade.",
      breve: "Acolhimento e apoio social",
      telefone: "(27) 99263-2077",
      email: "apoio@margaridas.org",
      imagem:
        "https://images.pexels.com/photos/33777878/pexels-photo-33777878.jpeg",
      latitude: -20.3369528,
      longitude: -40.3606059,
      numero: "258",
      complemento: "Sala 2",
      cep: "29140-070",
      bairro: "Jardim América",
      rua: "Rua das Margaridas",
      cidade: "Cariacica",
      estado: "ES",
      id_categoria: 1,
      id_gestor: gestor.id_gestor,
    },
  });

  console.log("🖼️ Criando slides de carrossel...");
  await prisma.carrossel.createMany({
    data: [
      {
        titulo: "Rede de Apoio em Todo o Brasil",
        descricao: "Conecte-se com instituições próximas e seguras.",
        imagem: "https://placehold.co/800x400",
        ordem: 1,
        ativo: true,
        id_gestor: gestor.id_gestor,
      },
      {
        titulo: "Empreendedorismo Feminino",
        descricao: "Transforme suas ideias em negócios de sucesso.",
        imagem:
          "https://universo.uniateneu.edu.br/wp-content/uploads/2024/06/Empreendedorismo.jpg",
        ordem: 2,
        ativo: true,
        id_gestor: gestor.id_gestor,
      },
    ],
  });

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
