import apiClient from '../utils/api-client'
import { jwtDecode } from 'jwt-decode';   // ✅ use named import

const TOKEN_NAME = "token";   

export async function signup(user, profile) {
    const body = new FormData();
    body.append("name", user.name);
    body.append("email", user.email);
    body.append("password", user.password);
    body.append("deliveryAddress", user.deliveryAddress);
    body.append("profilePic", profile);

    const { data } = await apiClient.post("/user/signup", body);
    localStorage.setItem(TOKEN_NAME, data.token); 
}

export async function login(user) {
    const { data } = await apiClient.post("/user/login", user);
    localStorage.setItem(TOKEN_NAME, data.token);  
}

export function logout() {
    localStorage.removeItem(TOKEN_NAME);  
}

export function getUser() {
    try {
        const jwt = localStorage.getItem(TOKEN_NAME); 
        return jwt ? jwtDecode(jwt) : null;   // ✅ safe decode
    } catch {
        return null;   
    }
}

export function getJwt() {
    return localStorage.getItem(TOKEN_NAME);
}
