/*
  Warnings:

  - You are about to drop the column `activo` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `productos` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `activo`,
    ADD COLUMN `disponible` BOOLEAN NULL DEFAULT true;

-- DropTable
DROP TABLE `productos`;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `usuarioId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Usuario_disponible_idx` ON `Usuario`(`disponible`);

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
