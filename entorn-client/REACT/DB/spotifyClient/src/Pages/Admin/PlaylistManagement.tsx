import { useState, useEffect } from "react";
import type { GETPlaylist } from "../../APIManagement/Playlists/Interfaces/GETPlaylist";
import { ENV } from "../../Config/env";
import { DeletePlaylist } from "../../APIManagement/Playlists/DeletePlaylist";

const PlaylistManagement = () =>{

        const [playlist, setPlaylists] = useState<GETPlaylist[]>([]);
    
    

         async function carregarDadesPlaylist() {
                const resposta = await fetch(`${ENV.API_BASE_URL}/playlists`);
        
                if (!resposta.ok) {
                    return false;
                }
        
                const llista: GETPlaylist[] = await resposta.json();
                setPlaylists(llista);
            }
        
          

            async function deletePlaylist(idPlaylist:string) {
                    await DeletePlaylist(idPlaylist);
                    await carregarDadesPlaylist()
                }
        
            useEffect(
                () => {
                    carregarDadesPlaylist();
                }, []
            )

    return(
        <>
            <h1>Gestió de Playlists</h1>
            <ul>
                {playlist.map((p) => (
                    <li key={p.id}>
                        {p.title}
                        <button onClick={() => deletePlaylist(p.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default PlaylistManagement;