import { useEffect, useState } from "react"
import ApplicationList from "./components/list/ApplicationList"
import ApplicationStatistic from "./components/statistics/ApplicationStatistic"
import SearchBar from "./components/SearchBar"
import type { Application } from "./types"
import { deleteApplication, duplicateApplication, getApplications } from "./api/application"
import ApplicationChart from "./components/statistics/ApplicationChart"
import AddModal from "./components/add/AddModal"

function App() {
  const [applications, setApplications] = useState<Application[]>([])
  const [editing, setEditing] = useState<Application | null>(null)
  const [search, setSearch] = useState("")

  const filteredApplications = applications.filter(a => [a.companyName, a.position, a.location, a.workType, a.employmentType, a.expectedSalary, a.status, a.link]
    .join(" ")
    .toLowerCase()
    .includes(search.toLowerCase()))

  useEffect(() => {
      getApplications().then(setApplications).catch(console.error)
  }, [])

  async function handleSubmit(created: Application) {
    setApplications(prev => [...prev, created])
  }

  async function handleUpdate(updated: Application) {
    setApplications(prev => prev.map(a => a._id === updated._id ? updated : a))
  }

  async function handleDelete(id: string) {
      try {
          await deleteApplication(id)
          setApplications(prev => prev.filter(a => a._id !== id))
      } catch (e) {
          console.error(e)
      }
  }

  async function handleDuplicate(id: string) {
      try {
          const copy = await duplicateApplication(id)
          setApplications(prev => [...prev, copy])
      } catch (e) {
          console.error(e)
      }
  }

  return (
    <div className="flex flex-col">
      <SearchBar search={search} setSearch={setSearch} />
      <AddModal onAdd={handleSubmit} editing={editing} onUpdate={handleUpdate} onClose={() => setEditing(null)} />

      {!search &&       
        <div className="flex flex-row">
          <ApplicationChart applications={applications} />
          <ApplicationStatistic applications={applications} />
        </div>
      }

      <ApplicationList applications={filteredApplications} onEdit={setEditing} onDelete={handleDelete} onDuplicate={handleDuplicate} />
    </div>
  )
}

export default App
