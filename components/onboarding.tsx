"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Thermometer, Droplets, ClipboardList, Settings } from "lucide-react"

interface OnboardingProps {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      icon: Thermometer,
      title: "Track Temperature & Humidity",
      description: "Monitor your chicken coop conditions to ensure optimal productivity during winter.",
    },
    {
      icon: Droplets,
      title: "Get Recommendations",
      description: "Receive personalized recommendations based on your measurements to maintain ideal conditions.",
    },
    {
      icon: ClipboardList,
      title: "Winterization Checklist",
      description: "Use our checklist to prepare your coop for winter and track your progress.",
    },
    {
      icon: Settings,
      title: "Ready to Start",
      description: "You're all set! Start tracking your chicken coop conditions to keep your flock healthy.",
    },
  ]

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const currentStep = steps[step]
  const Icon = currentStep.icon

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6 text-white">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold text-red-500">Winter Prep Guide</h1>

        <div className="relative">
          <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse"></div>
          <div className="relative flex items-center justify-center w-24 h-24 mx-auto bg-red-900/30 rounded-full">
            <Icon className="h-12 w-12 text-red-500 animate-[wiggle_1s_ease-in-out_infinite]" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{currentStep.title}</h2>
          <p className="text-gray-400">{currentStep.description}</p>
        </div>

        <div className="flex justify-center gap-2 pt-4">
          {steps.map((_, index) => (
            <div key={index} className={`w-2 h-2 rounded-full ${index === step ? "bg-red-500" : "bg-gray-700"}`} />
          ))}
        </div>

        <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={nextStep}>
          {step < steps.length - 1 ? "Next" : "Get Started"}
        </Button>
      </div>

      <style jsx global>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}</style>
    </div>
  )
}

