import AnimateInView from "@components/elements/animate/animate-in-view"
import Button from "@components/elements/button"
import CardFlourish from "@components/images/card-flourish"
import {Link, Maybe} from "@lib/gql/__generated__/drupal.d"
import clsx from "clsx"
import React, {HtmlHTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * Position of the text over the image.
   */
  overlayPosition?: Maybe<"left" | "right">
  /**
   * Optional button to display on the image banner card.
   * Accepts a `Link` object or `null`.
   */
  button?: Maybe<Link>
}

export const ImageBannerCard = ({overlayPosition, children, button, ...props}: Props) => {
  return (
    <AnimateInView
      animation="slideUp"
      className={clsx(
        "relative bottom-0 z-10 mb-50 flex w-full flex-col text-white md:absolute md:max-w-400 lg:max-w-700",
        {
          "right-0 items-end md:mx-50 md:mr-50 md:ml-auto": overlayPosition === "right",
          "left-0 md:mx-50 md:mr-auto md:ml-50": overlayPosition !== "right",
        }
      )}
      {...props}
    >
      <div
        className={twMerge(
          "rs-px-4 rs-py-2 max flex w-full flex-col gap-10 rounded-[3.5rem] bg-black/80 max-md:rounded-t-none max-sm:rounded-b-none",
          clsx({
            "rounded-br-none": overlayPosition === "right" && button?.url,
            "rounded-bl-none": overlayPosition !== "right" && button?.url,
          })
        )}
      >
        {children}
      </div>
      {button?.url && (
        <div className="flex flex-row content-start">
          <div className="rs-px-4 rs-pb-1 w-full rounded-[3.5rem] rounded-t-none bg-black/80 sm:w-fit">
            <Button ghost className="link--action" href={button.url}>
              {button.title}
            </Button>
          </div>
          <CardFlourish
            className={clsx("hidden aspect-1/1 h-35 w-35 shrink-0 fill-black/80 sm:block", {
              "order-first rotate-90": overlayPosition === "right",
              "rotate-0": overlayPosition !== "right",
            })}
          />
        </div>
      )}
    </AnimateInView>
  )
}
