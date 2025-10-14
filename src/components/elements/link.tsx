import {HtmlHTMLAttributes} from "react"
import Link from "next/link"
import {EnvelopeIcon} from "@heroicons/react/24/outline"
import ActionLink from "@components/elements/action-link"
import Button from "@components/elements/button"
import {LinkProps as NextLinkProps} from "next/dist/client/link"
import {ArrowUpRightIcon} from "@heroicons/react/16/solid"
import twMerge from "@lib/utils/twMerge"
import clsx from "clsx"

export type LinkProps = HtmlHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> &
  NextLinkProps & {
    /**
     * Link URL.
     */
    href: string
    showExtLinkIcon?: boolean
  }

const DrupalLink = ({href, showExtLinkIcon, className, children, ...props}: LinkProps) => {
  // Make sure all links have a href.
  href = href || "#"
  const drupalBase: string = (process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || "").replace(/\/$/, "")
  const linkStyle = "text-palo-alto-dark font-semibold no-underline hocus:underline"

  // Make sure links to documents or images go to the Drupal origin.
  if (href.startsWith("/") && href.includes("/files/")) {
    href = `${drupalBase}${href}`
  }

  // For links not to the file system, make them relative and replace <front>.
  if (!href.includes("/files/")) {
    href = href.replace(drupalBase, "").replace("<front>", "/")
  }

  const externalLink =
    showExtLinkIcon &&
    !href.startsWith("mailto") &&
    !href.startsWith("#") &&
    !href.startsWith("/") &&
    !href.startsWith(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string)

  if (className?.includes("link--action")) {
    return (
      <ActionLink href={href} className={clsx(className?.replaceAll("link--action", ""))} {...props}>
        {children}
      </ActionLink>
    )
  }

  if (className?.includes("button")) {
    return (
      <Button
        href={href}
        big={className.includes("--big")}
        secondary={className.includes("--secondary")}
        className={className?.replaceAll("button", "")}
        {...props}
      >
        {children}

        {externalLink && (
          <ArrowUpRightIcon
            height={20}
            className="group-hocus-visible:translate-x-2 ml-2 inline-block transition-all"
          />
        )}
      </Button>
    )
  }

  return (
    <Link href={href} className={twMerge("group", className, !className?.includes("btn") && linkStyle)} {...props}>
      {children}
      {href.startsWith("mailto") && <EnvelopeIcon width={20} className="ml-4 inline-block" />}

      {externalLink && (
        <ArrowUpRightIcon
          height={20}
          className="group-hocus-visible:-translate-y-3 group-hocus-visible:translate-x-1 ml-2 inline-block transition-all"
        />
      )}
    </Link>
  )
}

export default DrupalLink as typeof Link
