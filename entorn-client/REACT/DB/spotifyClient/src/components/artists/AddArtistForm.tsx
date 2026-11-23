import { useState, useEffect, type SubmitEvent } from "react";
import { ENV } from "../../Config/env";
import type { GETCountry } from "../../APIManagement/Countries/Interfaces/Countries";
import type { ArtistCreate } from "../../APIManagement/Artists/Interfaces/ArtistCreate";
import type { AddArtistFormProps } from "./Types/AddArtistFormProps";

const AddArtistForm = (props: AddArtistFormProps) => {

    const [countries, setCountries] = useState<GETCountry[]>([]);

    async function carregarCountries() {
        const resposta: Response = await fetch(`${ENV.API_BASE_URL}/countries`);
        const listCountry: GETCountry[] = await resposta.json() as GETCountry[];
        setCountries(listCountry);
    }

    useEffect(
        () => {
            carregarCountries();
        }, []
    )

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const artist: ArtistCreate = {
            nom: String(formData.get("nom") ?? "").trim(),
            pseudonim: String(formData.get("pseudonim") ?? "").trim(),
            pais_id: String(formData.get("pais_id") ?? "").trim()
        }
         props.submit(artist);
    }

    return (
        <>
            <h1>{props.artist ? "Editar artista" : "Afegir artista"}</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Nom:
                        <input
                            type="text"
                            name="nom"
                            defaultValue={props.artist?.name}
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>Pseudonim:
                        <input type="text"
                            name="pseudonim"
                            defaultValue={props.artist?.pseudonym}
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>Pais:
                        {
                            countries.length > 0
                                ? <select
                                    name="pais_id"
                                    defaultValue={props.artist?.country_id}
                                >

                                    {
                                        countries.map((c: GETCountry) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))
                                    }
                                </select>
                                : <></>
                        }
                    </label>
                </p>
                <button type="submit">Desa</button>
            </form>
        </>
    )
}
export default AddArtistForm;