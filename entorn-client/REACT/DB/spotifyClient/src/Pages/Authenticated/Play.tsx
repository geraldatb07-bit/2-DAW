import { useEffect, useState } from "react";
import type { HistoryCreate } from "../../APIManagement/History/Interfaces/HistoryCreate";
import type { GETPlaylist } from "../../APIManagement/Playlists/Interfaces/Playlist";
import type { GETPlaylistTrack } from "../../APIManagement/PlaylistTracks/Interfaces/PlaylistTrack";
import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import PlayingCard from "../../components/playing/PlayingCard";
import PlaylistCard from "../../components/playlists/PlaylistCard";
import ListSongs from "../../components/songs/ListSongs";
import SongCard from "../../components/songs/SongCard";
import type { Like } from "../../components/songs/Types/likes";
import type { TrackView } from "../../components/songs/Types/TrackView";
import { ENV } from "../../Config/env";
import { tracks } from "../../Data/track/track.data";
import type { HistoryView } from "../../components/history/Types/HistoryView";
import HistoryCard from "../../components/history/HistoryCard";
import { PostLike } from "../../APIManagement/Likes/PostLike";
import { GetLike } from "../../APIManagement/Likes/GetLike";
import type { LikeCreate } from "../../APIManagement/Likes/Interfaces/LikeCreate";




export const randomIndex = Math.floor(Math.random() * tracks.length);
export const randomTrack = tracks[randomIndex];
export const randomReproduccions = Math.floor(Math.random() * 5000);

export function formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}:${seconds}`;
}

const Play = () => {

    const [tracks, setTracks] = useState<GETTrack[]>([]);

    const [isPlaying, setIsPlaying] = useState(false);

    const [history, setHistory] = useState<HistoryView[]>([]);

    const [playlists, setPlaylists] = useState<GETPlaylist[]>([]);

    const [playlistTracks, setPlaylistTracks] = useState<GETTrack[]>([]);

    const [selectedPlaylistTitle, setSelectedPlaylistTitle] = useState('');

    const [track, setTrack] = useState<TrackView>(
        {
            ...tracks[randomIndex],
            "reproduccions": randomReproduccions,
            "likes": {
                "like": false,
                "totalLikes": 0
            }
        }
    )

    async function carregarDadesTrack() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/tracks`);
        const listTrack: GETTrack[] = await resposta.json() as GETTrack[];
        setTracks(listTrack);

        if (listTrack.length > 0) {
            const totalLikes = await GetLike(listTrack[0].id);
            setTrack({
                ...listTrack[0],
                reproduccions: 0,
                likes: {
                    like: false,
                    totalLikes: totalLikes
                }
            });
        }
    }

    async function carregarDadesPlaylist() {
        const resposta = await fetch(`${ENV.API_BASE_URL}/playlists`);

        if (!resposta.ok) {
            return false;
        }

        const llista: GETPlaylist[] = await resposta.json();
        setPlaylists(llista);
    }

    async function handleSelectPlaylist(playlistId: string) {
        const playlistSeleccionada = playlists.find(playlist => playlist.id === playlistId);
        setSelectedPlaylistTitle(playlistSeleccionada ? playlistSeleccionada.title : '');

        const resposta = await fetch(`${ENV.API_BASE_URL}/playlisttracks`); // ens retorna totes les relacions entre playlists i tracks: id, playlis_id, track_id
        const relacions: GETPlaylistTrack[] = await resposta.json();

        const relacionsDeLaPlaylist: GETPlaylistTrack[] = relacions.filter(relacio => playlistId === relacio.playlist_id);

        const trackIds = relacionsDeLaPlaylist.map(relacio => relacio.track_id);

        setPlaylistTracks(tracks.filter(track => trackIds.includes(track.id)));
    }

    useEffect(
        () => {
            carregarDadesTrack();
        }, []
    )

    useEffect(
        () => {
            carregarDadesPlaylist();
        }, []
    )

    async function handleClickRandomSong() {
        const totalLikes = await GetLike(tracks[randomIndex].id);
        const trackRandom: TrackView = {
            ...tracks[randomIndex],
            "likes": {
                "like": false,
                "totalLikes": totalLikes
            },
            "reproduccions": randomReproduccions,
        }

        setTrack(trackRandom);
    }

    async function incrementarReproduccions() {
        const tr = (prev: TrackView): TrackView => {
            return {
                ...prev,
                "reproduccions": prev.reproduccions + 1
            }
        }

        setTrack(tr);

        const newHistory: HistoryCreate = {
            user: "C2CFE8EE-F0CF-4C57-A256-E3495D7CA7BC",
            track: tracks[0].id
        }

        const response: Response = await fetch(
            "http://localhost:3000/tracks/user/history",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newHistory)
            })
        if (!response.ok) {
            return false
        }
        const result = await response.json();
        console.log(result)
    }

    async function gestionarLikes() {
        const tr = (prev: TrackView): TrackView => {

            let increment: number = 1;
            if (prev.likes.like) {
                increment = -1;
            }
            const likeObj: Like = {
                like: !prev.likes.like,
                totalLikes: prev.likes.totalLikes + increment
            }

            return {
                ...prev,
                "likes": likeObj
            }
        }
        setTrack(tr);

        const likeTrack: 1 | -1 = track.likes.like ? -1 : 1;
        const newLike: LikeCreate = {
            user_id: "EB04BDE8-C395-4831-BB34-3CB65749DD3A",
            track_id: track.id,
            likeTrack: likeTrack
        };
        await PostLike(newLike);
    }

    function handleClickReset() {
        setTrack(prev => ({
            ...prev,
            reproduccions: 0,
            likes: {
                like: false,
                totalLikes: 0
            }
        }));
    }


    function gestionarReproduccio() {
        if (!isPlaying) {
            incrementarReproduccions();
        }

        setIsPlaying(!isPlaying);
    }

    function afegirAlHistorial(song: {title: string, artist: string, duration: number}) {
    setHistory(prev => [
      {
        title: song.title,
        artist: song.artist,
        duration: song.duration,
        playedTime: new Date().toLocaleString('ca-ES')
      },
      ...prev
    ]);
  }

    async function handlePlayTrack(selectedTrack: GETTrack): Promise<void> {
        const totalLikes = await GetLike(selectedTrack.id);
        setTrack({
            ...selectedTrack,
            reproduccions: 0,
            likes: {
                like: false,
                totalLikes: totalLikes
            }
        });

        setIsPlaying(true);
        afegirAlHistorial(selectedTrack);

    }

    return (
        <>
            <main>
                {
                    tracks.length > 0 ?
                        <table>
                            <thead>
                                <title>ListSong</title>
                            </thead>
                            <tbody>
                                <ListSongs
                                    tracks={tracks}
                                    onPlayTrack={handlePlayTrack}
                                />
                            </tbody>
                        </table>
                        : <p>
                            No track available
                        </p>
                }
                <PlaylistCard
                    playlists={playlists}
                    onSelectPlaylist={handleSelectPlaylist}
                    selectedPlaylistTitle={selectedPlaylistTitle}
                    tracks={playlistTracks}
                    onPlayTrack={handlePlayTrack}
                />
                <aside>
                
                    <h1>Spotify Songs</h1>
                    <SongCard trackInfo={track}
                        play={() => gestionarReproduccio()}
                        like={() => gestionarLikes()}
                        reset={handleClickReset} />
                    <button onClick={handleClickRandomSong}>Random track</button>
                    <hr style={{ width: "50%", marginLeft: "0" }} />
                    <PlayingCard
                        isPlaying={isPlaying}
                        trackInfo={track}
                        onStop={() => setIsPlaying(false)} />
                    <HistoryCard history={history} />
                </aside>
            </main>
        </>
    )
}

export default Play;