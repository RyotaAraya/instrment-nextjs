/*
  Warnings:

  - Added the required column `description` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image1` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image2` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plant` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repairedContent` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `progress` on the `Todo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Plant" AS ENUM ('BH', 'PW', 'SP');

-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('NOTIFY', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image1" TEXT NOT NULL,
ADD COLUMN     "image2" TEXT NOT NULL,
ADD COLUMN     "plant" "Plant" NOT NULL,
ADD COLUMN     "repairedContent" TEXT NOT NULL,
DROP COLUMN "progress",
ADD COLUMN     "progress" "Progress" NOT NULL;
