/*
  Warnings:

  - You are about to drop the `Disposisi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `suratApproved` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Disposisi" DROP CONSTRAINT "Disposisi_idSurat_fkey";

-- DropForeignKey
ALTER TABLE "Disposisi" DROP CONSTRAINT "Disposisi_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_Id_User_fkey";

-- DropForeignKey
ALTER TABLE "suratApproved" DROP CONSTRAINT "suratApproved_idSurat_fkey";

-- DropTable
DROP TABLE "Disposisi";

-- DropTable
DROP TABLE "Files";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "suratApproved";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "orderDate" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "currentStatus" TEXT NOT NULL,
    "tshirtType" TEXT NOT NULL,
    "tshirtColor" TEXT NOT NULL,
    "totalQty" INTEGER NOT NULL,
    "printingType" TEXT NOT NULL,
    "printingColors" TEXT[],
    "printingArea" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
