"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Thermometer, Droplets, Users, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MeasurementForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    chickens: "",
    temperature: "",
    humidity: "",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.chickens || !formData.temperature || !formData.humidity) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      })
      return
    }

    // Format date to en-EN
    const dateObj = new Date(formData.date)
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

    // Create measurement object
    const measurement = {
      date: formattedDate,
      chickens: Number.parseInt(formData.chickens),
      temperature: Number.parseFloat(formData.temperature),
      humidity: Number.parseFloat(formData.humidity),
    }

    // Save to localStorage
    const existingMeasurements = localStorage.getItem("measurements")
    const measurements = existingMeasurements ? JSON.parse(existingMeasurements) : []
    measurements.push(measurement)
    localStorage.setItem("measurements", JSON.stringify(measurements))

    // Show success message
    setSuccess(true)
    toast({
      title: "Success",
      description: "Measurement saved successfully",
    })

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        chickens: "",
        temperature: "",
        humidity: "",
      })
      setSuccess(false)
    }, 2000)
  }

  return (
    <div className="p-4">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-xl text-white">Create New Measurement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white flex items-center gap-2">
                <Calendar className="h-4 w-4 text-red-500" />
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chickens" className="text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-red-500" />
                Number of Chickens
              </Label>
              <Input
                id="chickens"
                name="chickens"
                type="number"
                placeholder="Enter number of chickens"
                value={formData.chickens}
                onChange={handleChange}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature" className="text-white flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-red-500" />
                Temperature (°C)
              </Label>
              <Input
                id="temperature"
                name="temperature"
                type="number"
                step="0.1"
                placeholder="Enter temperature in °C"
                value={formData.temperature}
                onChange={handleChange}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="humidity" className="text-white flex items-center gap-2">
                <Droplets className="h-4 w-4 text-red-500" />
                Humidity (%)
              </Label>
              <Input
                id="humidity"
                name="humidity"
                type="number"
                step="1"
                placeholder="Enter humidity percentage"
                value={formData.humidity}
                onChange={handleChange}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <Button
              type="submit"
              className={`w-full ${
                success ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              } text-white`}
              disabled={success}
            >
              {success ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Saved Successfully
                </>
              ) : (
                "Save Measurement"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

