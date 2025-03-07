import {NodeStanfordPerson} from "@lib/gql/__generated__/drupal.d"
import {faker} from "@faker-js/faker"

export const StanfordPersonData = () => {
  return {
    __typename: "NodeStanfordPerson",
    id: "47a624fd-c3cf-4fb2-9aef-ed560f2ec052",
    title: faker.word.words(3),
    status: true,
    path: "/people/shea-mckinney",
    changed: {timezone: "America/Los_Angeles", time: "2023-09-14T12:08:41-07:00"},
    created: {timezone: "America/Los_Angeles", time: "2023-07-21T09:38:23-07:00"},
    body: {
      processed: faker.word.words(50),
    },
    suPersonAcademicAppt: null,
    suPersonAdminAppts: null,
    suPersonAffiliations: null,
    suPersonComponents: null,
    suPersonEducation: [faker.word.words(5), faker.word.words(5)],
    suPersonEmail: faker.internet.email(),
    suPersonFax: null,
    suPersonFirstName: faker.person.firstName(),
    suPersonFullTitle: faker.person.jobTitle(),
    suPersonLastName: faker.person.lastName(),
    suPersonLinks: [
      {url: "http://www.google.com/", title: faker.word.words(2)},
      {
        url: "https://drupal.org/",
        title: faker.word.words(2),
      },
      {url: "http://linkedin.com", title: faker.word.words(2)},
    ],
    suPersonLocationAddress: null,
    suPersonLocationName: null,
    suPersonMailCode: null,
    suPersonMapUrl: null,
    suPersonMobilePhone: null,
    suPersonPhoto: {
      __typename: "MediaImage",
      id: "ce220be2-89fc-4b49-8dc6-71089c152d5d",
      name: faker.person.fullName(),
      mediaImage: {
        url: "https://placehold.co/2000x1000",
        alt: "Placeholder Image",
        height: 522,
        width: 350,
      },
    },
    suPersonProfileLink: {url: "http://localhost", title: "View Full Profile"},
    suPersonPronouns: null,
    suPersonResearch: null,
    suPersonResearchInterests: null,
    suPersonScholarlyInterests: null,
    suPersonShortTitle: faker.person.jobArea(),
    suPersonTelephone: null,
    suPersonTypeGroup: [
      {
        __typename: "TermStanfordPersonType",
        id: "87a608ef-8bf5-46c9-b567-f74f36e1e7df",
        name: faker.person.jobType(),
        path: "/people/sales",
        weight: 2,
        parent: {id: "50f0f22c-306e-4304-ba72-25cebba57b2b"},
      },
    ],
  } as unknown as NodeStanfordPerson
}
