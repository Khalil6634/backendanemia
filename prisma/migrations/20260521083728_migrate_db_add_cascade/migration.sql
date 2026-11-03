-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'superadmin', 'user');

-- CreateTable
CREATE TABLE "Files" (
    "idFiles" SMALLSERIAL NOT NULL,
    "LettersName" VARCHAR NOT NULL,
    "Perihal" SMALLINT NOT NULL,
    "Size" INTEGER NOT NULL,
    "Type" VARCHAR NOT NULL,
    "Path" VARCHAR NOT NULL,
    "Id_User" SMALLINT NOT NULL,
    "Date" VARCHAR NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("idFiles")
);

-- CreateTable
CREATE TABLE "Perihal" (
    "id_Perihal" SMALLSERIAL NOT NULL,
    "Perihal" VARCHAR NOT NULL,

    CONSTRAINT "Perihal_pkey" PRIMARY KEY ("id_Perihal")
);

-- CreateTable
CREATE TABLE "User" (
    "idUser" SMALLSERIAL NOT NULL,
    "Username" VARCHAR NOT NULL,
    "Email" VARCHAR NOT NULL,
    "NoTelepon" VARCHAR NOT NULL,
    "Password" VARCHAR NOT NULL,
    "AlamatRumah" VARCHAR NOT NULL,
    "role" "Role" DEFAULT 'user',
    "Posisi" VARCHAR NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_NoTelepon_key" ON "User"("NoTelepon");

-- CreateIndex
CREATE UNIQUE INDEX "User_Password_key" ON "User"("Password");

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_Id_User_fkey" FOREIGN KEY ("Id_User") REFERENCES "User"("idUser") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_Perihal_fkey" FOREIGN KEY ("Perihal") REFERENCES "Perihal"("id_Perihal") ON DELETE CASCADE ON UPDATE NO ACTION;
