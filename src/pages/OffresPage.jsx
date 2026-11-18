import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import NavBarFiltrage from "../components/NavBarFiltrage";
import { getJobs } from "../services/jobService";
import "../styles/theme.css";

export default function OffresPage() {
  const [jobs, setJobs] = useState([]);
  const [domaine, setDomaine] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const searchWords = searchTerm.trim().toLocaleLowerCase().split(/\s+/);
  const filteredJobs = jobs.filter((job) => {
    if (!searchTerm.trim()) return true;

    const searchableText = [job.titre, ...(job.competences ?? [])]
      .join(" ")
      .toLocaleLowerCase();

    return searchWords.every((word) => searchableText.includes(word));
  });

  useEffect(() => {
    getJobs({ domaine })
      .then(({ data }) => setJobs(data))
      .catch((error) => console.error(error));
  }, [domaine]);

  return (
    <div className="container-xxl py-4">
      <header className="hero text-center rounded-4 p-4 p-md-5 mb-4">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <h1 className="display-5 fw-bold">
          Trouvez l'offre qui vous correspond ✨
        </h1>
        <p className="lead mb-0">
          Recherchez parmi nos offres d'emploi et filtrez par domaine.
        </p>
      </header>

      <div className="row">
        <NavBarFiltrage
          selectedDomaine={domaine}
          onDomaineChange={setDomaine}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />

        <main className="col-12 col-md-8 col-lg-9">
          <p className="results-count text-secondary fw-medium text-start mb-3">
            <span>{filteredJobs.length}</span> offre
            {filteredJobs.length > 1 ? "s" : ""} trouvée
            {filteredJobs.length > 1 ? "s" : ""}
          </p>

          {filteredJobs.length > 0 ? (
            <div className="row g-4">
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
          ) : (
            <div className="empty-state bg-white rounded-4 text-secondary text-center py-5">
              Aucune offre ne correspond à votre recherche.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
