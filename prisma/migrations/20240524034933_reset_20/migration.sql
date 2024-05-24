/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayerSeason` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamSeason` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPlayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Week` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PlayerSeason` DROP FOREIGN KEY `PlayerSeason_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `PlayerSeason` DROP FOREIGN KEY `PlayerSeason_seasonId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamPlayer` DROP FOREIGN KEY `TeamPlayer_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamPlayer` DROP FOREIGN KEY `TeamPlayer_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamSeason` DROP FOREIGN KEY `TeamSeason_seasonId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamSeason` DROP FOREIGN KEY `TeamSeason_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `UserPlayer` DROP FOREIGN KEY `UserPlayer_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `UserPlayer` DROP FOREIGN KEY `UserPlayer_userId_fkey`;

-- DropTable
DROP TABLE `Player`;

-- DropTable
DROP TABLE `PlayerSeason`;

-- DropTable
DROP TABLE `Season`;

-- DropTable
DROP TABLE `Team`;

-- DropTable
DROP TABLE `TeamPlayer`;

-- DropTable
DROP TABLE `TeamSeason`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `UserAdmin`;

-- DropTable
DROP TABLE `UserPlayer`;

-- DropTable
DROP TABLE `Week`;
