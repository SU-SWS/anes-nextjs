import Link from "@components/elements/link"
import twMerge from "@lib/utils/twMerge"
import {HtmlHTMLAttributes, MouseEventHandler} from "react"
import {Maybe} from "@lib/gql/__generated__/drupal.d"
import {clsx} from "clsx"
import {LinkProps} from "next/dist/client/link"

type Props = HtmlHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> & {
  /**
   * Link URL.
   */
  href?: Maybe<string>
  /**
   * If the element should be a <button>, default is <a>.
   */
  buttonElem?: boolean
  /**
   * Display a larger button.
   */
  big?: boolean
  /**
   * Display a secondary styled button.
   */
  secondary?: boolean
  /**
   * Display a outline styled button.
   */
  outline?: boolean
  /**
   * Display a ghost styled button.
   */
  ghost?: boolean
  /**
   * Center the button in the container.
   */
  centered?: boolean
  /**
   * Click handler, mostly when using a button element.
   */
  onClick?: MouseEventHandler
  /**
   * Next.js prefetch functionality.
   */
  prefetch?: LinkProps["prefetch"]
  /**
   * Type of button: submit, reset, or button.
   */
  type?: HTMLButtonElement["type"]
  /**
   * Disabled button element.
   */
  disabled?: boolean
}

export const Button = ({
  href,
  buttonElem = false,
  big = false,
  secondary = false,
  outline = false,
  ghost = false,
  centered = false,
  children,
  className,
  ...props
}: Props) => {
  const standardClasses = clsx(
    "btn transition leading-snug rounded-[1.5rem] font-lato font-normal rs-py-neg1 rs-px-1",
    {
      "flex items-center w-fit mx-auto": centered,
      "inline-block text-center w-fit": !centered,
      "btn--big text-5xl": big,
      "bg-white/25 backdrop-blur-[2.1rem] shadow-glass text-palo-alto-dark font-normal text-palo-alto-dark hocus:bg-white no-underline hocus:underline":
        !secondary && !outline && !ghost,
      "btn--secondary bg-palo-alto-light font-normal text-white hocus:bg-black hocus:text-white no-underline hocus:underline":
        secondary,
      "btn--outline text-palo-alto-light border-2 border-palo-alto-light hocus:border-black no-underline hocus:bg-palo-alto-dark hocus:text-white hocus:underline  font-normal":
        outline,
      "btn--ghost text-white border-2 bg-transparent border-white hocus:border-palo-alto-dark no-underline hocus:bg-white hocus:text-palo-alto-dark hocus:underline font-normal":
        ghost,
    }
  )

  if (!href || buttonElem) {
    return (
      <button className={twMerge(standardClasses, className)} type="button" {...props}>
        {children}
      </button>
    )
  }

  return (
    <Link href={href} className={twMerge(standardClasses, className)} {...props}>
      {children}
    </Link>
  )
}

export default Button
