import {NodeStanfordOpportunity} from "@lib/gql/__generated__/drupal.d"
import {ViewDisplayProps} from "@components/views/view"
import StanfordOpportunityListItem from "@components/nodes/list-item/stanford-opportunity/stanford-opportunity-list-item"
import {getOpportunityFilterTerms} from "@lib/gql/gql-queries"
import OpportunitiesFilteredViewClient from "@components/views/stanford-opportunities/opportunities-filtered-view.client"
import {FilterGroup} from "@components/views/stanford-opportunities/opportunities-card-view"
import PagedList from "@components/elements/paged-list"

type Props = ViewDisplayProps<NodeStanfordOpportunity> & {
  filtered?: boolean
}

const OpportunitiesListView = async ({items, headingLevel, totalItems, loadPage, filtered}: Props) => {
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
        ulProps={{className: "list-unstyled mb-20"}}
        liProps={{
          className: "border-b border-black-20 last-of-type:border-0 pb-10 last:pb-0 pt-10 first:pt-0",
        }}
        totalItems={totalItems}
        loadPage={loadPage}
        filters={filters}
      >
        {items.map(item => (
          <StanfordOpportunityListItem key={item.uuid} node={item} headingLevel={headingLevel} />
        ))}
      </OpportunitiesFilteredViewClient>
    )
  }

  return (
    <PagedList
      ulProps={{className: "list-unstyled mb-20"}}
      liProps={{
        className: "border-b border-black-20 last-of-type:border-0 pb-10 last:pb-0 pt-10 first:pt-0",
      }}
      pageKey="news="
      totalPages={Math.ceil(totalItems / 30)}
      loadPage={loadPage}
    >
      {items.map(item => (
        <StanfordOpportunityListItem key={item.id} node={item} headingLevel={headingLevel} />
      ))}
    </PagedList>
  )
}

export default OpportunitiesListView
