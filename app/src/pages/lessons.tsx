import Layout from "../components/layout";
import LogoHeader from "../components/logo-header";
import { useStore } from "../models/useStore";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

interface LessonsProps {}

const Lessons: React.FC<LessonsProps> = () => {
  const { allSubjects, mySubjects, startSubject } = useStore();
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const subject = allSubjects?.find(
    (subject) => subject.id === Number(subjectId)
  )!;

  const handleStartSubject = (subjectId: number, lessonId: number) => {
    startSubject(subjectId)
      .then(() => {
        navigate(`/subjects/${subjectId}/lessons/${lessonId}`);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

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

        <div className="flex flex-col gap-y-3">
          {subject.lessons?.map((lesson) => (
            <div
              key={lesson.id}
              className="rounded p-3 border shadow-sm border-gray-200 w-full flex flex-col gap-y-2 hover:cursor-pointer"
            >
              <div className="w-full flex align-middle justify-between">
                <h3 className="text-primary font-semibold text-sm">
                  {lesson.title}
                </h3>
              </div>

              <p className="text-gray-500 text-sm">{lesson.description}</p>

              <div className="w-full flex justify-end">
                {mySubjects
                  ?.map((subject) => subject.subject.id)
                  .includes(subject.id) ? (
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/subjects/${subjectId}/lessons/${lesson.id}`)
                    }
                    className="bg-primary text-white rounded font-semibold text-sm py-1 px-3"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStartSubject(subject.id, lesson.id)}
                    className="bg-primary text-white rounded font-semibold text-sm py-1 px-3"
                  >
                    Start
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Lessons;
