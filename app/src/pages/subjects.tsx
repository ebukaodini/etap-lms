import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useStore } from "../models/useStore";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import LogoHeader from "../components/logo-header";

interface SubjectProps {}

const Subjects: React.FC<SubjectProps> = () => {
  const [view, setView] = useState<"AllSubjects" | "MySubjects">("AllSubjects");
  const { getSubjects, allSubjects, mySubjects } = useStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSubjects = async () => {
      await getSubjects().then(() => {
        setIsLoaded(true);
      });
    };

    loadSubjects();
  }, [getSubjects]);

  return (
    <Layout>
      <LogoHeader />
      <div className="bg-white rounded shadow-md p-4 flex flex-col gap-y-3 w-full">
        {/* button tabs */}
        <div className="flex gap-0 border-b-2 border-primary">
          <button
            type="button"
            onClick={() => setView("AllSubjects")}
            className={`${
              view === "AllSubjects" ? "bg-primary text-white" : "text-primary"
            } rounded-t font-semibold text-sm py-2 px-4 w-full`}
          >
            All Subjects
          </button>
          <button
            type="button"
            onClick={() => setView("MySubjects")}
            className={`${
              view === "MySubjects" ? "bg-primary text-white" : "text-primary"
            } rounded-t font-semibold text-sm py-2 px-4 w-full`}
          >
            My Subjects
          </button>
        </div>

        {isLoaded === false ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-y-3">
            {/* All Subjects */}
            {view === "AllSubjects" &&
              (allSubjects?.length! > 0 ? (
                allSubjects?.map((subject) => (
                  <div
                    key={subject.id}
                    onClick={() => {
                      navigate(`/subjects/${subject.id}/lessons`);
                    }}
                    className="rounded p-3 border shadow-sm border-gray-200 w-full flex flex-col gap-y-2 hover:cursor-pointer"
                  >
                    <div className="w-full flex align-middle justify-between">
                      <h3 className="text-primary font-semibold text-sm">
                        {subject.title}
                      </h3>
                      <span className="text-gray-500 font-semibold text-xs">
                        {subject.lessons?.length} lessons
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm">
                      {subject.description}
                    </p>

                    <div className="w-full flex justify-end">
                      <span className="text-gray-500 font-semibold text-xs">
                        created {moment(subject.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="inline-flex justify-center text-sm py-10">
                  No subjects found.
                </p>
              ))}

            {/* My Subject */}
            {view === "MySubjects" &&
              (mySubjects?.length! > 0 ? (
                mySubjects?.map((subject) => (
                  <div
                    key={subject.subject.id}
                    onClick={() => {
                      navigate(`/subjects/${subject.subject.id}/lessons`);
                    }}
                    className="rounded p-3 border shadow-sm border-gray-200 w-full flex flex-col gap-y-2 hover:cursor-pointer"
                  >
                    <div className="w-full flex align-middle justify-between">
                      <h3 className="text-primary font-semibold text-sm">
                        {subject.subject.title}
                      </h3>
                      <span className="text-gray-500 font-semibold text-xs">
                        {
                          subject.lessons.filter((lesson) => lesson.completed)
                            .length
                        }
                        {" / "}
                        {subject.lessons?.length}
                        {/* lessons completed */}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm">
                      {subject.subject.description}
                    </p>

                    <div className="w-full flex justify-end">
                      <span className="text-gray-500 font-semibold text-xs">
                        started {moment(subject.startedAt).fromNow()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="inline-flex justify-center text-sm py-10">
                  No subjects found.
                </p>
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Subjects;
