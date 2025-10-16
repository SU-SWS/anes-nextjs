import Wysiwyg from "@components/elements/wysiwyg"
import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordWysiwyg} from "@lib/gql/__generated__/drupal.d"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordWysiwyg
}

const WysiwygParagraph = ({paragraph, ...props}: Props) => {
  return (
    <Wysiwyg
      html={paragraph.suWysiwygText?.processed}
      className="centered sm:max-w-550 lg:w-full lg:max-w-535 xl:max-w-725"
      {...props}
    />
  )
}
export default WysiwygParagraph
