import { useEffect, useState } from "react"
import AddApplication from "./components/add/AddApplication"
import ApplicationList from "./components/list/ApplicationList"
import ApplicationStatistic from "./components/statistics/ApplicationStatistic"
import SearchBar from "./components/SearchBar"
import type { Application } from "./types"
import { deleteApplication, duplicateApplication, getApplications } from "./api/application"
import ApplicationChart from "./components/statistics/ApplicationChart"

function App() {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
      getApplications().then(setApplications).catch(console.error)
  }, [])

  async function handleSubmit(created: Application) {
    setApplications(prev => [...prev, created])
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
      <SearchBar />
      <AddApplication onAdd={handleSubmit} />

      <div className="flex flex-row">
        <ApplicationChart applications={applications} />
        <ApplicationStatistic applications={applications} />
      </div>

      <ApplicationList applications={applications} onDelete={handleDelete} onDuplicate={handleDuplicate} />
    </div>
  )
}

export default App
