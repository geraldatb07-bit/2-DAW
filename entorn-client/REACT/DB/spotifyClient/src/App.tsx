import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import HeaderCard from './components/PageStructure/header/HeaderCard'
import Play from './Pages/Authenticated/Play'
import Menu from './components/PageStructure/menu/Menu'
import SongManagement from './Pages/Admin/SongManagement'

function App() {
  return (
    <BrowserRouter>
      <HeaderCard
        headerInfo={{
          nom: 'Gerard',
          data: new Date().toLocaleString('ca-ES')
        }}
      />
      <Menu />
      <Routes>
        <Route path="/Play" element={<Play />} />
        <Route path="/SongManagement" element={<SongManagement />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App