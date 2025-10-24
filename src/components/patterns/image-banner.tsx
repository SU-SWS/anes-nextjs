import React, {ElementType, HtmlHTMLAttributes} from "react"
import Image from "next/image"
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
   * Is the banner supposed to support scrolling card
   */
  isScrolly?: Maybe<boolean>
  /**
   * Eagerly load the banner image.
   */
  eagerLoadImage?: Maybe<boolean>
  /**
   * Position of the text over the image.
   */
  overlayPosition?: Maybe<"left" | "right">
}

const ImageBanner = async ({
  imageUrl,
  imageAlt,
  eagerLoadImage,
  isSection,
  isScrolly,
  overlayPosition,
  children,
  ...props
}: Props) => {
  const BannerWrapper: ElementType = isSection ? "section" : "div"

  return (
    <BannerWrapper
      {...props}
      className={clsx(
        "rs-mb-5 @container relative",
        {"w-full overflow-clip": isScrolly},
        {"centered overflow-hidden rounded-[3.5rem] md:min-h-[700px]": !isScrolly},
        props.className
      )}
    >
      <div
        className={clsx("bg-cool-grey w-full", {
          "sticky top-0 z-0 h-screen": isScrolly,
          "relative aspect-[16/9] h-full md:absolute md:aspect-auto": !isScrolly,
        })}
      >
        {imageUrl && (
          <Image
            className={clsx("object-cover", {"absolute top-0 left-0 z-0 size-full object-cover": isScrolly})}
            src={imageUrl}
            alt={imageAlt || ""}
            loading={eagerLoadImage ? "eager" : "lazy"}
            fill
            sizes="100vw"
            {...await getImagePlaceholder(imageUrl)}
          />
        )}
      </div>
      {children}
    </BannerWrapper>
  )
}
export default ImageBanner
