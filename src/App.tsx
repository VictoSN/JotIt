import AddApplication from "./components/AddApplication"
import ApplicationList from "./components/ApplicationList"
import ApplicationStatistic from "./components/ApplicationStatistic"
import SearchBar from "./components/SearchBar"

function App() {

  return (
    <div className="flex flex-col">
      <SearchBar />
      <AddApplication />
      <div className="flex flex-col">
        <ApplicationStatistic />
        <ApplicationList />
      </div>
    </div>
  )
}

export default App
