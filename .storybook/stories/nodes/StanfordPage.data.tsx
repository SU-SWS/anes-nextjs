import {NodeStanfordPage} from "@lib/gql/__generated__/drupal.d"
import {faker} from "@faker-js/faker"

export const StanfordPageData = () => {
  return {
    __typename: "NodeStanfordPage",
    id: "72f0069b-f1ec-4122-af73-6aa841faea90",
    title: faker.word.words(5),
    status: true,
    path: "/home",
    changed: {timezone: "America/Los_Angeles", time: "2024-01-29T15:37:02-08:00"},
    created: {timezone: "America/Los_Angeles", time: "2019-08-27T14:16:24-07:00"},
    layoutSelection: null,
    suBasicPageType: null,
    suPageDescription: faker.word.words(50),
  } as unknown as NodeStanfordPage
}
