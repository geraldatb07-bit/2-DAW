import { Link } from "react-router"

const Menu = () => {
    return(
        <nav>
            <Link to="/Play">Reprodcutor</Link>
            <Link to="/SongManagement">Gestió cançons</Link>
        </nav>
    )
}

export default Menu;