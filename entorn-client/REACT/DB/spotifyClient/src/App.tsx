import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import HeaderCard from './components/PageStructure/header/HeaderCard'
import Play from './Pages/Authenticated/Play'
import Menu from './components/PageStructure/menu/Menu'
import Admin from './Pages/Admin/Admin'
import SongManagement from './Pages/Admin/SongManagement'
import PlaylistManagement from './Pages/Admin/PlaylistManagement'
import ArtistManagement from './Pages/Admin/ArtistManagement'
import UserManagement from './Pages/Admin/UserManagement'
import FullSongsHistory from './Pages/Admin/fullSongsHistory'


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
        <Route path="/Admin" element={<Admin />}>
          <Route path="SongManagement" element={<SongManagement />} />
          <Route path="PlaylistManagement" element={<PlaylistManagement />} />
          <Route path="ArtistManagement" element={<ArtistManagement />} />
          <Route path="UserManagement" element={<UserManagement/>} />
          <Route path="FullSongsHistory" element={<FullSongsHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App