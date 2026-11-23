import { useEffect, useState } from "react";
import type { GETArtist } from "../../APIManagement/Artists/Interfaces/Artist";
import { ENV } from "../../Config/env";
import type { ArtistCreate } from "../../APIManagement/Artists/Interfaces/ArtistCreate";
import { PostArtist } from "../../APIManagement/Artists/PostArtist";
import type { ArtistFormState } from "./Types/ArtistFormState";
import { PutArtist } from "../../APIManagement/Artists/PutArtist";
import AddArtistForm from "../../components/artists/AddArtistForm";
import type { Artist } from "../../Model/Artists";

const ArtistManagement = () => {
    
    const [artists, setArtists] = useState<GETArtist[]>([]);
    const [newArtist, setNewArtist] = useState<ArtistFormState>({ mode: "none" });
    

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

     function addArtist() {
        setNewArtist({ mode: "new" });
    }

    async function save(a: ArtistCreate){
            await PostArtist(a);
            await carregarArtists()
            setNewArtist({ mode: "none" });
    }
    
    async function update(a: ArtistCreate) {
            const id = newArtist.mode === "edit" ? newArtist.artist.id: "";
            await PutArtist(id, a);
            await carregarArtists()
            setNewArtist({ mode: "none" });
    }

    function editarArtist(artist: Artist) {
    setNewArtist({
        mode: "edit",
        artist
    });
}

        
    return(
        <>
            <main>
                <h1>Llistat d'artistes</h1>

                {
                    artists.length > 0 ?
                        <table>
                            <thead>
                                <title>ListArtist</title>
                            </thead>
                            <tbody>
                                <ul>
                                    {artists.map((a) => (
                                        <li key={a.id}>
                                            {a.name}
                                            {a.pseudonym}
                                            <button onClick={() => editarArtist(a)}>Editar</button>
                                        </li>
                                    ))}
                                </ul>
                            </tbody>
                        </table>
                        : <p>
                            No Artist available
                        </p>
                }
            </main>
            {
                newArtist.mode === "new" ?
                    <AddArtistForm submit={(a) => save(a)} />
                    : newArtist.mode === "edit" ?
                        <AddArtistForm submit={(a) => update(a)} artist={newArtist.artist}/> 
                    : <button onClick={addArtist}>Afegir</button>
            }
        </>
    )
}
export default ArtistManagement;

