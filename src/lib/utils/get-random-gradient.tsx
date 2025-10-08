const gradientClasses = ["bg-gradient-blue-purple", "bg-gradient-purple-blue", "bg-gradient-white-blue-purple"] as const

export function getRandomGradient(): string {
  return gradientClasses[Math.floor(Math.random() * gradientClasses.length)]
}
