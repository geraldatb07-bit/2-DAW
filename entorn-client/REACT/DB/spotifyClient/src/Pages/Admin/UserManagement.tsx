import { useEffect, useState } from "react";
import { ENV } from "../../Config/env";
import type { GETUser } from "../../APIManagement/Users/Interfaces/GETUser";
import { deleteUser } from "../../APIManagement/Users/deleteUser";

const UserManagement = () => {

        const [users, setUsers] = useState<GETUser[]>([]);

    async function carregarDadesUsers () {
        const resposta = await fetch (`${ENV.API_BASE_URL}/users`);
        const llistat:GETUser[] = await resposta.json();
        setUsers(llistat);
    }
    
    useEffect( () =>{carregarDadesUsers()},[])

    async function eliminarUser (id: string){
        await deleteUser(id);
        carregarDadesUsers();
    }

    return (
        <>
            <h1>LListat d'usuaris</h1>
            <ul>
                {users.map((u) => 
                    (<li key={u.id}>{u.email}<button onClick={() => eliminarUser(u.id)}>Eliminar</button></li>)
                )}
            </ul>    
        </>
    )
}
export default UserManagement;