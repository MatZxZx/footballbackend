/*
  Warnings:

  - Added the required column `position` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Player` ADD COLUMN `position` VARCHAR(191) NOT NULL;
