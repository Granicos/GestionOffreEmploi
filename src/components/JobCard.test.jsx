import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import JobCard from "./JobCard";

const baseJob = {
  id: 7,
  titre: "Développeur React",
  localisation: "Paris",
  disponible: true,
};

function renderCard(job = baseJob, props = {}) {
  return render(
    <MemoryRouter>
      <JobCard job={job} {...props} />
    </MemoryRouter>,
  );
}

describe("JobCard", () => {
  test("affiche le titre et la localisation", () => {
    renderCard();

    expect(
      screen.getByRole("heading", { level: 3, name: "Développeur React" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Paris/)).toBeInTheDocument();
  });

  test("affiche l'initiale du titre en majuscule dans l'avatar", () => {
    renderCard({ ...baseJob, titre: "analyste données" });

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  test("affiche « ? » dans l'avatar quand le titre est absent", () => {
    renderCard({ ...baseJob, titre: undefined });

    expect(screen.getByText("?")).toBeInTheDocument();
  });

  test("affiche « Disponible » quand l'offre est disponible", () => {
    const { container } = renderCard({ ...baseJob, disponible: true });

    expect(screen.getByText("Disponible")).toBeInTheDocument();
    expect(screen.queryByText("Non disponible")).not.toBeInTheDocument();
    expect(container.querySelector(".dot-available")).toBeInTheDocument();
  });

  test("affiche « Non disponible » quand l'offre n'est pas disponible", () => {
    const { container } = renderCard({ ...baseJob, disponible: false });

    expect(screen.getByText("Non disponible")).toBeInTheDocument();
    expect(container.querySelector(".dot-unavailable")).toBeInTheDocument();
    expect(container.querySelector(".dot-available")).not.toBeInTheDocument();
  });

  test("contient un lien vers la page de détails de l'offre", () => {
    renderCard();

    expect(
      screen.getByRole("link", { name: /Voir les détails/ }),
    ).toHaveAttribute("href", "/jobs/7");
  });
});
