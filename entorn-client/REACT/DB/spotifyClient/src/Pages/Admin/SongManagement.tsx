import { useEffect, useState } from "react";
import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import ListSongs from "../../components/songs/ListSongs";
import { ENV } from "../../Config/env";
import AddSongForm from "../../components/songs/AddSongForm";
import type { Track } from "../../Model/Track";
import type { TrackCreate } from "../../APIManagement/Tracks/Interfaces/TrackCreate";
import { PostTrack } from "../../APIManagement/Tracks/PostTrack";
import { PutTrack } from "../../APIManagement/Tracks/PutTrack";
import type { SongFormState } from "./Types/SongFormState";

const SongManagement = () => {

    const [tracks, setTracks] = useState<GETTrack[]>([]);
    const [newSong, setNewSong] = useState<SongFormState>({ mode: "none" });

    async function carregarDadesTrack() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
        setTracks(listTrack);
    }

    function addSong() {
        setNewSong({ mode: "new" });
    }

    function edit(t: Track) {
        setNewSong(
            {
            mode: "edit",
            song: t
            }
        );
    }

    async function save(t:TrackCreate){
        await PostTrack(t);
        await carregarDadesTrack()
        setNewSong({ mode: "none" });
    }

    async function update(t: TrackCreate) {
        const id = newSong.mode === "edit" ? newSong.song.id: "";
        await PutTrack(id, t);
        await carregarDadesTrack()
        setNewSong({ mode: "none" });
    }

    useEffect(
        () => {
            carregarDadesTrack();
        }, []
    )

    return (
        <>
            <main>
                <h1>Llistat de cançons</h1>

                {
                    tracks.length > 0 ?
                        <table>
                            <thead>
                                <title>ListSong</title>
                            </thead>
                            <tbody>
                                <ListSongs
                                    tracks={tracks}
                                    edit={edit}
                                />
                            </tbody>
                        </table>
                        : <p>
                            No track available
                        </p>
                }
            </main>
            {
                newSong.mode === "new" ?
                    <AddSongForm submit={(t) => save(t)} />
                    : newSong.mode === "edit" ?
                        <AddSongForm submit={(t) => update(t)} song={newSong.song}/> 
                    : <button onClick={addSong}>Afegir</button>
            }
        </>
    )
}

export default SongManagement;