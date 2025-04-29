import {ViewDisplayProps} from "@components/views/view"
import {NodeStanfordOpportunity} from "@lib/gql/__generated__/drupal.d"
import NodeCard from "@components/nodes/cards/node-card"
import OpportunitiesFilteredViewClient from "@components/views/stanford-opportunities/opportunities-filtered-view.client"
import LoadMoreList from "@components/elements/load-more-list"
import {getOpportunityFilterTerms} from "@lib/gql/gql-queries"

type Props = ViewDisplayProps<NodeStanfordOpportunity> & {
  filtered?: boolean
}

export type FilterGroup = {
  label: string
  options: Array<{label: string; value: string}>
}

const OpportunitiesCardView = async ({totalItems, loadPage, items, headingLevel, filtered}: Props) => {
  if (filtered) {
    const filterTerms = await getOpportunityFilterTerms()
    const filterGroups = filterTerms
      .sort((a, b) => a.weight - b.weight)
      .filter(term => !filterTerms.find(t => t.uuid === term.parent?.uuid))

    const filters: Array<FilterGroup> = []
    filterGroups.map(groupTerm => {
      filters.push({
        label: groupTerm.name,
        options: filterTerms
          .filter(term => term.parent?.uuid === groupTerm.uuid)
          .map(term => ({
            value: term.id,
            label: term.name,
          })),
      })
    })

    return (
      <OpportunitiesFilteredViewClient
        ulProps={{className: "list-unstyled grid @4xl:grid-cols-2 @7xl:grid-cols-3 gap-20 mb-20"}}
        liProps={{className: ""}}
        totalItems={totalItems}
        loadPage={loadPage}
        filters={filters}
      >
        {items.map(item => (
          <NodeCard node={item} key={item.uuid} headingLevel={headingLevel} />
        ))}
      </OpportunitiesFilteredViewClient>
    )
  }

  return (
    <LoadMoreList
      ulProps={{className: "list-unstyled grid @4xl:grid-cols-2 @7xl:grid-cols-3 gap-20 mb-20"}}
      liProps={{className: ""}}
      totalItems={totalItems}
      loadPage={loadPage}
    >
      {items.map(item => (
        <NodeCard node={item} key={item.uuid} headingLevel={headingLevel} />
      ))}
    </LoadMoreList>
  )
}

export default OpportunitiesCardView
