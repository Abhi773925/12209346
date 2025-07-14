import ShortenForm from "./components/ShortenForm"
import StatsViewer from "./components/StatsViewer"

function App() {
  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ShortenForm />
          <StatsViewer />
        </div>
      </div>
    </div>

  )
}

export default App
