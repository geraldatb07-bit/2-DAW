import { ENV } from "../../Config/env";

export async function GetLike(trackId: string): Promise<number> {
    const response: Response = await fetch(`${ENV.API_BASE_URL}/likes/${trackId}`);
    const result: { data: number } = await response.json() as { data: number };
    return result.data;
}