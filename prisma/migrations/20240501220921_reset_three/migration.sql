/*
  Warnings:

  - You are about to drop the `Align` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AlignPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Banking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BankingPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayerSeason` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamSeason` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPlayer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AlignPlayer` DROP FOREIGN KEY `AlignPlayer_alignId_fkey`;

-- DropForeignKey
ALTER TABLE `AlignPlayer` DROP FOREIGN KEY `AlignPlayer_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `BankingPlayer` DROP FOREIGN KEY `BankingPlayer_bankingId_fkey`;

-- DropForeignKey
ALTER TABLE `BankingPlayer` DROP FOREIGN KEY `BankingPlayer_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `PlayerSeason` DROP FOREIGN KEY `PlayerSeason_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `PlayerSeason` DROP FOREIGN KEY `PlayerSeason_seasonId_fkey`;

-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_alignId_fkey`;

-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_bankingId_fkey`;

-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_captainId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamSeason` DROP FOREIGN KEY `TeamSeason_dateId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamSeason` DROP FOREIGN KEY `TeamSeason_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `UserPlayer` DROP FOREIGN KEY `UserPlayer_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `UserPlayer` DROP FOREIGN KEY `UserPlayer_userId_fkey`;

-- DropTable
DROP TABLE `Align`;

-- DropTable
DROP TABLE `AlignPlayer`;

-- DropTable
DROP TABLE `Banking`;

-- DropTable
DROP TABLE `BankingPlayer`;

-- DropTable
DROP TABLE `Player`;

-- DropTable
DROP TABLE `PlayerSeason`;

-- DropTable
DROP TABLE `Season`;

-- DropTable
DROP TABLE `Team`;

-- DropTable
DROP TABLE `TeamSeason`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `UserPlayer`;
