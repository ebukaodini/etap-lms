import Layout from "../components/layout";

import { useStore } from "../models/useStore";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLessonCard from "../components/admin-lesson-card";
import LogoHeader from "../components/logo-header";

interface AdminLessonsProps {}

const AdminLessons: React.FC<AdminLessonsProps> = () => {
  const { allSubjects, subjectLearners, getLearners } = useStore();
  const [view, setView] = useState<"Lessons" | "Learners">("Lessons");
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const subject = allSubjects?.find(
    (subject) => subject.id === Number(subjectId)
  )!;

  useEffect(() => {
    const loadSubjects = async () => {
      await getLearners(Number(subjectId)).then(() => {
        setIsLoaded(true);
      });
    };

    loadSubjects();
  }, [getLearners, subjectId]);

  return (
    <Layout>
      <LogoHeader />
      <div className="bg-white rounded shadow-md p-4 flex flex-col gap-y-3 w-full">
        {/* subject details */}
        <div className="flex flex-col gap-y-1 mb-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-primary rounded font-semibold text-sm mb-3 w-fit"
          >
            {"<<"} Back
          </button>
          <div className="w-full flex align-middle justify-between">
            <h1 className="font-bold text-primary">{subject.title}</h1>
            <span className="text-gray-500 font-semibold text-xs">
              created {moment(subject.createdAt).fromNow()}
            </span>
          </div>

          <p className="text-gray-500 text-sm">{subject.description}</p>
        </div>

        <div className="flex gap-0 border-b-2 border-primary">
          <button
            type="button"
            onClick={() => setView("Lessons")}
            className={`${
              view === "Lessons" ? "bg-primary text-white" : "text-primary"
            } rounded-t font-semibold text-sm py-2 px-4 w-full`}
          >
            Lessons
          </button>
          <button
            type="button"
            onClick={() => setView("Learners")}
            className={`${
              view === "Learners" ? "bg-primary text-white" : "text-primary"
            } rounded-t font-semibold text-sm py-2 px-4 w-full`}
          >
            Learners
          </button>
        </div>

        {isLoaded === false ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-y-3">
            {/* lessons */}
            {view === "Lessons" &&
              (subject.lessons?.length! > 0 ? (
                subject.lessons?.map((lesson) => (
                  <AdminLessonCard lesson={lesson} />
                ))
              ) : (
                <p className="inline-flex justify-center text-sm py-10">
                  No lessons found.
                </p>
              ))}

            {/* learners */}
            {view === "Learners" &&
              (subjectLearners?.length! > 0 ? (
                subjectLearners?.map((learner) => (
                  <div
                    key={learner.learner.id}
                    className="rounded p-3 border shadow-sm border-gray-200 w-full flex flex-col gap-y-2 hover:cursor-pointer"
                  >
                    <div className="w-full flex align-middle justify-between">
                      <h3 className="text-primary font-semibold text-sm flex flex-col">
                        <span>
                          {learner.learner.firstName} {learner.learner.lastName}
                        </span>
                        <span className="text-xs">{learner.learner.email}</span>
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {
                          learner.lessons.filter(
                            (lesson) => lesson.completed === true
                          ).length
                        }
                        {" / "}
                        {learner.lessons.length} completed
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="inline-flex justify-center text-sm py-10">
                  No learners found.
                </p>
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminLessons;
