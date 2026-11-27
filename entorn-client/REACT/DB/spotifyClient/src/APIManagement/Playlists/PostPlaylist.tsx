import { ENV } from "../../Config/env";
import type { PlaylistCreate } from "./Interfaces/PlaylistCreate";

export async function PostPlaylist(p: PlaylistCreate): Promise<void> {
    const resposta: Response = await fetch(
        `${ENV.API_BASE_URL}/playlists`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(p)
        }
    )
}