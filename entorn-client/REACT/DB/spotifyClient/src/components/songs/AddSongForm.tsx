import { useState, useEffect, type SubmitEvent } from "react";
import type { GETArtist } from "../../APIManagement/Artists/Interfaces/Artist";
import { ENV } from "../../Config/env";
import type { TrackCreate } from "../../APIManagement/Tracks/Interfaces/TrackCreate";
import type { AddSongFormProps } from "./Types/AddSongFormProps";

const AddSongFrom = (props: AddSongFormProps) => {

    const [artists, setArtists] = useState<GETArtist[]>([]);
    const [submissionError, setSubmissionError] = useState("");

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
        setSubmissionError("");
        try {
            await props.submit(song);
        } catch (error) {
            setSubmissionError(error instanceof Error ? error.message : "No s'ha pogut desar la cançó.");
        }
    }

    return (
        <>
            <h1>{props.song ? "Editar cançó" : "Afegir cançó"}</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Títol:
                        <input
                            type="text"
                            name="title"
                            defaultValue={props.song?.title}
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>Duration:
                        <input type="number"
                            name="duration"
                            defaultValue={props.song?.duration}
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>Artista:
                        {
                            artists.length > 0
                                ? <select
                                    name="artist"
                                    defaultValue={props.song?.artist_id}
                                >

                                    {
                                        artists.map((a: GETArtist) => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))
                                    }
                                </select>
                                : <></>
                        }
                        <button>add</button>
                    </label>
                </p>
                <button type="submit">Desa</button>
                {submissionError && <p role="alert">{submissionError}</p>}
            </form>
        </>
    )
}
export default AddSongFrom;