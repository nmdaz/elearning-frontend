function addLessonCountToCourses(courses) {
    courses.forEach(function (course) {
         let lessonCount = 0;

         if (course.sections) {
            course.sections.forEach(function (section) {
               if (section.lessons) {
                    section.lessons.forEach(function () {
                        lessonCount++;
                    });
               }                           
            });
         }

         course.lessons_count = lessonCount;
    });
}


export { addLessonCountToCourses };