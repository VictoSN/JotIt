import type { Application } from "../types"

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

export async function getApplications(): Promise <Application[]> {
    const res = await fetch(BASE)
    if(!res.ok) throw new Error("Failed to fetch applications")
    return res.json()
}

export async function deleteApplication(id: string) {
    const res = await fetch(`${BASE}/${id}`, { method: "DELETE" })
    if(!res.ok) throw new Error("Failed to delete application")
}

export async function duplicateApplication(id: string): Promise<Application> {
    const res = await fetch(`${BASE}/${id}/duplicate`, { method: "POST" })
    if(!res.ok) throw new Error("Failed to duplicate application")
    return res.json()
}