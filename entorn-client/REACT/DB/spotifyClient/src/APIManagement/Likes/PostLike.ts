import type { LikeCreate } from "./Interfaces/LikeCreate";
import { ENV } from "../../Config/env";

export async function PostLike(newLike: LikeCreate): Promise<boolean> {
    const response: Response = await fetch(
        `${ENV.API_BASE_URL}/likes`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newLike)
        });
    return response.ok;
}