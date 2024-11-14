import Rows from "@components/paragraphs/rows/rows"
import {H1} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import {NodeStanfordOpportunity} from "@lib/gql/__generated__/drupal.d"
import StanfordOpportunityMetadata from "@components/nodes/pages/stanford-opportunity/stanford-opportunity-metadata"
import Wysiwyg from "@components/elements/wysiwyg"
import Image from "next/image"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordOpportunity
  headingLevel?: "h2" | "h3"
}

const StanfordOpportunityPage = ({node, ...props}: Props) => {
  const image = node.suOppImage?.mediaImage
  return (
    <article className="centered mt-32" {...props}>
      <StanfordOpportunityMetadata node={node} />
      <H1>{node.title}</H1>

      <div className="grid grid-cols-3-1 gap-20">
        <div className="space-y-20">
          <Wysiwyg html={node.suOppSummary?.processed} />
          <Wysiwyg html={node.body?.processed} />
        </div>

        <div className="space-y-10">
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

          {node.suOppType && (
            <div className="font-semibold">
              {node.suOppType.map(oppType => (
                <div key={oppType.id}>{oppType.name}</div>
              ))}
            </div>
          )}

          {node.suOppApplicationDeadline && (
            <div>Application Deadline: {new Date(node.suOppApplicationDeadline.time).toLocaleString()}</div>
          )}
          {node.suOppEligibility && (
            <div>
              Eligibility: <Wysiwyg html={node.suOppEligibility.processed} />
            </div>
          )}
          {node.suOppStartDate && <div>Start Date: {new Date(node.suOppStartDate.time).toLocaleDateString()}</div>}
          {node.suOppCourseCode && (
            <div>
              {node.suOppCourseCode.map((code, i) => (
                <div key={`course-code-${i}`}>{code}</div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Rows components={node.suOppComponents} className="mx-auto lg:w-8/12" />
    </article>
  )
}
export default StanfordOpportunityPage
