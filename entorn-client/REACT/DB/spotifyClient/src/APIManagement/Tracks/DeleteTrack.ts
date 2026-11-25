import { ENV } from "../../Config/env";

export async function deleteTrack(id: string): Promise <void>{
    const eliminar: Response = await fetch (
        `${ENV.API_BASE_URL}/tracks/${id}`,
        {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }
    )
}