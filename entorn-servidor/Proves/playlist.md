```bash
curl --location 'http://localhost:3000/playlists' \
--header 'Content-Type: application/json' \
--data '{
    "title":"novaPlaylist",
    "user_id":"C2CFE8EE-F0CF-4C57-A256-E3495D7CA7BC"

}'
```

**Resultat esperat:**

Codi HTTP: 201 Created.

La playlist s'afegeix correctament a la base de dades.