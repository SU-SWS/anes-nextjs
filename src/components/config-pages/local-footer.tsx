import Link from "@components/elements/link"
import Wysiwyg from "@components/elements/wysiwyg"
import LockupLogo from "@components/elements/lockup/lockup-logo"
import LockupA from "@components/elements/lockup/lockup-a"
import LockupB from "@components/elements/lockup/lockup-b"
import LockupD from "@components/elements/lockup/lockup-d"
import LockupE from "@components/elements/lockup/lockup-e"
import LockupH from "@components/elements/lockup/lockup-h"
import LockupI from "@components/elements/lockup/lockup-i"
import LockupM from "@components/elements/lockup/lockup-m"
import LockupO from "@components/elements/lockup/lockup-o"
import LockupP from "@components/elements/lockup/lockup-p"
import LockupR from "@components/elements/lockup/lockup-r"
import LockupS from "@components/elements/lockup/lockup-s"
import LockupT from "@components/elements/lockup/lockup-t"
import {HTMLAttributes, JSX} from "react"
import {H2} from "@components/elements/headers"
import TwitterIcon from "@components/elements/icons/TwitterIcon"
import YoutubeIcon from "@components/elements/icons/YoutubeIcon"
import FacebookIcon from "@components/elements/icons/FacebookIcon"
import {Maybe, StanfordLocalFooter} from "@lib/gql/__generated__/drupal.d"
import {buildUrl} from "@lib/utils/utils"
import {getConfigPage} from "@lib/gql/gql-queries"
import twMerge from "@lib/utils/twMerge"
import LinkedInIcon from "@components/elements/icons/LinkedInIcon"
import InstagramIcon from "@components/elements/icons/InstagramIcon"
import BlueSkyIcon from "@components/elements/icons/BlueSkyIcon"
import FlickrIcon from "@components/elements/icons/FlickrIcon"
import GithubIcon from "@components/elements/icons/GithubIcon"
import GoogleScholarIcon from "@components/elements/icons/GoogleScholarIcon"
import MastodonIcon from "@components/elements/icons/MastodonIcon"
import ThreadsIcon from "@components/elements/icons/ThreadsIcon"

type Props = HTMLAttributes<HTMLDivElement>

const LocalFooter = async ({...props}: Props) => {
  const localFooterConfig = await getConfigPage<StanfordLocalFooter>("StanfordLocalFooter")
  if (!localFooterConfig?.suFooterEnabled) return

  const lockupProps = {
    useDefault: localFooterConfig.suLocalFootUseLoc,
    lockupOption: localFooterConfig.suLocalFootLocOp,
    line1: localFooterConfig.suLocalFootLine1,
    line2: localFooterConfig.suLocalFootLine2,
    line3: localFooterConfig.suLocalFootLine3,
    line4: localFooterConfig.suLocalFootLine4,
    line5: localFooterConfig.suLocalFootLine5,
    logoUrl:
      !localFooterConfig.suLocalFootUseLogo && localFooterConfig.suLocalFootLocImg?.url
        ? buildUrl(localFooterConfig.suLocalFootLocImg?.url).toString()
        : undefined,
  }

  return (
    <div
      {...props}
      className={twMerge(
        "local-footer bg-palo-alto-light rs-pt-5 rs-pb-3 3xl:rs-pt-6 font-lato text-white",
        props.className
      )}
    >
      <div className="centered">
        {localFooterConfig.suLocalFootPrCo?.processed && (
          <div className="3xl:max-w-1200 lg:rs-mb-10 mb-100 w-full max-w-800">
            <Wysiwyg html={localFooterConfig.suLocalFootPrCo?.processed} />
          </div>
        )}
        <div className="flex flex-col gap-58 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-fit">
            <FooterLockup variant="light" {...lockupProps} />
          </div>

          <div className="flex flex-col gap-18 sm:flex-row sm:gap-58 lg:gap-61 [&_a]:font-normal [&_a]:no-underline [&_a]:transition [&_a:focus]:text-black [&_a:focus]:underline [&_a:hover]:text-black [&_a:hover]:underline">
            <div className="w-fit shrink-0">
              {localFooterConfig.suLocalFootPrimeH && (
                <H2 className="type-0 mb-18">{localFooterConfig.suLocalFootPrimeH}</H2>
              )}
              {localFooterConfig.suLocalFootPrimary && (
                <ul className="list-unstyled">
                  {localFooterConfig.suLocalFootPrimary.map((link, index) => {
                    if (!link.url) return
                    return (
                      <li key={`footer-primary-link-${index}`} className="mb-18 p-0 last:mb-0">
                        <Link
                          href={link.url}
                          className="type-0 hocus:underline hocus:text-white text-white no-underline"
                        >
                          {link.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            <div className="flex flex-col justify-end">
              {localFooterConfig.suLocalFootSecondH && (
                <H2 className="type-0 mb-18">{localFooterConfig.suLocalFootSecondH}</H2>
              )}

              {localFooterConfig.suLocalFootSecond && (
                <ul className="list-unstyled">
                  {localFooterConfig.suLocalFootSecond.map((link, index) => {
                    if (!link.url) return
                    return (
                      <li key={`footer-second-link-${index}`} className="mb-18 p-0 last:mb-0">
                        <Link
                          href={link.url}
                          className="type-0 hocus:underline hocus:text-white text-white no-underline"
                        >
                          {link.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}

              {localFooterConfig.suLocalFootSocial && (
                <ul className="list-unstyled mt-18 hidden flex-wrap gap-18 lg:flex">
                  {localFooterConfig.suLocalFootSocial.map((link, index) => {
                    if (!link.url) return
                    return (
                      <li key={`footer-action-link-${index}`} className="mb-0 p-0">
                        <Link
                          href={link.url}
                          className="hocus:outline-white block rounded-[1.3rem] outline outline-offset-2 outline-transparent [&_svg]:fill-white"
                        >
                          <SocialIcon url={link.url} />
                          <span className="sr-only">{link.title}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {localFooterConfig.suLocalFootSocial && (
            <ul className="list-unstyled flex flex-wrap gap-18 lg:hidden">
              {localFooterConfig.suLocalFootSocial.map((link, index) => {
                if (!link.url) return
                return (
                  <li key={`footer-action-link-${index}`} className="mb-0 p-0">
                    <Link
                      href={link.url}
                      className="hocus:outline-white block rounded-[1.3rem] outline outline-offset-2 outline-transparent [&_svg]:fill-white"
                    >
                      <SocialIcon url={link.url} />
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

const SocialIcon = ({url}: {url: string}) => {
  if (url.includes("twitter.com") || url.includes("x.com")) return <TwitterIcon />
  if (url.includes("youtube.com")) return <YoutubeIcon />
  if (url.includes("facebook")) return <FacebookIcon />
  if (url.includes("linkedin")) return <LinkedInIcon />
  if (url.includes("instagram")) return <InstagramIcon />
  if (url.includes("bsky")) return <BlueSkyIcon />
  if (url.includes("google")) return <GoogleScholarIcon />
  if (url.includes("github")) return <GithubIcon />
  if (url.includes("flickr")) return <FlickrIcon />
  if (url.includes("mastodon")) return <MastodonIcon />
  if (url.includes("threads")) return <ThreadsIcon />
  if (url.includes("youtube")) return <YoutubeIcon />

  console.warn("Social link icon not supported: " + url)
  return null
}

export interface FooterLockupProps {
  useDefault?: Maybe<boolean>
  siteName?: Maybe<string>
  lockupOption?: Maybe<string>
  line1?: Maybe<string>
  line2?: Maybe<string>
  line3?: Maybe<string>
  line4?: Maybe<string>
  line5?: Maybe<string>
  logoUrl?: Maybe<string>
  variant?: "light" | "dark"
}

const FooterLockup = ({
  useDefault = true,
  siteName,
  lockupOption,
  variant,
  ...props
}: FooterLockupProps): JSX.Element => {
  const lockupProps = {
    variant,
    ...props,
  }

  lockupOption = useDefault ? "default" : lockupOption

  switch (lockupOption) {
    case "none":
      return (
        <Link href="/" className="flex flex-col gap-4 no-underline lg:flex-row">
          <LockupLogo {...lockupProps} />
        </Link>
      )

    case "a":
      return <LockupA {...lockupProps} />

    case "b":
      return <LockupB {...lockupProps} />

    case "d":
      return <LockupD {...lockupProps} />

    case "e":
      return <LockupE {...lockupProps} />

    case "h":
      return <LockupH {...lockupProps} />

    case "i":
      return <LockupI {...lockupProps} />

    case "m":
      return <LockupM {...lockupProps} />

    case "o":
      return <LockupO {...lockupProps} />

    case "p":
      return <LockupP {...lockupProps} />

    case "r":
      return <LockupR {...lockupProps} />

    case "s":
      return <LockupS {...lockupProps} />

    case "t":
      return <LockupT {...lockupProps} />
  }

  return (
<<<<<<< HEAD
    <div>
      <Link href="/" className="flex flex-col gap-12 text-white no-underline lg:flex-row">
        <div className="border-white pr-12 lg:inline-block lg:border-r-3">
          <LockupLogo {...lockupProps} />
        </div>
        <div className="font-normal">
          <div className="type-0">Department of Anesthesiology,</div>
          <div className="type-0">Perioperative and Pain Management</div>
        </div>
      </Link>
    </div>
=======
    <Link href="/" className="flex flex-col gap-12 text-white no-underline lg:flex-row">
      <div className="border-white pr-12 lg:inline-block lg:border-r-3">
        <LockupLogo {...lockupProps} />
      </div>
      <div className="font-normal">
        <div className="type-0">Department of Anesthesiology,</div>
        <div className="type-0">Perioperative and Pain Management</div>
      </div>
    </Link>
>>>>>>> 1.x
  )
}
export default LocalFooter
