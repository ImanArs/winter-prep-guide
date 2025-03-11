"use client"

import { Home, PlusCircle, ClipboardList, Settings } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "create", icon: PlusCircle, label: "Create" },
    { id: "checklist", icon: ClipboardList, label: "Checklist" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="flex justify-around items-center p-2 bg-zinc-900 border-t border-zinc-800">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button key={tab.id} className="flex flex-col items-center p-2 w-1/4" onClick={() => setActiveTab(tab.id)}>
            <Icon className={`h-6 w-6 ${isActive ? "text-red-500" : "text-gray-500"}`} />
            <span className={`text-xs mt-1 ${isActive ? "text-red-500" : "text-gray-500"}`}>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

