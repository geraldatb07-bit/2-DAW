import { useState, useEffect, type SubmitEvent } from "react";
import type { GETArtist } from "../../APIManagement/Artists/Interfaces/Artist";
import { ENV } from "../../Config/env";
import type { TrackCreate } from "../../APIManagement/Tracks/Interfaces/TrackCreate";
import { PostTrack } from "../../APIManagement/Tracks/PostTrack";
import type { AddSongFormProps } from "./Types/AddSongFormProps";

const AddSongFrom = (props: AddSongFormProps) => {

    const [artists, setArtists] = useState<GETArtist[]>([]);

    async function carregarArtists() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/artists`);
        const listArtist: GETArtist[] = await resposta.json() as GETArtist[];
        setArtists(listArtist);
    }

    useEffect(
        () => {
            carregarArtists();
        }, []
    )

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const song: TrackCreate = {
            title: String(formData.get("title") ?? "").trim(),
            artist: String(formData.get("artist") ?? ""),
            duration: Number(formData.get("duration"))
        }
        await PostTrack(song);
        props.refreshSongs();
    }

    return (
        <>
            <h1>Afegir canço</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Títol:
                        <input type="text"
                            name="title"
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>Duration:
                        <input type="number"
                            name="duration"
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>Artista:
                        <select name="artist">
                            {
                                artists.map((a: GETArtist) => (
                                    <option key={a.id} value={a.id}>{a.name}</option>
                                ))
                            }
                        </select>
                        <button>add</button>
                    </label>
                </p>
                <button type="submit">Desa</button>
            </form>
        </>
    )
}
export default AddSongFrom;