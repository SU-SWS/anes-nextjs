import {getConfigPageField, getMenu} from "@lib/gql/gql-queries"
import {MenuAvailable, MenuItem as MenuItemType, StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"
import twMerge from "@lib/utils/twMerge"
import {clsx} from "clsx"
import SiteSearchForm from "@components/search/site-search-form"
import {
  MainMenuClientWrapper,
  MainMenuItemClientLink,
  MainMenuItemClientWrapper,
} from "@components/menu/main-menu.client"
import Link from "@components/elements/link"

const MainMenu = async () => {
  const menuItems = await getMenu(MenuAvailable.Main, 3)
  const headerLinks = await getConfigPageField<StanfordBasicSiteSetting, StanfordBasicSiteSetting["suSiteHeaderLinks"]>(
    "StanfordBasicSiteSetting",
    "suSiteHeaderLinks"
  )

  return (
    <MainMenuClientWrapper aria-label="Main Navigation" className="lg:centered">
      <SiteSearchForm className="px-10 lg:hidden" />
      {headerLinks?.[0].url && (
        <ul className="list-unstyled mx-auto flex w-fit flex-wrap gap-10 pt-5 pl-16 lg:hidden">
          {headerLinks.map((link, i) => (
            <li key={`utility-link-${i}`}>
              <Link className="hocus:text-white hocus:underline text-white no-underline" href={link.url as string}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <ul className="list-unstyled m-0 flex-wrap p-0 lg:flex lg:justify-end">
        {menuItems.map(item => (
          <MenuItem key={item.id} {...item} level={0} />
        ))}
      </ul>
    </MainMenuClientWrapper>
  )
}

type MenuItemProps = MenuItemType & {
  level: number
}

const MenuItem = ({id, url, title, children, level}: MenuItemProps) => {
  return (
    <MainMenuItemClientWrapper
      id={id}
      level={level}
      className={twMerge(
        "border-cool-grey lg:border-black-20 relative m-0 grid grid-cols-10 items-center justify-between border-b py-2 first:border-t last:border-0 lg:relative lg:py-0 lg:pr-5",
        clsx({
          "first:border-t-0 lg:flex lg:border-b-0 last:lg:pr-0 last:[&>span]:hidden": level === 0,
          "lg:first:border-t-0": level === 1,
        })
      )}
      link={
        <>
          <MainMenuItemClientLink
            id={id}
            href={url || "#"}
            className={twMerge(
              "hocus:text-white hocus-visible:border-white hocus-visible:underline lg:text-digital-red lg:hocus:text-black col-start-1 col-end-9 border-l-[6px] border-transparent py-5 text-white no-underline transition-all last:[&>span]:hidden",
              clsx({
                "aria-current-page:border-digital-red lg:data-intrail:border-foggy-dark ml-5 pl-10 data-intrail:border-transparent lg:ml-0 lg:border-b-[6px] lg:border-l-0 lg:pb-2 lg:pl-0 lg:aria-current-page:border-black":
                  level === 0,
                "aria-current-page:border-digital-red lg:hocus-visible:border-black-true pl-20 lg:pl-5": level === 1,
                "aria-current-page:border-digital-red lg:hocus-visible:border-black-true pl-28 lg:pl-10": level === 2,
                "aria-current-page:border-digital-red lg:hocus-visible:border-black-true pl-48 lg:pl-20": level === 3,
                "aria-current-page:border-digital-red lg:hocus-visible:border-black-true ml-5 lg:ml-0": level !== 0,
              })
            )}
          >
            {title}
          </MainMenuItemClientLink>
          {level === 0 && <span className="bg-archway-light mb-[6px] ml-5 hidden h-[25px] w-[1px] lg:block" />}
        </>
      }
    >
      {children.length > 0 && (
        <ul
          className={twMerge(
            "list-unstyled col-span-10 w-full min-w-[300px] px-0 lg:bg-white",
            clsx({
              "lg:absolute lg:top-full lg:right-0 lg:shadow-2xl": level === 0,
              "lg:top-0": level !== 0,
            })
          )}
        >
          {children.map(item => (
            <MenuItem key={item.id} {...item} level={level + 1} />
          ))}
        </ul>
      )}
    </MainMenuItemClientWrapper>
  )
}

export default MainMenu
