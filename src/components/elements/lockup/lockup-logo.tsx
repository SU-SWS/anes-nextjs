import {Maybe} from "@lib/gql/__generated__/drupal.d"
import StanfordWordMark from "@components/images/stanford-wordmark"

const LockupLogo = ({logoUrl, siteName = ""}: {logoUrl?: Maybe<string>; siteName?: Maybe<string>}) => {
  return (
    <>
      {logoUrl && (
        <picture>
          <img src={logoUrl} alt={`${siteName} Logo`} className="h-auto max-h-[35px] max-w-[400px] object-contain" />
        </picture>
      )}
      {!logoUrl && <StanfordWordMark className="text-cardinal-red block max-h-[30px] w-auto no-underline" />}
    </>
  )
}

export default LockupLogo
