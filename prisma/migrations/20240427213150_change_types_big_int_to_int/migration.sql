/*
  Warnings:

  - You are about to alter the column `price` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `budget` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `Player` MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `budget` INTEGER NOT NULL;
