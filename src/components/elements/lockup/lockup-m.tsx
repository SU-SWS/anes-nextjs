import Link from "@components/elements/link"
import LockupLogo from "@components/elements/lockup/lockup-logo"
import {FooterLockupProps} from "@components/config-pages/local-footer"

const LockupM = ({line1, line2, siteName, logoUrl}: FooterLockupProps) => {
  return (
    <div>
      <Link href="/" className="text-black no-underline">
        <div className="flex flex-col gap-12 md:flex-row md:items-center">
          <div className="border-black pr-12 md:inline-block md:border-r-3">
            <LockupLogo logoUrl={logoUrl} siteName={siteName} />
          </div>
          <div className="text-18 md:text-16 lg:text-19 xl:text-23 font-normal">
            <div>{line1 || siteName}</div>
            <div>{line2}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default LockupM
