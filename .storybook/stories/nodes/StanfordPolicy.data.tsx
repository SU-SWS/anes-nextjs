import {NodeStanfordPolicy} from "@lib/gql/__generated__/drupal.d"
import {faker} from "@faker-js/faker"

export const StanfordPolicyData = () => {
  return {
    __typename: "NodeStanfordPolicy",
    id: "355729f2-50d4-4d8c-897b-b108ca4f13ca",
    title: faker.word.words(5),
    status: false,
    path: "/about-stanford-sites/stanford-sites-policies/terms-service-stanford-sites-and-stanford-sites",
    changed: {timezone: "America/Los_Angeles", time: "2024-01-04T17:46:30-08:00"},
    created: {timezone: "America/Los_Angeles", time: "2023-10-12T22:48:03-07:00"},
    body: {
      processed: faker.word.words(50),
    },
    suPolicyAuthority: faker.person.jobTitle(),
    suPolicyAutoPrefix: true,
    suPolicyChangelog: null,
    suPolicyChapter: "1",
    suPolicyEffective: {timezone: "UTC", time: "2023-10-11T00:00:00+00:00"},
    suPolicyPolicyNum: null,
    suPolicyRelated: null,
    suPolicySubchapter: null,
    suPolicyTitle: faker.word.words(5),
    suPolicyUpdated: {timezone: "UTC", time: "2023-10-12T00:00:00+00:00"},
  } as unknown as NodeStanfordPolicy
}
