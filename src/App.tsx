import { useEffect, useState } from "react"
import AddApplication from "./components/AddApplication"
import ApplicationList from "./components/ApplicationList"
import ApplicationStatistic from "./components/ApplicationStatistic"
import SearchBar from "./components/SearchBar"
import type { Application } from "./types"
import { deleteApplication, duplicateApplication, getApplications } from "./api/application"

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
      <div className="flex flex-col">
        <ApplicationStatistic />
        <ApplicationList applications={applications} onDelete={handleDelete} onDuplicate={handleDuplicate} />
      </div>
    </div>
  )
}

export default App
