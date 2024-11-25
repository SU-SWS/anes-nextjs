import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordFaq} from "@lib/gql/__generated__/drupal.d"
import {H2, H3, H4} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import Accordion, {AccordionHeaderChoice} from "@components/elements/accordion"
import twMerge from "@lib/utils/twMerge"
import ExpandCollapseAll from "@components/paragraphs/stanford-faq/expand-collapse-all"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {FAQParagraphBehaviors} from "@lib/drupal/drupal-jsonapi.d"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordFaq
}

const FaqParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors<FAQParagraphBehaviors>(paragraph)
  const headerTag = behaviors.faq_accordions?.heading || "h2"
  const heading = paragraph.suFaqHeadline

  let accordionHeadingLevel: AccordionHeaderChoice = "h2"
  if (heading) {
    if (headerTag === "h2") accordionHeadingLevel = "h3"
    if (headerTag === "h3") accordionHeadingLevel = "h4"
    if (headerTag === "h4") accordionHeadingLevel = "h5"
  }

  return (
    <div {...props} className={twMerge("space-y-10", props.className)}>
      <div className="flex items-center justify-between gap-20">
        {heading && (
          <>
            {headerTag === "h2" && <H2 id={paragraph.id}>{heading}</H2>}
            {headerTag === "h3" && <H3 id={paragraph.id}>{heading}</H3>}
            {headerTag === "h4" && <H4 id={paragraph.id}>{heading}</H4>}
          </>
        )}

        <ExpandCollapseAll className="ml-auto" />
      </div>
      <Wysiwyg html={paragraph.suFaqDescription?.processed} />

      <div>
        {paragraph.suFaqQuestions?.map(question => (
          <Accordion
            className="border-t border-black-40 last:border-b"
            buttonProps={{className: "mt-6"}}
            key={question.id}
            button={question.suAccordionTitle}
            headingLevel={accordionHeadingLevel}
          >
            <Wysiwyg html={question.suAccordionBody.processed} />
          </Accordion>
        ))}
      </div>
    </div>
  )
}

export default FaqParagraph
