const BASE_URL = "http://localhost:3000/users";

// Connexion
export async function login(email, password) {
  const response = await fetch(
    `${BASE_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
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

export async function SignIn(userData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'inscription");
  }

  return await response.json();
}
