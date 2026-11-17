const BASE_URL = "http://localhost:3000/users";

// Connexion
export async function login(username, password) {
  const response = await fetch(
    `${BASE_URL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la connexion");
  }

  const users = await response.json();

  if (users.length > 0) {
    return true;
  }

  return null;
}
