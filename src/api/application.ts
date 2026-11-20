import type { Application } from "../types"

// one key with a name to avoid any colissions with other localhost apps
const STORAGE_KEY = "jotit:applications"

function read(): Application[] {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
        return Array.isArray(data) ? data : []
    } catch {
        return []
    }
}

function write(applications: Application[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
}

export async function createApplication(data: Omit<Application, "_id">): Promise<Application> {
    const created: Application = { ...data, _id: crypto.randomUUID() }
    write([...read(), created])
    return created
}

export async function getApplications(): Promise <Application[]> {
    return read()
}

export async function editApplication(id: string, data: Partial<Application>): Promise <Application> {
    const applications = read()
    const index = applications.findIndex(a => a._id === id)
    if (index === -1) throw new Error("Application not found")

    const updated = { ...applications[index], ...data, _id: id }
    applications[index] = updated
    write(applications)
    return updated
}

export async function deleteApplication(id: string) {
    write(read().filter(a => a._id !== id))
}

export async function duplicateApplication(id: string): Promise<Application> {
    const original = read().find(a => a._id === id)
    if(!original) throw new Error("Application not found")

    const { _id, ...data } = original
    return createApplication(data)
}