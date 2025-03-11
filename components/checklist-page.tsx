"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Check, X, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ChecklistItem {
  id: string
  label: string
  checked: boolean
}

export default function ChecklistPage() {
  const { toast } = useToast()
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: "insulation", label: "Insulate walls and ceiling", checked: false },
    { id: "ventilation", label: "Ensure proper ventilation", checked: false },
    { id: "drafts", label: "Seal drafts and cracks", checked: false },
    { id: "bedding", label: "Add extra bedding material", checked: false },
    { id: "heater", label: "Install safe heating system", checked: false },
    { id: "water", label: "Prepare heated water system", checked: false },
    { id: "feed", label: "Stock up on winter feed", checked: false },
    { id: "predators", label: "Secure coop from winter predators", checked: false },
  ])
  const [historyOpen, setHistoryOpen] = useState(false)
  const [checklistHistory, setChecklistHistory] = useState<any[]>([])

  useEffect(() => {
    // Load checklist from localStorage
    const storedChecklist = localStorage.getItem("checklist")
    if (storedChecklist) {
      setItems(JSON.parse(storedChecklist))
    }

    // Load checklist history
    const storedHistory = localStorage.getItem("checklistHistory")
    if (storedHistory) {
      setChecklistHistory(JSON.parse(storedHistory))
    }
  }, [])

  const toggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const saveChecklist = () => {
    // Save current state to localStorage
    localStorage.setItem("checklist", JSON.stringify(items))

    // Create history entry
    const date = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

    const completedCount = items.filter((item) => item.checked).length
    const historyEntry = {
      date,
      completedCount,
      totalCount: items.length,
      items: [...items],
    }

    // Update history
    const updatedHistory = [...checklistHistory, historyEntry]
    setChecklistHistory(updatedHistory)
    localStorage.setItem("checklistHistory", JSON.stringify(updatedHistory))

    toast({
      title: "Success",
      description: "Checklist saved successfully",
    })
  }

  const getCompletionPercentage = () => {
    const completed = items.filter((item) => item.checked).length
    return Math.round((completed / items.length) * 100)
  }

  return (
    <div className="p-4">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl text-white">Winterization Checklist</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-400 hover:bg-red-900/20"
            onClick={() => setHistoryOpen(true)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: `${getCompletionPercentage()}%` }} />
            </div>
            <p className="text-sm text-gray-400 text-center">{getCompletionPercentage()}% completed</p>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor={item.id}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      item.checked ? "line-through text-gray-500" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={saveChecklist}>
              Save Checklist
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent className="bg-zinc-900 text-white border-zinc-800 max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-red-500">Checklist History</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {checklistHistory.length > 0 ? (
              <div className="space-y-4">
                {[...checklistHistory].reverse().map((entry, index) => (
                  <Card key={index} className="bg-zinc-800 border-zinc-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">{entry.date}</span>
                        <span className="text-sm font-medium">
                          {entry.completedCount}/{entry.totalCount} completed
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {entry.items.map((item: ChecklistItem) => (
                          <div key={item.id} className="flex items-center gap-2 text-sm">
                            {item.checked ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                            <span className={item.checked ? "text-gray-500" : "text-white"}>{item.label}</span>
                          </div>
                        ))}
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

