import { Session } from "@/types/session";
import { signal } from "@preact/signals";

const STORAGE_KEY = "concentration-tracker:sessions";

function load(): Session[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Session[]) : [];
    } catch {
        return [];
    }
}

function persist(sessions: Session[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch {
        // we're ignoring it >:))
    }
}

const sessions = signal<Session[]>(load());

export function useSessionHistory() {
    const addSession = (session: Session) => {
        sessions.value = [session, ...sessions.value];
        persist(sessions.value);
    };

    const deleteSession = (id: string) => {
        sessions.value = sessions.value.filter((s) => s.id !== id);
        persist(sessions.value);
    };

    const clearAll = () => {
        sessions.value = [];
        persist([]);
    };

    return { sessions, addSession, deleteSession, clearAll };
}
