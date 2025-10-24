import {HTMLAttributes, useId} from "react"
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
  return <SiteSearchFormInner inputValue={inputValue} {...props} />
}

const SiteSearchFormInner = ({inputValue, ...props}: Props) => {
  const inputId = useId()
  return (
    <form aria-label="Site Search" action="/search" {...props}>
      <div className="sr-only">
        <label>
          Email (Leave this field empty)
          <input name="search" />
        </label>
      </div>
      <div className="relative mt-10">
        <label htmlFor={inputId} className="sr-only">
          Search this site
        </label>
        <input
          className="text-19 lg:border-black-20 h-15 w-full rounded-full px-8 lg:w-100"
          type="text"
          placeholder="Search this site"
          id={inputId}
          name="q"
          required
          defaultValue={inputValue}
        />
        <button type="submit" className="absolute top-2 right-5">
          <MagnifyingGlassIcon width={25} className="text-digital-red" />
          <span className="sr-only">Submit Search</span>
        </button>
      </div>
    </form>
  )
}

export default SiteSearchForm
