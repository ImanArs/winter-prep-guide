"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlusCircle, Thermometer, Droplets, Calendar, Users } from "lucide-react"
import Onboarding from "@/components/onboarding"
import BottomNavigation from "@/components/bottom-navigation"
import MeasurementForm from "@/components/measurement-form"
import ChecklistPage from "@/components/checklist-page"
import SettingsPage from "@/components/settings-page"

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [measurements, setMeasurements] = useState<any[]>([])
  const [latestMeasurement, setLatestMeasurement] = useState<any>(null)

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")
    if (!onboardingCompleted) {
      setShowOnboarding(true)
    }

    // Load measurements from localStorage
    const storedMeasurements = localStorage.getItem("measurements")
    if (storedMeasurements) {
      const parsedMeasurements = JSON.parse(storedMeasurements)
      setMeasurements(parsedMeasurements)

      // Get the latest measurement
      if (parsedMeasurements.length > 0) {
        setLatestMeasurement(parsedMeasurements[parsedMeasurements.length - 1])
      }
    }
  }, [activeTab])

  const completeOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true")
    setShowOnboarding(false)
  }

  const getStatusMessage = (measurement: any) => {
    if (!measurement) return { message: "No data available", status: "neutral" }

    const temp = measurement.temperature
    const humidity = measurement.humidity

    if (temp < 5) {
      return { message: "Too cold! Increase temperature", status: "bad" }
    } else if (temp > 30) {
      return { message: "Too hot! Decrease temperature", status: "bad" }
    } else if (humidity < 40) {
      return { message: "Too dry! Increase humidity", status: "bad" }
    } else if (humidity > 70) {
      return { message: "Too humid! Decrease humidity", status: "bad" }
    } else {
      return { message: "Conditions are optimal", status: "good" }
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="flex flex-col gap-4 p-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white">Current Status</CardTitle>
              </CardHeader>
              <CardContent>
                {latestMeasurement ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Thermometer className="text-red-500" />
                        <span className="text-white">Temperature:</span>
                      </div>
                      <span className="text-white font-bold">{latestMeasurement.temperature}°C</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Droplets className="text-red-500" />
                        <span className="text-white">Humidity:</span>
                      </div>
                      <span className="text-white font-bold">{latestMeasurement.humidity}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Users className="text-red-500" />
                        <span className="text-white">Chickens:</span>
                      </div>
                      <span className="text-white font-bold">{latestMeasurement.chickens}</span>
                    </div>
                    <div
                      className={`mt-4 p-3 rounded-md ${
                        getStatusMessage(latestMeasurement).status === "good"
                          ? "bg-green-900/30 text-green-400"
                          : getStatusMessage(latestMeasurement).status === "bad"
                            ? "bg-red-900/30 text-red-400"
                            : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {getStatusMessage(latestMeasurement).message}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 py-6">
                    <p className="text-white text-center">No measurements yet. Create your first measurement.</p>
                    <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setActiveTab("create")}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Measurement
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {latestMeasurement && (
              <Button
                variant="outline"
                className="border-red-600 text-red-500 hover:bg-red-900/20 hover:text-red-400"
                onClick={() => setHistoryOpen(true)}
              >
                View History
              </Button>
            )}
          </div>
        )
      case "create":
        return <MeasurementForm />
      case "checklist":
        return <ChecklistPage />
      case "settings":
        return <SettingsPage />
      default:
        return null
    }
  }

  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} />
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="p-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-center text-red-500">Winter Prep Guide</h1>
      </header>

      <main className="flex-1 overflow-auto">{renderContent()}</main>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent className="bg-zinc-900 text-white border-zinc-800 max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-red-500">Measurement History</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {measurements.length > 0 ? (
              <div className="space-y-4">
                {[...measurements].reverse().map((measurement, index) => (
                  <Card key={index} className="bg-zinc-800 border-zinc-700">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{measurement.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{measurement.chickens} chickens</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{measurement.temperature}°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{measurement.humidity}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center py-4">No history available</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

