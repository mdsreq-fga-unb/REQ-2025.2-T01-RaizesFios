/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "produtos" (
    "produto_id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" TEXT,
    "preco" DECIMAL(10,2) NOT NULL,
    "sku" VARCHAR(50) NOT NULL,
    "imagemUrl" VARCHAR(255),
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "categoria_id" INTEGER NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("produto_id")
);

-- CreateTable
CREATE TABLE "estoque" (
    "estoque_id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "produto_id" INTEGER NOT NULL,

    CONSTRAINT "estoque_pkey" PRIMARY KEY ("estoque_id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produtos_sku_key" ON "produtos"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "estoque_produto_id_key" ON "estoque"("produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque" ADD CONSTRAINT "estoque_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE;
