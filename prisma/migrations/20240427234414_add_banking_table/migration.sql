/*
  Warnings:

  - A unique constraint covering the columns `[bankingId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bankingId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Team` ADD COLUMN `bankingId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Banking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BankingPlayer` (
    `playerId` INTEGER NOT NULL,
    `bankingId` INTEGER NOT NULL,

    PRIMARY KEY (`playerId`, `bankingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Team_bankingId_key` ON `Team`(`bankingId`);

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_bankingId_fkey` FOREIGN KEY (`bankingId`) REFERENCES `Banking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BankingPlayer` ADD CONSTRAINT `BankingPlayer_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BankingPlayer` ADD CONSTRAINT `BankingPlayer_bankingId_fkey` FOREIGN KEY (`bankingId`) REFERENCES `Banking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
