-- CreateTable
CREATE TABLE "Categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Gestor" (
    "id_gestor" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "data_nascimento" TIMESTAMP(3),
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Gestor_pkey" PRIMARY KEY ("id_gestor")
);

-- CreateTable
CREATE TABLE "Local" (
    "id_local" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "breve" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "imagem" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "numero" TEXT,
    "complemento" TEXT,
    "id_categoria" INTEGER NOT NULL,
    "id_gestor" INTEGER NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "bairro" TEXT,
    "rua" TEXT,
    "cep" TEXT,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id_local")
);

-- CreateTable
CREATE TABLE "Carrossel" (
    "id_carrossel" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "imagem" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "id_gestor" INTEGER NOT NULL,

    CONSTRAINT "Carrossel_pkey" PRIMARY KEY ("id_carrossel")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gestor_email_key" ON "Gestor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Gestor_cpf_key" ON "Gestor"("cpf");

-- AddForeignKey
ALTER TABLE "Local" ADD CONSTRAINT "Local_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Local" ADD CONSTRAINT "Local_id_gestor_fkey" FOREIGN KEY ("id_gestor") REFERENCES "Gestor"("id_gestor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrossel" ADD CONSTRAINT "Carrossel_id_gestor_fkey" FOREIGN KEY ("id_gestor") REFERENCES "Gestor"("id_gestor") ON DELETE RESTRICT ON UPDATE CASCADE;
