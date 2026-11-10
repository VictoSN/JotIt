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
    <div className="min-h-dvh bg-[#191919] text-[#f0f0f0]">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
        <header className="flex w-full flex-row justify-between">
          <div className="flex flex-row gap-2">
            <a href="https://github.com/VictoSN" target="_blank" rel="noopener noreferrer">
              <img src="/logo-circle.png" alt="Logo" className="w-[30px] h-[30px]"/>
            </a>
            <h1>JotIt</h1>
          </div>

          <SearchBar search={search} setSearch={setSearch} />
        </header>

        {applications.length > 0 ? (
          <main className="flex flex-col gap-4">
            {!search && (
              <div className="flex flex-col">
                <h1>Statistics</h1>
                <div className="flex flex-row">
                  <ApplicationChart applications={applications} />
                  <ApplicationStatistic applications={applications} />
                </div>
              </div>
            )}

            <h1>Applications</h1>
            <div>
              {search && filteredApplications.length === 0 ? (
                <p>No results for "{search}"</p>
              ) : (
                <div>
                  {search && <p>Searching for "{search}"</p>}
                  <ApplicationList applications={filteredApplications} onEdit={setEditing} onDelete={handleDelete} onDuplicate={handleDuplicate} />
                </div>
              )}
            </div>
          </main>
          ) : (
            <p>Applications not found</p>
        )}

        <AddModal onAdd={handleSubmit} editing={editing} onUpdate={handleUpdate} onClose={() => setEditing(null)} />
      </div>
    </div>
  )
}

export default App
