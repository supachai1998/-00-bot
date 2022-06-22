import fetch from "node-fetch";
import { URLSearchParams } from "url";
export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendLine = async (msg: string, apiLine: any) => {
    const form = new URLSearchParams();
    if (!apiLine) return null;
    form.append("message", msg);

    const result = await fetch("https://notify-api.line.me/api/notify", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiLine}`,
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form,
    })
        .then((res) => res.json())
        .then((data) => data);
    return result;
};
