import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import UserDetails from "./pages/UserDetails"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <Router>
      {/* Define routes for the application */}
      <Routes>
        <Route path="/" element={<Home />} />                {/* Main user list page */}
        <Route path="/user/:id" element={<UserDetails />} /> {/* Individual user detail page */}
      </Routes>

      {/* Toast notifications */}
      <Toaster />
    </Router>
  )
}

export default App
