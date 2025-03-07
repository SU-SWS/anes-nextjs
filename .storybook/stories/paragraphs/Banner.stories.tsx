import type {Meta, StoryObj} from "@storybook/react"
import {ComponentProps} from "react"
import {Text} from "@lib/gql/__generated__/drupal.d"
import BannerParagraph from "@components/paragraphs/stanford-banner/banner-paragraph"
import {getStoryBookImage} from "../storybook-entities"
import {faker} from "@faker-js/faker"

type ComponentStoryProps = ComponentProps<typeof BannerParagraph> & {
  text: Text["processed"]
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<ComponentStoryProps> = {
  title: "Design/Paragraphs/Banner",
  component: BannerParagraph,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<ComponentStoryProps>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Banner: Story = {
  render: ({...args}) => {
    return <BannerParagraph {...args} />
  },
  args: {
    paragraph: {
      __typename: "ParagraphStanfordBanner",
      status: true,
      composition: {},
      langcode: {},
      created: {
        offset: "",
        timestamp: Math.round(new Date().getTime() / 1000),
        time: new Date().toISOString(),
        timezone: "America/Los_Angeles",
      },
      id: "9954cc81-919b-4498-9151-bf930831fca7",
      suBannerHeader: faker.word.words(5),
      suBannerBody: {
        processed: faker.word.words(5),
      },
      suBannerImage: getStoryBookImage(),
      suBannerSupHeader: faker.word.words(2),
    },
  },
}
