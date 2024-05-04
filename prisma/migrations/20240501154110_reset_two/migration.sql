/*
  Warnings:

  - You are about to drop the `Banking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BankingPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BankingPlayer` DROP FOREIGN KEY `BankingPlayer_bankingId_fkey`;

-- DropForeignKey
ALTER TABLE `BankingPlayer` DROP FOREIGN KEY `BankingPlayer_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_bankingId_fkey`;

-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_captainId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamPlayer` DROP FOREIGN KEY `TeamPlayer_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamPlayer` DROP FOREIGN KEY `TeamPlayer_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_teamId_fkey`;

-- DropTable
DROP TABLE `Banking`;

-- DropTable
DROP TABLE `BankingPlayer`;

-- DropTable
DROP TABLE `Player`;

-- DropTable
DROP TABLE `Team`;

-- DropTable
DROP TABLE `TeamPlayer`;

-- DropTable
DROP TABLE `User`;
