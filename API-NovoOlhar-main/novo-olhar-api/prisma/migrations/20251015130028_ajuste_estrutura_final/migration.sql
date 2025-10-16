/*
  Warnings:

  - You are about to alter the column `nome` on the `Categoria` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Added the required column `color` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categoria" ADD COLUMN     "color" VARCHAR(50) NOT NULL,
ALTER COLUMN "nome" SET DATA TYPE VARCHAR(100);
