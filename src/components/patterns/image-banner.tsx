import React, {ElementType, HtmlHTMLAttributes} from "react"
import Image from "next/image"
import twMerge from "@lib/utils/twMerge"
import {Maybe, ParagraphStanfordBanner} from "@lib/gql/__generated__/drupal.d"
import {getImagePlaceholder} from "@lib/utils/get-image-placeholder"
import {clsx} from "clsx"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {BannerParagraphBehaviors} from "@lib/drupal/drupal-jsonapi.d"
import Wysiwyg from "@components/elements/wysiwyg"
import Button from "@components/elements/button"
import {H2, H3, H4} from "@components/elements/headers"
import AnimateInView from "@components/elements/animate/animate-in-view"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordBanner
  /**
   * Absolute image url path.
   */
  imageUrl?: Maybe<string>
  /**
   * Image alt string.
   */
  imageAlt?: Maybe<string>
  /**
   * Eagerly load the banner image.
   */
  eagerLoadImage?: Maybe<boolean>
}

const ImageBanner = async ({paragraph, eagerLoadImage, ...props}: Props) => {
  const behaviors = getParagraphBehaviors<BannerParagraphBehaviors>(paragraph)
  const hasCard =
    paragraph.suBannerHeader || paragraph.suBannerButton || paragraph.suBannerBody || paragraph.suBannerSupHeader

  const headerTagChoice = (behaviors.hero_pattern?.heading || "h2").split(".", 2)
  const headerTag = headerTagChoice[0]

  let headerClasses = headerTagChoice[1]?.replace(".", " ").replace("su-font-splash", "type-3 font-bold") || ""
  if (behaviors.hero_pattern?.hide_heading) headerClasses += " sr-only"
  const overlayPosition = behaviors.hero_pattern?.overlay_position
  const BannerWrapper: ElementType = paragraph.suBannerHeader && headerTag !== "div" ? "section" : "div"

  return (
    <BannerWrapper
      {...props}
      aria-labelledby={paragraph.suBannerHeader ? paragraph.uuid : undefined}
      className={twMerge(
        "rs-mb-5 centered @container relative overflow-hidden rounded-[3.5rem] md:min-h-[700px]",
        props.className
      )}
    >
      <div className="bg-cool-grey relative aspect-[16/9] h-full w-full md:absolute md:aspect-auto">
        {paragraph.suBannerImage?.mediaImage.url && (
          <Image
            className="object-cover"
            src={paragraph.suBannerImage?.mediaImage.url}
            alt={paragraph.suBannerImage?.mediaImage.alt || ""}
            loading={eagerLoadImage ? "eager" : "lazy"}
            fill
            sizes="100vw"
            {...await getImagePlaceholder(paragraph.suBannerImage?.mediaImage.url)}
          />
        )}
      </div>

      {hasCard && (
        <AnimateInView
          animation="slideUp"
          className={twMerge(
            "relative bottom-0 z-10 mb-50 flex w-full flex-col text-white md:absolute md:max-w-400 lg:max-w-700",
            clsx({
              "right-0 items-end md:mx-50 md:mr-50 md:ml-auto": overlayPosition === "right",
              "left-0 md:mx-50 md:mr-auto md:ml-50": overlayPosition !== "right",
            })
          )}
        >
          <div
            className={twMerge(
              "rs-px-4 rs-py-2 max flex w-full flex-col gap-10 rounded-[3.5rem] bg-black/80 max-md:rounded-t-none max-sm:rounded-b-none",
              clsx({
                "rounded-br-none": overlayPosition === "right" && paragraph.suBannerButton?.url,
                "rounded-bl-none": overlayPosition !== "right" && paragraph.suBannerButton?.url,
              })
            )}
          >
            {paragraph.suBannerHeader && (
              <>
                {headerTag === "h2" && (
                  <H2 id={paragraph.uuid} className={twMerge(headerClasses, "fluid-type-7 mb-0")}>
                    {paragraph.suBannerHeader}
                  </H2>
                )}
                {headerTag === "h3" && (
                  <H3 id={paragraph.uuid} className={twMerge(headerClasses, "fluid-type-6 mb-0")}>
                    {paragraph.suBannerHeader}
                  </H3>
                )}
                {headerTag === "h4" && (
                  <H4 id={paragraph.uuid} className={twMerge(headerClasses, "fluid-type-5 mb-0")}>
                    {paragraph.suBannerHeader}
                  </H4>
                )}
                {headerTag === "div" && (
                  <div className={twMerge(headerClasses, "fluid-type-4 mb-0")}>{paragraph.suBannerHeader}</div>
                )}
              </>
            )}

            {paragraph.suBannerSupHeader && (
              <div className="text-09em order-first font-semibold">{paragraph.suBannerSupHeader}</div>
            )}

            <Wysiwyg html={paragraph.suBannerBody?.processed} className="type-0" />
          </div>
          {paragraph.suBannerButton?.url && (
            <div className="flex flex-row content-start">
              <div className="rs-px-4 rs-pb-1 w-full rounded-[3.5rem] rounded-t-none bg-black/80 sm:w-fit">
                <Button ghost className="link--action" href={paragraph.suBannerButton.url}>
                  {paragraph.suBannerButton.title}
                </Button>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="1 0 50 50"
                className={clsx("hidden aspect-1/1 h-35 w-35 shrink-0 fill-black/80 sm:block", {
                  "order-first rotate-90": overlayPosition === "right",
                  "rotate-0": overlayPosition !== "right",
                })}
              >
                <path d="M50.7969 0C23.1826 -1.17772e-06 0.796878 22.3858 0.796877 50L0.796875 2.18557e-06L50.7969 0Z" />
              </svg>
            </div>
          )}
        </AnimateInView>
      )}
    </BannerWrapper>
  )
}
export default ImageBanner
