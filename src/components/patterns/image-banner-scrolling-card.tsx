import AnimateInView from "@components/elements/animate/animate-in-view"
import {Link, Maybe} from "@lib/gql/__generated__/drupal.d"
import clsx from "clsx"
import React, {HtmlHTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * Position of the text over the image.
   */
  overlayPosition?: Maybe<"left" | "right">
  button?: Maybe<Link>
}

export const ImageBannerScrollingCard = ({overlayPosition, children, button, ...props}: Props) => {
  return (
    <AnimateInView
      animation="slideUp"
      {...props}
      className={twMerge(
        "cc relative z-10 -mt-[90vh] mb-50 w-full text-white sm:w-2/3 md:w-1/2 md:p-0",
        clsx({
          "right-0 items-end md:mx-50 md:mr-50 md:ml-auto": overlayPosition === "right",
          "left-0 md:mx-50 md:mr-auto md:ml-50": overlayPosition !== "right",
        })
      )}
    >
      <div className="rs-px-4 rs-py-2 max flex w-full flex-col gap-10 rounded-[3.5rem] bg-black/80 backdrop-blur-[2.5rem]">
        {children}
      </div>
    </AnimateInView>
  )
}
