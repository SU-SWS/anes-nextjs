"use client"

import {useEffect, useRef, useState} from "react"
import {motion, useInView, useMotionValue, useSpring, useReducedMotion} from "motion/react"

type CountUpProps = {
  end: number
  start?: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

const CountUpNumber = ({
  end,
  start = 0,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  ...props
}: CountUpProps) => {
  const prefersReducedMotion = useReducedMotion()

  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(start)
  const springValue = useSpring(motionValue, {
    duration: prefersReducedMotion ? 0 : duration * 1000,
    bounce: 0,
  })
  const [displayValue, setDisplayValue] = useState(start)
  const isInView = useInView(ref, {once: true})

  useEffect(() => {
    const unsubscribe = springValue.on("change", latest => {
      setDisplayValue(parseFloat(latest.toFixed(decimals)))
    })

    return () => {
      unsubscribe()
    }
  }, [springValue, decimals])

  useEffect(() => {
    if (isInView) {
      motionValue.set(end)
    }
  }, [motionValue, end, isInView])

  const numericValue = decimals > 0 ? displayValue : Math.floor(displayValue)
  const formattedValue = decimals > 0 ? numericValue.toFixed(decimals) : numericValue.toString()
  const formattedValueWithCommas = Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(formattedValue))

  return (
    <motion.span ref={ref} className={className} {...props}>
      {prefix}
      {formattedValueWithCommas}
      {suffix}
    </motion.span>
  )
}

export default CountUpNumber
