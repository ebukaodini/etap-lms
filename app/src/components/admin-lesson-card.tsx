import ReactPlayer from "react-player";
import { Lesson } from "../models/types";
import { useState } from "react";

interface AdminLessonCardProps {
  lesson: Lesson;
}

const AdminLessonCard: React.FC<AdminLessonCardProps> = ({ lesson }) => {
  const [state, toggle] = useState(false);

  return (
    <div
      key={lesson.id}
      onClick={() => toggle(!state)}
      className="rounded p-3 border shadow-sm border-gray-200 w-full flex flex-col gap-y-2 hover:cursor-pointer"
    >
      <div className="w-full flex align-middle justify-between">
        <h3 className="text-primary font-semibold text-sm">{lesson.title}</h3>
      </div>

      <p className="text-gray-500 text-sm">{lesson.description}</p>

      <div
        className={`w-full shadow-sm bg-black flex justify-center ease-in-out ${
          state ? "flex" : "hidden"
        }`}
      >
        <ReactPlayer width={"100%"} controls url={lesson.videoLink} />
      </div>
    </div>
  );
};

export default AdminLessonCard;
