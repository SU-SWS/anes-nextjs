import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordSpacer} from "@lib/gql/__generated__/drupal.d"
import {clsx} from "clsx"
import twMerge from "@lib/utils/twMerge"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordSpacer
}

const SpacerParagraph = ({paragraph, ...props}: Props) => {
  return (
    <div
      className={twMerge(
        clsx({
          "rs-pb-2": !paragraph.suSpacerSize,
          "rs-pb-0": paragraph.suSpacerSize === "su-spacer-minimal",
          "rs-pb-1": paragraph.suSpacerSize === "su-spacer-reduced",
        })
      )}
      {...props}
    ></div>
  )
}
export default SpacerParagraph
