import {Maybe} from "@lib/gql/__generated__/drupal.d"
import StanfordWordMark from "@components/images/stanford-wordmark"
import clsx from "clsx"

const LockupLogo = ({
  logoUrl,
  siteName = "",
  variant = "dark",
}: {
  logoUrl?: Maybe<string>
  siteName?: Maybe<string>
  variant?: "light" | "dark"
}) => {
  return (
    <>
      {logoUrl && (
        <picture>
          <img
            src={logoUrl}
            alt={`${siteName} Logo`}
            className={clsx("h-auto max-h-[35px] max-w-[400px] object-contain", {"text-white": variant === "light"})}
          />
        </picture>
      )}
      {!logoUrl && <StanfordWordMark variant={variant} className="block max-h-45 w-auto no-underline" />}
    </>
  )
}

export default LockupLogo
