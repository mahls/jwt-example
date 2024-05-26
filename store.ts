import { atom } from 'jotai';

// Atom to hold the authentication token
export const authTokenAtom = atom<string | null>(() => {
    // Initialize state from localStorage
    return localStorage.getItem('authToken');
});

// Atom to update and persist the token to localStorage
export const authTokenWithPersistenceAtom = atom(
    (get) => get(authTokenAtom),
    (get, set, update: string | null) => {
        set(authTokenAtom, update);
        if (update === null) {
            localStorage.removeItem('authToken');
        } else {
            localStorage.setItem('authToken', update);
        }
    }
);