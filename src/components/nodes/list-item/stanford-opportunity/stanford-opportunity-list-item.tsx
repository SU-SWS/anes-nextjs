import Image from "next/image"
import Link from "@components/elements/link"
import {H2, H3} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import {NodeStanfordOpportunity} from "@lib/gql/__generated__/drupal.d"
import twMerge from "@lib/utils/twMerge"
import Wysiwyg from "@components/elements/wysiwyg"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordOpportunity
  headingLevel?: "h2" | "h3"
}

const StanfordOpportunityListItem = ({node, headingLevel, ...props}: Props) => {
  const image = node.suOppImage?.mediaImage
  const Heading = headingLevel === "h3" ? H3 : H2

  return (
    <article {...props} aria-labelledby={node.id} className={twMerge("@container", props.className)}>
      <div className="flex w-full flex-col justify-between @3xl:flex-row">
        <div className="order-2 @3xl:order-1">
          <Heading className="font-bold" id={node.id}>
            <Link
              href={node.suOppSource?.url || node.path}
              className="order-2 text-digital-red no-underline hocus:text-black hocus:underline"
            >
              {node.title}
            </Link>
          </Heading>

          <Wysiwyg html={node.suOppSummary?.processed || node.body?.summary} />
        </div>

        {image?.url && (
          <div className="relative order-1 mb-10 aspect-[16/9] shrink-0 @3xl:order-2 @3xl:mb-0 @3xl:w-1/4">
            <Image
              className="ed11y-ignore object-cover"
              src={image.url}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 900px) 75vw, 1000px"
            />
          </div>
        )}
      </div>
    </article>
  )
}
export default StanfordOpportunityListItem
