import React, {ElementType, HtmlHTMLAttributes} from "react"
import Image from "next/image"
import twMerge from "@lib/utils/twMerge"
import {Maybe} from "@lib/gql/__generated__/drupal.d"
import {getImagePlaceholder} from "@lib/utils/get-image-placeholder"
import {clsx} from "clsx"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * Absolute image url path.
   */
  imageUrl?: Maybe<string>
  /**
   * Image alt string.
   */
  imageAlt?: Maybe<string>
  /**
   * Is the banner supposed to be a section or a div.
   */
  isSection?: Maybe<boolean>
  /**
   * Eagerly load the banner image.
   */
  eagerLoadImage?: Maybe<boolean>
  /**
   * Position of the text over the image.
   */
  overlayPosition?: Maybe<"left" | "right">
}

const HeroBanner = async ({
  imageUrl,
  imageAlt,
  eagerLoadImage,
  isSection,
  overlayPosition,
  children,
  ...props
}: Props) => {
  const BannerWrapper: ElementType = isSection ? "section" : "div"

  return (
    <BannerWrapper
      {...props}
      className={twMerge(
        "rs-mb-5 centered @container relative overflow-hidden rounded-[3.5rem] md:min-h-[700px]",
        props.className
      )}
    >
      <div className="bg-cool-grey relative aspect-[16/9] w-full @6xl:absolute @6xl:aspect-auto @6xl:h-full">
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

      {children && (
        <div
          className={twMerge(
            "rs-px-4 rs-py-2 bottom-0 mb-50 flex w-full flex-col gap-10 rounded-[3.5rem] bg-black/60 text-white shadow-lg backdrop-blur-[2.1rem] @6xl:absolute @6xl:z-10 @6xl:max-w-700",
            clsx({
              "@6xl:right-0 @6xl:mr-50 @6xl:ml-auto": overlayPosition === "right",
              "@6xl:left-0 @6xl:mr-auto @6xl:ml-50": overlayPosition !== "right",
            })
          )}
        >
          {children}
        </div>
      )}
    </BannerWrapper>
  )
}
export default HeroBanner
