import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import DupeFinder from './pages/DupeFinder'
import PerfumeDetail from './pages/PerfumeDetail'
import './index.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/dupe-finder" element={<DupeFinder />} />
            <Route path="/perfume/:id" element={<PerfumeDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
