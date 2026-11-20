import { Link, Outlet } from "react-router";

const Admin =() => {
    return (
        <>
            <h1>Admim Space</h1>
            <Link to="SongManagement">Gestió de cançons</Link>
            <Link to="PlaylistManagement">Gestió de playlists</Link>
            <Outlet />
        </>
    )
}

export default Admin;
