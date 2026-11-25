import { ENV } from "../../Config/env";
import type { HistoryCreate } from "./Interfaces/HistoryCreate";

export async function postHistory(newHistory: HistoryCreate): Promise<void> {
    const response:Response = await fetch (
        `${ENV.API_BASE_URL}/history`,
        {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(newHistory)
        });
}