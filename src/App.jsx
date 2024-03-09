import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MonitorPage from './pages/MonitorPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage/>}/>
        <Route path="/monitor" element={<MonitorPage/>}>
          <Route path="*" element={<MonitorPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
