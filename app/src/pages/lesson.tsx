import Layout from "../components/layout";
import { useStore } from "../models/useStore";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import LogoHeader from "../components/logo-header";

interface LessonProps {}

const Lesson: React.FC<LessonProps> = () => {
  const { mySubjects, completeLesson } = useStore();
  const { subjectId, lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = mySubjects
    ?.find((subject) => subject.subject.id === Number(subjectId))!
    .lessons.find((lesson) => lesson.lesson.id === Number(lessonId))!;

  const handleComplete = async () => {
    await completeLesson(lesson.id).catch((error) => {
      console.log({ error });
    });
  };

  return (
    <Layout>
      <LogoHeader />
      <div className="bg-white rounded shadow-md p-4 flex flex-col gap-y-3 w-full">
        <div className="flex flex-col gap-y-5 mb-5">
          {/* back button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-primary rounded font-semibold text-sm w-fit"
          >
            {"<<"} Back
          </button>

          <div className="w-full shadow-sm bg-black flex justify-center ">
            <ReactPlayer
              width={"100%"}
              controls
              url={lesson.lesson.videoLink}
              onEnded={handleComplete}
            />
          </div>

          {/* other lessons */}
          <div className="flex flex-col gap-y-2">
            <div className="w-full flex align-middle justify-between">
              <h1 className="font-bold text-lg text-primary">
                {lesson.lesson.title}
              </h1>
              <span className="text-gray-500 font-semibold text-xs">
                started {moment(lesson.startedAt).fromNow()}
              </span>
            </div>

            <p className="text-gray-500 text-sm">{lesson.lesson.description}</p>
          </div>

          <div className="w-full flex flex-col gap-y-2">
            {mySubjects
              ?.find((subject) => subject.subject.id === Number(subjectId))!
              .lessons.map((lesson) => (
                <div
                  key={lesson.lesson.id}
                  onClick={() =>
                    navigate(
                      `/subjects/${subjectId}/lessons/${lesson.lesson.id}`,
                      { replace: true }
                    )
                  }
                  className={`rounded p-3 border shadow-sm ${
                    lesson.lesson.id === Number(lessonId)
                      ? "border-primary"
                      : "border-gray-200"
                  } w-full flex flex-col gap-y-2 hover:cursor-pointer`}
                >
                  <div className="w-full flex align-middle justify-between">
                    <h3 className="text-primary font-semibold text-sm">
                      {lesson.lesson.title}
                    </h3>
                    <span className="text-green-500 font-semibold text-xs">
                      {lesson.completed && "completed"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Lesson;
