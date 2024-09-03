import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useStore } from "../models/useStore";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import LogoHeader from "../components/logo-header";

interface AdminSubjectProps {}

const AdminSubjects: React.FC<AdminSubjectProps> = () => {
  const { getSubjects, allSubjects } = useStore();
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
    <Layout guards={["ADMIN", "TEACHER"]}>
      <LogoHeader />
      <div className="bg-white rounded shadow-md p-4 flex flex-col gap-y-3 w-full">
        <h1 className="font-bold text-xl text-primary">Subjects</h1>

        {isLoaded === false ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-y-3">
            {/* All Subjects */}
            {allSubjects?.length! > 0 ? (
              allSubjects?.map((subject) => (
                <div
                  key={subject.id}
                  onClick={() => {
                    navigate(`/admin/subjects/${subject.id}/lessons`);
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

                  <p className="text-gray-500 text-sm">{subject.description}</p>

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
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminSubjects;
