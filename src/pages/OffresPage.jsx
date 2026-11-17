import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import NavBarFiltrage from "../components/NavBarFiltrage";
import { getJobs } from "../services/jobService";

export default function OffresPage() {
  const [jobs, setJobs] = useState([]);
  const [domaine, setDomaine] = useState("");

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
        />
        <main className="col-12 col-md-9 col-lg-10">
          <div className="row">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
