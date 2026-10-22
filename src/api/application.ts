const BASE = "http://localhost:3000/applications"

export async function createApplication(data: unknown) {
    const res = await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create application")
    return res.json()
}