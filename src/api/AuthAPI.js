import API, { TOKEN_KEY, USER_KEY } from "./APIUtils";
import { setLocalStorage } from "../utils";
import { setToken } from "./APIUtils";

function handleLoginResponse(response) {
  setLocalStorage(TOKEN_KEY, response.data.accessToken);
  setLocalStorage(USER_KEY, response.data);
  setToken(response.data.accessToken);
  return response.data;
}

export async function login(email, password) {
  return API.post("/auth/signin", {
    email,
    password,
  })
    .then((res) => handleLoginResponse(res))
    .catch((err) => err);
}

export function getCurrentUser(userId) {
  return API.get(`/auth/user/${userId}`).catch((err) => err);
}

export function register(email, password, firstname, lastname, role) {
  return API.post("/auth/createAdmin", {
    email,
    password,
    firstname,
    lastname,
    role,
  })
    .then((res) => res)
    .catch((err) => err);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setToken(null);
}
