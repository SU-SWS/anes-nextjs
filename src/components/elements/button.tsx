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
  centered = false,
  children,
  className,
  ...props
}: Props) => {
  const standardClasses = clsx("btn transition rounded-[1.5rem]", {
    "flex items-center w-fit mx-auto": centered,
    "inline-block text-center w-fit": !centered,
    "btn--big  text-5xl text-white hocus:text-white bg-palo-alto-light hocus:bg-black no-underline hocus:underline py-6 px-12 font-normal":
      big && !secondary,
    "bg-palo-alto-light font-normal text-white hocus:bg-black hocus:text-white rs-py-neg1 rs-px-1 no-underline hocus:underline":
      !big && !secondary,
    "btn--secondary text-palo-alto-light border-2 border-palo-alto-light hocus:border-black no-underline hocus:bg-palo-alto-dark hocus:text-white hocus:underline rs-py-neg1 rs-px-1 font-normal":
      !big && secondary,
    " btn--big btn--secondary text-5xl text-palo-alto-dark border-2 border-palo-alto-dark hocus:border-black no-underline hocus:underline py-6 px-12 font-normal":
      big && secondary,
  })

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
