import { ENV } from "../../Config/env";

export async function DeletePlaylist(id: string): Promise<void> {
    const response = await fetch(
        `${ENV.API_BASE_URL}/playlists/${id}`, 
        {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        });
}