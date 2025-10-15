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

const ImageBanner = async ({imageUrl, imageAlt, eagerLoadImage, paragraph, ...props}: Props) => {
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
      className={twMerge("rs-mb-5 centered @container relative md:min-h-[700px]", props.className)}
    >
      <div className="bg-cool-grey relative aspect-[16/9] w-full overflow-hidden rounded-[3.5rem] @6xl:absolute @6xl:aspect-auto @6xl:h-full">
        {imageUrl && (
          <Image
            className="object-cover"
            src={imageUrl}
            alt={imageAlt || ""}
            loading={eagerLoadImage ? "eager" : "lazy"}
            fill
            sizes="100vw"
            {...await getImagePlaceholder(imageUrl)}
          />
        )}
      </div>

      {hasCard && (
        <div
          className={twMerge(
            "bottom-0 mb-50 flex w-full max-w-400 flex-col text-white md:max-w-700 @6xl:absolute @6xl:z-10",
            clsx({
              "items-end @6xl:right-0 @6xl:mr-50 @6xl:ml-auto": overlayPosition === "right",
              "@6xl:left-0 @6xl:mr-auto @6xl:ml-50": overlayPosition !== "right",
            })
          )}
        >
          <div
            className={twMerge(
              "rs-px-4 rs-py-2 flex w-full flex-col gap-10 rounded-[3.5rem] bg-black/60 backdrop-blur-[2.1rem]",
              clsx({
                "rounded-br-none": overlayPosition === "right",
                "rounded-bl-none": overlayPosition !== "right",
              })
            )}
          >
            {paragraph.suBannerHeader && (
              <>
                {headerTag === "h2" && (
                  <H2 id={paragraph.uuid} className={twMerge(headerClasses, "type-2 mb-0")}>
                    {paragraph.suBannerHeader}
                  </H2>
                )}
                {headerTag === "h3" && (
                  <H3 id={paragraph.uuid} className={headerClasses}>
                    {paragraph.suBannerHeader}
                  </H3>
                )}
                {headerTag === "h4" && (
                  <H4 id={paragraph.uuid} className={headerClasses}>
                    {paragraph.suBannerHeader}
                  </H4>
                )}
                {headerTag === "div" && <div className={headerClasses}>{paragraph.suBannerHeader}</div>}
              </>
            )}

            {paragraph.suBannerSupHeader && (
              <div className="text-09em order-first font-semibold">{paragraph.suBannerSupHeader}</div>
            )}

            <Wysiwyg html={paragraph.suBannerBody?.processed} className="type-0" />
          </div>
          <div className="flex flex-row content-start">
            <div className="rs-px-4 rs-pb-1 w-fit rounded-[3.5rem] rounded-t-none bg-black/60 backdrop-blur-[2.1rem]">
              {paragraph.suBannerButton?.url && (
                <Button href={paragraph.suBannerButton.url}>{paragraph.suBannerButton.title}</Button>
              )}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="1 0 50 50"
              className={clsx("fill-backdrop-blur-[2.1rem] aspect-1/1 h-35 w-35 shrink-0 fill-black/60", {
                "order-first rotate-90": overlayPosition === "right",
                "rotate-0": overlayPosition !== "right",
              })}
            >
              <path d="M50.7969 0C23.1826 -1.17772e-06 0.796878 22.3858 0.796877 50L0.796875 2.18557e-06L50.7969 0Z" />
            </svg>
          </div>
        </div>
      )}
    </BannerWrapper>
  )
}
export default ImageBanner
