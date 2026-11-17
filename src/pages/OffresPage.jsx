import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import NavBarFiltrage from "../components/NavBarFiltrage";
import { getJobs } from "../services/jobService";

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
    <div className="container-fluid mt-5 px-4 text-center">
      <h1>Bienvenue sur la Recherche d'Offres d'Emploi</h1>
      <div className="row">
        <NavBarFiltrage
          selectedDomaine={domaine}
          onDomaineChange={setDomaine}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
        <main className="col-12 col-md-9 col-lg-10">
          {filteredJobs.length > 0 ? (
            <div className="row">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <p>Aucune offre ne correspond à votre recherche.</p>
          )}
        </main>
      </div>
    </div>
  );
}
