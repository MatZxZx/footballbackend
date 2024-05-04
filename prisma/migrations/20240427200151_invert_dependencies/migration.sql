/*
  Warnings:

  - You are about to drop the column `userId` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_userId_fkey`;

-- AlterTable
ALTER TABLE `Team` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `teamId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_teamId_key` ON `User`(`teamId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
