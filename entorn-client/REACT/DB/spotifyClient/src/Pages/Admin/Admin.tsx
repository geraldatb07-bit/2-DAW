import { Link, Outlet } from "react-router";

const Admin =() => {
    return (
        <>
            <h1>Admin Space</h1>
            <Link to="SongManagement">Gestió de cançons</Link>
            <Link to="PlaylistManagement">Gestió de playlists</Link>
            <Link to="ArtistManagement">Gestió d'artistes</Link>
            <Outlet />
        </>
    )
}

export default Admin;
