-- CreateEnum
CREATE TYPE "EUserType" AS ENUM ('T', 'M', 'F');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type" "EUserType" NOT NULL DEFAULT 'F';
