import type { ArtistCreate } from "./Interfaces/ArtistCreate";

export async function PutArtist(id:string ,newArtist: ArtistCreate): Promise<void> {
    const response: Response = await fetch(
        `http://localhost:3000/artists/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newArtist)
        })
}