import { useEffect, useState } from "react"
import ApplicationList from "./components/list/ApplicationList"
import ApplicationStatistic from "./components/statistics/ApplicationStatistic"
import SearchBar from "./components/SearchBar"
import type { Application } from "./types"
import { deleteApplication, duplicateApplication, getApplications } from "./api/application"
import ApplicationChart from "./components/statistics/ApplicationChart"
import AddModal from "./components/add/AddModal"
import NotFound from "./components/NotFound"

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
    <div className="min-h-dvh">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
        <header className="flex w-full flex-col sm:flex-row justify-between mb-8 gap-2 sm:items-center">
          <div className="flex flex-row gap-2">
            <a href="https://github.com/VictoSN" target="_blank" rel="noopener noreferrer">
              <img src="/logo-circle.png" alt="Logo" className="w-[30px] h-[30px]"/>
            </a>
            <h1 className="font-serif-display text-2xl">JotIt</h1>
          </div>

          <SearchBar search={search} setSearch={setSearch} />
        </header>

        {applications.length > 0 ? (
          <main className="flex flex-col gap-4">
            {!search && (
              <div className="flex flex-col mb-4">
                <h1 className="title">Statistics</h1>
                <div className="flex flex-col sm:flex-row items-center gap-8 lg:mx-32">
                  <div className="w-44 shrink-0">
                    <ApplicationChart applications={applications} />
                  </div>
                  <div className="flex-1 w-full">
                    <ApplicationStatistic applications={applications} />
                  </div>
                </div>
              </div>
            )}

            <div>
              <h1 className="title">Applications</h1>
              {search && filteredApplications.length === 0 ? (
                <div className="flex flex-col gap-2">
                  <p>No results for "{search}"</p>
                  <NotFound />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {search && <p>{filteredApplications.length} results for "{search}"</p>}
                  <ApplicationList applications={filteredApplications} onEdit={setEditing} onDelete={handleDelete} onDuplicate={handleDuplicate} />
                </div>
              )}
            </div>
          </main>
          ) : (
            <div>
              <p>Applications not found.</p>
              <NotFound />
            </div>
        )}

        <AddModal onAdd={handleSubmit} editing={editing} onUpdate={handleUpdate} onClose={() => setEditing(null)} />
      </div>
    </div>
  )
}

export default App
