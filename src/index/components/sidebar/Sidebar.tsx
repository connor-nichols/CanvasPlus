import { createSignal } from "solid-js";
import { getCourses } from "../../lib/courseData";
import { Course } from "../../lib/types/Course";
import CourseOnSidebar from "./CourseOnSidebar";
import SidebarItem from "./SidebarItem";
import SidebarToggle from "./SidebarToggle";
import SidebarToggleIcon from "./SidebarToggleIcon";

export default function Sidebar(props) {
  const [courses, setCourses] = createSignal<Course[] | undefined>(undefined);

  const placeholder = () => {
    if (courses() === undefined) return <p>Loading</p>;
    else if (courses().length === 0) return <p>Nothing to see here</p>;
    else return undefined;
  };

  getCourses().then((c) => {
    console.log(c);

    setCourses(c);
  });

  return (
    <div className="fixed w-80 bg-cyan-50 h-full text-sm overflow-scroll">
      {placeholder() ?? (
        <div className="p-1">
          {courses()?.map((c) => (
            <CourseOnSidebar course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
