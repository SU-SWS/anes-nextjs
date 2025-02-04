import OneColumn from "@components/paragraphs/rows/one-column"
import {ParagraphUnion} from "@lib/gql/__generated__/drupal.d"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"

const ThreeColumn = ({items}: {items: ParagraphUnion[]}) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "left")
  const mainItems = items.filter(
    item => !["left", "right"].includes(getParagraphBehaviors(item).layout_paragraphs?.region || "main")
  )
  const rightItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "right")

  return (
    <div className="gutters grid gap-10 @10xl:grid-cols-3 @10xl:gap-20" data-columns="3">
      <OneColumn items={leftItems} />
      <OneColumn items={mainItems} />
      <OneColumn items={rightItems} />
    </div>
  )
}
export default ThreeColumn
