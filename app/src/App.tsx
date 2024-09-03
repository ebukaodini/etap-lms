import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Subjects from "./pages/subjects";
import Lessons from "./pages/lessons";
import Lesson from "./pages/lesson";
import AdminSubjects from "./pages/admin-subjects";
import AdminLessons from "./pages/admin-lessons";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/auth" element={<Auth />} />

      {/* learners */}
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/subjects/:subjectId/lessons" element={<Lessons />} />
      <Route
        path="/subjects/:subjectId/lessons/:lessonId"
        element={<Lesson />}
      />

      {/* admin /teachers */}
      <Route path="/admin/subjects" element={<AdminSubjects />} />
      <Route
        path="/admin/subjects/:subjectId/lessons"
        element={<AdminLessons />}
      />
    </Routes>
  );
}

export default App;
