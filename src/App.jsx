import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToyIndex } from './pages/ToyIndex'

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ToyIndex />} path="/" />
      </Routes>
    </Router>
  )
}
