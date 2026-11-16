import { useEffect, useState } from "react";
import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import ListSongs from "../../components/songs/ListSongs";
import { ENV } from "../../Config/env";
import AddSongForm from "../../components/songs/AddSongForm";

const SongManagement = () => {

    const [tracks, setTracks] = useState<GETTrack[]>([]);
    const [newSong, setNewSong] = useState<boolean>(false);

    async function carregarDadesTrack() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
        setTracks(listTrack);
        setNewSong(false);
    }

    function addSong(){
        setNewSong(true);
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
                                />
                            </tbody>
                        </table>
                        : <p>
                            No track available
                        </p>
                }
            </main>
            {
                newSong ? 
                <AddSongForm refreshSongs={carregarDadesTrack} /> 
                :<button onClick={addSong}>Nova</button>
            }
        </>
    )
}

export default SongManagement;