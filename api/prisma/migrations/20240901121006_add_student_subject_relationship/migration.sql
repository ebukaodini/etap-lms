-- CreateTable
CREATE TABLE "learner_subjects" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,

    CONSTRAINT "learner_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learner_lessons" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "lesson_id" INTEGER NOT NULL,

    CONSTRAINT "learner_lessons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "learner_subjects" ADD CONSTRAINT "learner_subjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learner_subjects" ADD CONSTRAINT "learner_subjects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learner_lessons" ADD CONSTRAINT "learner_lessons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learner_lessons" ADD CONSTRAINT "learner_lessons_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
