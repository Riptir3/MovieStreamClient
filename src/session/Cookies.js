import Cookies from "js-cookie";

export const saveSession = (name, data) =>{
    const value = typeof data === 'object' ? JSON.stringify(data) : data;
    Cookies.set(name, value, { expires: 1/24, sameSite: 'lax' });
}

export const getSession = (name) =>{
const session = Cookies.get(name);
    if (!session) return null;
    try {
        return JSON.parse(session);
    } catch {
        return session; 
    }
}

export const removeSession = (name) =>{
    Cookies.remove(name)
}
