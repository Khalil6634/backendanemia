/*
  Warnings:

  - You are about to drop the column `Perihal` on the `Files` table. All the data in the column will be lost.
  - You are about to drop the `Perihal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_Id_User_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_Perihal_fkey";

-- AlterTable
ALTER TABLE "Files" DROP COLUMN "Perihal",
ADD COLUMN     "KategoriSurat" VARCHAR NOT NULL DEFAULT '',
ADD COLUMN     "perihal" VARCHAR NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Perihal";

-- CreateTable
CREATE TABLE "suratApproved" (
    "id" SMALLSERIAL NOT NULL,
    "AprovedDate" VARCHAR NOT NULL,
    "idSurat" SMALLINT,

    CONSTRAINT "suratApproved_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disposisi" (
    "id" SMALLSERIAL NOT NULL,
    "Date" VARCHAR NOT NULL,
    "idUser" SMALLINT,
    "idSurat" SMALLINT,
    "Description" VARCHAR,
    "NamaPenerima" VARCHAR,

    CONSTRAINT "Disposisi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_Id_User_fkey" FOREIGN KEY ("Id_User") REFERENCES "User"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suratApproved" ADD CONSTRAINT "suratApproved_idSurat_fkey" FOREIGN KEY ("idSurat") REFERENCES "Files"("idFiles") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disposisi" ADD CONSTRAINT "Disposisi_idSurat_fkey" FOREIGN KEY ("idSurat") REFERENCES "Files"("idFiles") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disposisi" ADD CONSTRAINT "Disposisi_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;
