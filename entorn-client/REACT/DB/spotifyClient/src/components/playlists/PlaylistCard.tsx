import type { PlaylistCardProps } from "./Types/PlaylistCardProps";
import PlaylistTracksCard from "../playlistTracks/PlaylistTracksCard";
import type { PlaylistFormState } from "./Types/PlaylistFormState";
import { useEffect, useState } from "react";
import AddPlaylistForm from "./AddPlaylistForm";
import type { PlaylistCreate } from "../../APIManagement/Playlists/Interfaces/PlaylistCreate";
import { PostPlaylist } from "../../APIManagement/Playlists/PostPlaylist";
import type { GETPlaylist } from "../../APIManagement/Playlists/Interfaces/GETPlaylist";
import { ENV } from "../../Config/env";

const PlaylistCard = (props: PlaylistCardProps) => {

    const [newPlaylist, setNewPlaylist] = useState<PlaylistFormState>({ mode: "none" });

    const [playlists, setPlaylists] = useState<GETPlaylist[]>([]);


    async function carregarDadesPlaylist() {
        const resposta = await fetch(`${ENV.API_BASE_URL}/playlists`);

        if (!resposta.ok) {
            return false;
        }

        const llista: GETPlaylist[] = await resposta.json();
        setPlaylists(llista);
    }

    function addPlaylist() {
        setNewPlaylist({ mode: "new" })
    }

    async function save(p: PlaylistCreate) {
        await PostPlaylist(p);
        await carregarDadesPlaylist();
        setNewPlaylist({ mode: "none" });
    }

    useEffect(
        () => {
            carregarDadesPlaylist();
        }, []
    )


    return (
        <section className="playlist-component">
            <h2>Llistes de reproducció</h2>

            {
                playlists.length === 0 ?
                    <>
                        <p>No hi ha playlists disponibles</p>
                    </>
                    :
                    (
                        <ul>
                            {playlists.map(playlist => (
                                <li key={playlist.id}>
                                    {playlist.title}
                                    <button onClick={() => props.onSelectPlaylist(playlist.id)}>Select</button>
                                </li>
                            ))}
                        </ul>
                    )
            }

            {
                props.selectedPlaylistTitle !== '' ?
                    (
                        <PlaylistTracksCard
                            title={props.selectedPlaylistTitle}
                            tracks={props.tracks}
                            onPlayTrack={props.onPlayTrack}
                        />
                    ) : null
            }
            {
                newPlaylist.mode === "new" ?
                    <AddPlaylistForm submit={(p) => save(p)} /> :
                    <button onClick={addPlaylist}>Afegir</button>

            }
        </section>
    );
};

export default PlaylistCard;