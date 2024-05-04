/*
  Warnings:

  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_captainId_fkey`;

-- AlterTable
ALTER TABLE `Team` MODIFY `captainId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `username` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_captainId_fkey` FOREIGN KEY (`captainId`) REFERENCES `Player`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
