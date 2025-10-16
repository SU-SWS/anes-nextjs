import React, {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordBanner} from "@lib/gql/__generated__/drupal.d"

import ImageBanner from "@components/patterns/image-banner"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordBanner
  eagerLoadImage?: boolean
}

const BannerParagraph = ({paragraph, eagerLoadImage, ...props}: Props) => {
  return <ImageBanner {...props} eagerLoadImage={eagerLoadImage} paragraph={paragraph} />
}
export default BannerParagraph
