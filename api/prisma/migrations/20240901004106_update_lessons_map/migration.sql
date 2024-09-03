/*
  Warnings:

  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_subject_id_fkey";

-- DropTable
DROP TABLE "Lesson";

-- CreateTable
CREATE TABLE "lessons" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "video_link" TEXT NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lessons_title_key" ON "lessons"("title");

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
