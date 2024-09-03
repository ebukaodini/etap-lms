/*
  Warnings:

  - Added the required column `learner_subject_id` to the `learner_lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "learner_lessons" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "learner_subject_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "learner_subjects" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "learner_lessons" ADD CONSTRAINT "learner_lessons_learner_subject_id_fkey" FOREIGN KEY ("learner_subject_id") REFERENCES "learner_subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
