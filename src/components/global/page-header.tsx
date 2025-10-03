import GlobalMessage from "@components/config-pages/global-message"
import Lockup from "@components/elements/lockup/lockup"
import {HTMLAttributes} from "react"
import UtilityNav from "@components/menu/utility-nav"

type Props = HTMLAttributes<HTMLElement>

const PageHeader = async ({...props}: Props) => {
  return (
    <header {...props} className={props.className}>
      <GlobalMessage />
      <div className="bg-gradient-blue-purple-white relative">
        <div className="centered min-h-50 pr-24 lg:pr-0">
          <div className="flex w-full items-center justify-between">
            <Lockup />
            <div>
              <UtilityNav />
            </div>
          </div>
        </div>
        {/* TODO: ANES3-337 Theme Main Nav */}
        {/* <MainMenu /> */}
      </div>
    </header>
  )
}
export default PageHeader
