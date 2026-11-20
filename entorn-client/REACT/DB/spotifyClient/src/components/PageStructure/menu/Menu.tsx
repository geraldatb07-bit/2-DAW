import { Link } from "react-router"

const Menu = () => {
    return(
        <nav>
            <Link to="/Play">Reprodcutor</Link>
            <Link to="/Admin">Admin</Link>
        </nav>
    )
}

export default Menu;