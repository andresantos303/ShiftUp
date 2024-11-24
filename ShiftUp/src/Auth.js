// Simula um token de autenticação (normalmente você obteria isso de um servidor)
const TOKEN_KEY = "authToken";

// Simula o login do usuário (realmente seria uma chamada para a API)
export function login(username, password) {
  // Substituir por lógica real de login
  if (username === "user" && password === "password") {
    const fakeToken = "1234567890abcdef"; // Simula um token JWT ou similar
    localStorage.setItem(TOKEN_KEY, fakeToken);
    return true; // Retorna sucesso
  } else {
    return false; // Falha na autenticação
  }
}

// Simula o logout do usuário
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

// Verifica se o usuário está autenticado
export function isAuthenticated() {
  return localStorage.getItem(TOKEN_KEY) !== null;
}

// Obtém o token de autenticação armazenado
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
