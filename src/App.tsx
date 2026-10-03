import AddApplication from "./components/AddApplication"
import ApplicationList from "./components/ApplicationList"
import SearchBar from "./components/SearchBar"

function App() {

  return (
    <div className="flex flex-col">
      <SearchBar />

      <div className="flex flex-row">
        <AddApplication />

        <div>
          <ApplicationList />
          <ApplicationList />
          <ApplicationList />
        </div>

      </div>
    </div>
  )
}

export default App
