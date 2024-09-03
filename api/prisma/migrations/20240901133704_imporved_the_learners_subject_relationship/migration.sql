-- AlterTable
ALTER TABLE "learner_lessons" ADD COLUMN     "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "learner_subjects" ADD COLUMN     "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
