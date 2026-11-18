import type { TrackCreate } from "./Interfaces/TrackCreate";

export async function PutTrack(id: string, track: TrackCreate): Promise<void> {
    const response = await fetch(
        `http://localhost:3000/tracks/${id}`, 
        {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(track)
        });
}
