import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, expect, test, vi } from "vitest";
import Navbar from "./NavBarHorizon";
import { useAuth } from "../hooks/useAuth";

vi.mock("../hooks/useAuth");

function renderNavbar() {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.resetAllMocks();
});

test("affiche le nom du site", () => {
  useAuth.mockReturnValue({ user: null, logout: vi.fn() });
  renderNavbar();

  expect(screen.getByText("JobFinder")).toBeInTheDocument();
});

test("déconnecté : affiche Inscription et Connexion", () => {
  useAuth.mockReturnValue({ user: null, logout: vi.fn() });
  renderNavbar();

  expect(screen.getByText("Inscription")).toBeInTheDocument();
  expect(screen.getByText("CONNEXION")).toBeInTheDocument();
  expect(screen.queryByText("Déconnexion")).not.toBeInTheDocument();
  expect(screen.queryByText("Ajouter une offre")).not.toBeInTheDocument();
});

test("connecté : affiche Ajouter une offre et Déconnexion", () => {
  useAuth.mockReturnValue({ user: { id: 1 }, logout: vi.fn() });
  renderNavbar();

  expect(screen.getByText("Ajouter une offre")).toBeInTheDocument();
  expect(screen.getByText("Déconnexion")).toBeInTheDocument();
  expect(screen.queryByText("Inscription")).not.toBeInTheDocument();
  expect(screen.queryByText("CONNEXION")).not.toBeInTheDocument();
});

test("appelle logout au clic sur Déconnexion", async () => {
  const logout = vi.fn();
  useAuth.mockReturnValue({ user: { id: 1 }, logout });
  renderNavbar();

  await fireEvent.click(screen.getByText("Déconnexion"));

  expect(logout).toHaveBeenCalledTimes(1);
});
