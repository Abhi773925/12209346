import { useState } from "react"
import axios from "axios"
const StatsViewer = () => {
  const [shortcode, setShortcode] = useState("")
  const [stats, setStats] = useState(null)
  const [error, setError] = useState("")

  const handleFetch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/shorturls/${shortcode}`)
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch stats")
      }
      
      setStats(data)
      setError("")
    } catch (err) {
      setError(err.message || "Failed to fetch stats")
      setStats(null)
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Stats Viewer</h2>
        <p className="text-gray-600">View statistics for your shortened URLs</p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl shadow-black/5 p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Enter shortcode
            </label>
            <input
              type="text"
              placeholder="Enter shortcode"
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <button
            onClick={handleFetch}
            disabled={!shortcode}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Stats
          </button>
        </div>

        {stats && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="font-semibold text-green-800">Stats Found!</h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-green-700 mb-1">
                  Original URL:
                </label>
                <a 
                  href={stats.originalUrl} 
                  className="text-green-600 hover:text-green-800 underline font-medium break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {stats.originalUrl}
                </a>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-green-700 mb-1">
                  Created At:
                </label>
                <p className="text-green-800">{new Date(stats.createdAt).toLocaleString()}</p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-green-700 mb-1">
                  Expires At:
                </label>
                <p className="text-green-800">{new Date(stats.expiry).toLocaleString()}</p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-green-700 mb-1">
                  Total Clicks:
                </label>
                <p className="text-green-800 font-semibold">{stats.totalClicks}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default StatsViewer;