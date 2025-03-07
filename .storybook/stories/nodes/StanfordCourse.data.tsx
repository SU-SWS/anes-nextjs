import {NodeStanfordCourse} from "@lib/gql/__generated__/drupal.d"
import {faker} from "@faker-js/faker"

export const StanfordCourseData = () => {
  return {
    __typename: "NodeStanfordCourse",
    id: "f121f36b-a993-4386-80a2-12c67fa3fb53",
    title: faker.word.words(5),
    status: true,
    path: "/courses/physwell27",
    changed: {
      timezone: "America/Los_Angeles",
      time: "2023-08-18T13:32:57-07:00",
    },
    created: {
      timezone: "America/Los_Angeles",
      time: "2023-07-21T10:47:31-07:00",
    },
    body: {
      processed: faker.word.words(100),
    },
    suCourseAcademicYear: "2023-2024",
    suCourseCode: "27",
    suCourseId: 102675,
    suCourseInstructors: ["Thornton, M.", "Lee, S.", "Fendrick, L."],
    suCourseLink: {
      url: "http://explorecourses.stanford.edu/search?q=PHYSWELL27",
      title: "",
    },
    suCourseQuarters: [
      {
        __typename: "TermSuCourseQuarter",
        id: "68944821-ab8c-4f0c-98f7-f5242ab89ddf",
        name: faker.word.words(2),
        path: "/courses/test-term",
        weight: 0,
        parent: null,
      },
      {
        __typename: "TermSuCourseQuarter",
        id: "1e2402c2-f27e-4fc8-be1b-63768929de94",
        name: faker.word.words(2),
        path: "/courses/test-term-2",
        weight: 0,
        parent: null,
      },
    ],
    suCourseSectionUnits: "1",
    suCourseSubject: {
      __typename: "TermSuCourseSubject",
      id: "2a30758d-f296-4d32-b07e-2dc02582cddf",
      name: faker.word.words(1),
      path: "/courses/term",
      weight: 0,
      parent: null,
    },
    suCourseTags: null,
  } as unknown as NodeStanfordCourse
}
