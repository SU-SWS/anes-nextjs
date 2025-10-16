import {getConfigPageField} from "@lib/gql/gql-queries"
import {StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"
import Button from "@components/elements/button"
import Link from "@components/elements/link"
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid"

const UtilityNav = async () => {
  const headerButton = await getConfigPageField<
    StanfordBasicSiteSetting,
    StanfordBasicSiteSetting["suSiteHeaderButton"]
  >("StanfordBasicSiteSetting", "suSiteHeaderButton")

  const headerLinks = await getConfigPageField<StanfordBasicSiteSetting, StanfordBasicSiteSetting["suSiteHeaderLinks"]>(
    "StanfordBasicSiteSetting",
    "suSiteHeaderLinks"
  )
  if (!headerButton && !headerLinks) return

  return (
    <nav aria-label="Site utility navigation" className="hidden lg:block">
      <ul className="list-unstyled flex items-center gap-34">
        {headerLinks?.map((link, i) => (
          <li key={`utility-link-${i}`} className="mb-0">
            <Link className="hocus:underline text-digital-green-dark no-underline" href={link.url || "#"}>
              {link.title}
            </Link>
          </li>
        ))}

        {headerButton?.url && (
          <li className="mb-0">
            <Button outline href={headerButton.url} className="group font-semibold">
              {headerButton.title}
              {headerButton?.url.includes("search") && (
                <span className="whitespace-nowrap">
                  &#65279;
                  <MagnifyingGlassIcon
                    width={25}
                    className="fill-palo-alto-dark ml-4 inline-block transition group-hover:fill-white group-focus:fill-white"
                  />
                </span>
              )}
            </Button>
          </li>
        )}
      </ul>
    </nav>
  )
}
export default UtilityNav
