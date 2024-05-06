-- CreateTable
CREATE TABLE `Week` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `teamId` INTEGER NOT NULL,
    `budget` INTEGER NULL DEFAULT 100,
    `transfers` INTEGER NULL DEFAULT 2,
    `willCard` INTEGER NULL DEFAULT 1,
    `willCardActive` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_teamId_key`(`teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `goals` INTEGER NULL DEFAULT 0,
    `assists` INTEGER NULL DEFAULT 0,
    `locks` INTEGER NULL DEFAULT 0,
    `present` BOOLEAN NULL DEFAULT false,
    `goalAgainst` INTEGER NULL DEFAULT 0,
    `missedPenalty` INTEGER NULL DEFAULT 0,
    `interception` INTEGER NULL DEFAULT 0,
    `savedPenalty` INTEGER NULL DEFAULT 0,
    `criminalCommitted` INTEGER NULL DEFAULT 0,
    `emptyGoal` BOOLEAN NULL DEFAULT false,
    `goalsConceded` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPlayer` (
    `userId` INTEGER NOT NULL,
    `playerId` INTEGER NOT NULL,
    `valoration` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `playerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamname` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `badPoints` INTEGER NULL DEFAULT 0,
    `captainId` INTEGER NULL,
    `alignId` INTEGER NOT NULL,
    `bankingId` INTEGER NOT NULL,

    UNIQUE INDEX `Team_alignId_key`(`alignId`),
    UNIQUE INDEX `Team_bankingId_key`(`bankingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Align` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Banking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlignPlayer` (
    `playerId` INTEGER NOT NULL,
    `alignId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`playerId`, `alignId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BankingPlayer` (
    `playerId` INTEGER NOT NULL,
    `bankingId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`playerId`, `bankingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Season` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamSeason` (
    `teamId` INTEGER NOT NULL,
    `seasonId` INTEGER NOT NULL,
    `goals` INTEGER NOT NULL,
    `assists` INTEGER NOT NULL,
    `locks` INTEGER NOT NULL,
    `present` BOOLEAN NOT NULL,
    `goalAgainst` INTEGER NOT NULL,
    `missedPenalty` INTEGER NOT NULL,
    `interception` INTEGER NOT NULL,
    `savedPenalty` INTEGER NOT NULL,
    `criminalCommitted` INTEGER NOT NULL,
    `emptyGoal` BOOLEAN NOT NULL,
    `goalsConceded` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,

    PRIMARY KEY (`teamId`, `seasonId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerSeason` (
    `playerId` INTEGER NOT NULL,
    `seasonId` INTEGER NOT NULL,
    `goals` INTEGER NOT NULL,
    `assists` INTEGER NOT NULL,
    `locks` INTEGER NOT NULL,
    `present` BOOLEAN NOT NULL,
    `goalAgainst` INTEGER NOT NULL,
    `missedPenalty` INTEGER NOT NULL,
    `interception` INTEGER NOT NULL,
    `savedPenalty` INTEGER NOT NULL,
    `criminalCommitted` INTEGER NOT NULL,
    `emptyGoal` BOOLEAN NOT NULL,
    `goalsConceded` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,

    PRIMARY KEY (`playerId`, `seasonId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAdmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPlayer` ADD CONSTRAINT `UserPlayer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPlayer` ADD CONSTRAINT `UserPlayer_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_captainId_fkey` FOREIGN KEY (`captainId`) REFERENCES `Player`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_alignId_fkey` FOREIGN KEY (`alignId`) REFERENCES `Align`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_bankingId_fkey` FOREIGN KEY (`bankingId`) REFERENCES `Banking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlignPlayer` ADD CONSTRAINT `AlignPlayer_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlignPlayer` ADD CONSTRAINT `AlignPlayer_alignId_fkey` FOREIGN KEY (`alignId`) REFERENCES `Align`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BankingPlayer` ADD CONSTRAINT `BankingPlayer_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BankingPlayer` ADD CONSTRAINT `BankingPlayer_bankingId_fkey` FOREIGN KEY (`bankingId`) REFERENCES `Banking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamSeason` ADD CONSTRAINT `TeamSeason_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamSeason` ADD CONSTRAINT `TeamSeason_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `Season`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerSeason` ADD CONSTRAINT `PlayerSeason_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerSeason` ADD CONSTRAINT `PlayerSeason_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `Season`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
