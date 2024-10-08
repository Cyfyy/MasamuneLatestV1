import { useState } from "react"
import { Button } from "@/app/Dashboard/dash components/ui/button"
import { Input } from "@/app/Dashboard/dash components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/Dashboard/dash components/ui/table"
import { Pencil, Trash2, Plus, Download, Upload } from "lucide-react"

export function TrackerSection() {
  const [scholars, setScholars] = useState([
    { id: 1, name: "Alice", performance: 95 },
    { id: 2, name: "Bob", performance: 92 },
    { id: 3, name: "Charlie", performance: 88 },
  ])

  const [newScholar, setNewScholar] = useState({ name: "", performance: "" })

  const addScholar = () => {
    if (newScholar.name && newScholar.performance) {
      setScholars([...scholars, { id: scholars.length + 1, name: newScholar.name, performance: Number(newScholar.performance) }])
      setNewScholar({ name: "", performance: "" })
    }
  }

  const deleteScholar = (id: number) => {
    setScholars(scholars.filter((scholar) => scholar.id !== id))
  }

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + scholars.map((s) => `${s.name},${s.performance}`).join("\n")
    const encodedUri = encodeURI(csvContent)
    window.open(encodedUri)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Scholar Name"
          value={newScholar.name}
          onChange={(e) => setNewScholar({ ...newScholar, name: e.target.value })}
        />
        <Input
          placeholder="Performance"
          type="number"
          value={newScholar.performance}
          onChange={(e) => setNewScholar({ ...newScholar, performance: e.target.value })}
        />
        <Button onClick={addScholar}>
          <Plus className="mr-2 h-4 w-4" /> Add Scholar
        </Button>
      </div>
      <div className="flex justify-between">
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" /> Import CSV
        </Button>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scholars.map((scholar) => (
            <TableRow key={scholar.id}>
              <TableCell>{scholar.name}</TableCell>
              <TableCell>{scholar.performance}%</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteScholar(scholar.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}