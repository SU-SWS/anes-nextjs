import {HTMLAttributes} from "react"
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid"
import {getConfigPageField} from "@lib/gql/gql-queries"
import {StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"

type Props = HTMLAttributes<HTMLFormElement> & {
  inputValue?: string
}

const SiteSearchForm = async ({inputValue, ...props}: Props) => {
  const hideSearch = await getConfigPageField<StanfordBasicSiteSetting, StanfordBasicSiteSetting["suHideSiteSearch"]>(
    "StanfordBasicSiteSetting",
    "suHideSiteSearch"
  )
  if (hideSearch) return

  return (
    <form aria-label="Site Search" action="/search" {...props}>
      <div className="sr-only">
        <label>
          Email (Leave this field empty)
          <input name="search" />
        </label>
      </div>
      <div className="relative mt-10">
        <label htmlFor="site-search-input" className="sr-only">
          Search this site
        </label>
        <input
          className="h-15 lg:w-100 w-full rounded-full px-8 text-19 lg:border-black-20"
          type="text"
          placeholder="Search this site"
          id="site-search-input"
          name="q"
          required
          defaultValue={inputValue}
        />
        <button type="submit" className="absolute right-5 top-2">
          <MagnifyingGlassIcon width={25} className="text-digital-red" />
          <span className="sr-only">Submit Search</span>
        </button>
      </div>
    </form>
  )
}

export default SiteSearchForm
