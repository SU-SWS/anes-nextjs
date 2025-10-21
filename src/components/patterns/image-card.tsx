import twMerge from "@lib/utils/twMerge"
import Image from "next/image"
import Oembed from "@components/elements/ombed"
import {ElementType, HTMLAttributes} from "react"
import {Maybe} from "@lib/gql/__generated__/drupal.d"
import clsx from "clsx"
import AnimateInView from "@components/elements/animate/animate-in-view"

type Props = HTMLAttributes<HTMLElement | HTMLDivElement> & {
  /**
   * Absolute image url path.
   */
  imageUrl?: Maybe<string>
  /**
   * Image alt string.
   */
  imageAlt?: Maybe<string>
  /**
   * Absolute url for the video, typically an oembed url.
   */
  videoUrl?: Maybe<string>
  /**
   * If the wrapper should be an article or a div, use an article if an appropriate heading is within the card.
   */
  isArticle?: Maybe<boolean>
  /**
   * Displays a decorative visual element at the bottom of the card.
   */
  showFlourish?: Maybe<boolean>
}

const ImageCard = ({imageUrl, imageAlt, videoUrl, isArticle, children, showFlourish, ...props}: Props) => {
  const CardWrapper: ElementType = isArticle ? "article" : "div"

  return (
    <CardWrapper {...props} className={twMerge("centered relative w-full xl:max-w-[980px]", props.className)}>
      <AnimateInView animation="slideUp">
        {imageUrl && (
          <div
            className={clsx("relative w-full overflow-hidden rounded-t-[3.5rem]", {
              "aspect-[4/3]": !showFlourish,
              "aspect-[4/5]": showFlourish,
            })}
          >
            <Image
              className="object-cover object-center"
              src={imageUrl}
              alt={imageAlt || ""}
              fill
              sizes="(max-width: 768px) 100vw, 1000px"
            />
          </div>
        )}

        {videoUrl && <Oembed url={videoUrl} />}

        <div
          className={clsx(
            "rs-py-4 rs-px-4 flex w-full flex-col gap-5 rounded-b-[3.5rem] bg-white/80 backdrop-blur-[2.5rem]",
            {"rounded-bl-none": showFlourish}
          )}
        >
          {children}
        </div>
        {showFlourish && (
          <div className="flex flex-row items-start">
            <div className="h-100 w-2/3 shrink-0 rounded-[3.5rem] rounded-t-none bg-white/80 backdrop-blur-[2.5rem]" />
            {/*  @TODO: Replace with component once banner PR is merged in */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="1 0 50 50"
              className="hidden aspect-1/1 h-35 w-35 shrink-0 rotate-0 fill-white/80 backdrop-blur-[2.5rem] sm:block"
            >
              <path d="M50.7969 0C23.1826 -1.17772e-06 0.796878 22.3858 0.796877 50L0.796875 2.18557e-06L50.7969 0Z" />
            </svg>
          </div>
        )}
      </AnimateInView>
    </CardWrapper>
  )
}

export const ImageCardSkeleton = () => {
  return (
    <div className="centered border-black-10 w-full border pb-20 shadow-lg xl:max-w-[980px]">
      <div className="bg-black-10 aspect-[16/9] w-full"></div>
    </div>
  )
}

export default ImageCard
