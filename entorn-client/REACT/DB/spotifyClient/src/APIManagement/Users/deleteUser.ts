import { ENV } from "../../Config/env"

export async function deleteUser(id:string): Promise<void>{
    const eliminar: Response = await fetch (
        `${ENV.API_BASE_URL}/users/${id}`,
        {
            method: 'DELETE',
            headers:{"Content-Type": "application/json"}
        }
    
    );
}