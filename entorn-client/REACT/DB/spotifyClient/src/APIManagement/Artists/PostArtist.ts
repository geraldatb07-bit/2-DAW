import type { ArtistCreate } from "./Interfaces/ArtistCreate";

export async function PostArtist(newArtist: ArtistCreate){
    const response: Response = await fetch(
        "http://localhost:3000/artists",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newArtist)
        })
}