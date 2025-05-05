import {getViewPagedItems, loadViewPage, ViewFilter} from "@lib/gql/gql-views"
import SiteSearchClient from "@components/search/site-search.client"
import NodeListItem from "@components/nodes/list-item/node-list-item"
import SiteSearchForm from "@components/search/site-search-form"
import {Maybe} from "@lib/gql/__generated__/drupal.d"

type Props = {
  search: string
}
const SiteSearch = async ({search}: Props) => {
  const {items: viewItems, totalItems} = await getViewPagedItems("search", "search", 12, [], 0, {
    key: search || "",
  })
  const loadMore = async (page?: Maybe<number>, _filter?: ViewFilter) => {
    "use server"
    return loadViewPage("search", "search", false, 12, [], page, {
      key: search || "",
    })
  }

  return (
    <div className="space-y-24">
      <SiteSearchForm inputValue={search} className="mx-auto w-3/5" />

      {viewItems.length === 0 && <p>No results found for the given search keywords. Please try again.</p>}

      <SiteSearchClient totalItems={totalItems} loadPage={totalItems > viewItems.length ? loadMore : undefined}>
        {viewItems.map(item => (
          <NodeListItem key={item.uuid} node={item} headingLevel="h2" />
        ))}
      </SiteSearchClient>
    </div>
  )
}
export default SiteSearch
