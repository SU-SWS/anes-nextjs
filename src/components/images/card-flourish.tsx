import {HtmlHTMLAttributes} from "react"

const CardFlourish = ({...props}: HtmlHTMLAttributes<SVGSVGElement>) => {
  return (
    <svg {...props} aria-hidden xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="1 0 50 50">
      <path d="M50.7969 0C23.1826 -1.17772e-06 0.796878 22.3858 0.796877 50L0.796875 2.18557e-06L50.7969 0Z" />
    </svg>
  )
}

export default CardFlourish
