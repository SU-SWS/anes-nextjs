import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordFaq} from "@lib/gql/__generated__/drupal.d"
import {H2} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import Accordion from "@components/elements/accordion"
import twMerge from "@lib/utils/twMerge"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordFaq
}

const FaqParagraph = ({paragraph, ...props}: Props) => {
  return (
    <div {...props} className={twMerge("space-y-10", props.className)}>
      {paragraph.suFaqHeadline && <H2>{paragraph.suFaqHeadline}</H2>}
      <Wysiwyg html={paragraph.suFaqDescription?.processed} />

      <div>
        {paragraph.suFaqQuestions?.map(question => (
          <Accordion
            className="border-t border-black-40 last:border-b"
            buttonProps={{className: "mt-6"}}
            key={question.id}
            button={question.suAccordionTitle}
            headingLevel={paragraph.suFaqHeadline ? "h3" : "h2"}
          >
            <Wysiwyg html={question.suAccordionBody.processed} />
          </Accordion>
        ))}
      </div>
    </div>
  )
}

export default FaqParagraph
