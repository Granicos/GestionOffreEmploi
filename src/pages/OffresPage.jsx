import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import NavBarFiltrage from "../components/NavBarFiltrage";
import Pagination from "../components/Pagination";
import { getJobs } from "../services/jobService";
import "../styles/theme.css";

const ITEMS_PER_PAGE = 6;

export default function OffresPage() {
  const [jobs, setJobs] = useState([]);
  const [domaine, setDomaine] = useState("");
  const [loadError, setLoadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const hasSearch = searchTerm.trim().length > 0;
  const searchWords = searchTerm.trim().toLocaleLowerCase().split(/\s+/);
  const filteredJobs = hasSearch
    ? jobs.filter((job) => {
        const searchableText = [job.titre, ...(job.competences ?? [])]
          .join(" ")
          .toLocaleLowerCase();

        return searchWords.every((word) => searchableText.includes(word));
      })
    : jobs;

  const effectiveTotalPages = hasSearch
    ? Math.max(1, Math.ceil(filteredJobs.length / ITEMS_PER_PAGE))
    : totalPages;
  const safePage = Math.min(currentPage, effectiveTotalPages);
  const displayedJobs = hasSearch
    ? filteredJobs.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
      )
    : jobs;
  const displayedCount = hasSearch ? filteredJobs.length : totalItems;

  const handleDomaineChange = (nextDomaine) => {
    setDomaine(nextDomaine);
    setCurrentPage(1);
  };

  const handleSearchTermChange = (nextSearch) => {
    setSearchTerm(nextSearch);
    setCurrentPage(1);
  };

  useEffect(() => {
    let isCancelled = false;

    const params = hasSearch
      ? { domaine }
      : { page: currentPage, limit: ITEMS_PER_PAGE, domaine };

    getJobs(params)
      .then(({ data, totalCount, totalPages: apiTotalPages }) => {
        if (!isCancelled) {
          setLoadError("");
          setJobs(data);
          setTotalItems(totalCount);
          setTotalPages(apiTotalPages);
        }
      })
      .catch((error) => {
        console.error(error);
        if (!isCancelled) {
          setLoadError(
            "Impossible de charger les offres. Vérifiez que json-server est lancé sur le port 3000.",
          );
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [domaine, currentPage, hasSearch]);

  return (
    <div className="container-xxl py-4">
      <header className="hero text-center rounded-4 p-4 p-md-5 mb-4">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <h1 className="display-5 fw-bold">
          Trouvez l&apos;offre qui vous correspond ✨
        </h1>
        <p className="lead mb-0">
          Recherchez parmi nos offres d&apos;emploi et filtrez par domaine.
        </p>
      </header>
      <div className="container-fluid mt-5 px-4 text-center">
        <h1>Bienvenue sur la Recherche d&apos;Offres d&apos;Emploi</h1>

        {loadError && (
          <div
            className="alert alert-danger mx-auto mt-3"
            style={{ maxWidth: "600px" }}
            role="alert"
          >
            {loadError}
          </div>
        )}

        <div className="row">
          <NavBarFiltrage
            selectedDomaine={domaine}
            onDomaineChange={handleDomaineChange}
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchTermChange}
          />

          <main className="col-12 col-md-8 col-lg-9">
            <p className="results-count text-secondary fw-medium text-start mb-3">
              <span>{displayedCount}</span> offre
              {displayedCount > 1 ? "s" : ""} trouvée
              {displayedCount > 1 ? "s" : ""}
            </p>

            {displayedJobs.length > 0 ? (
              <>
                <div className="row g-4">
                  {displayedJobs.map((job, index) => (
                    <JobCard key={job.id} job={job} index={index} />
                  ))}
                </div>
                <Pagination
                  currentPage={safePage}
                  totalPages={effectiveTotalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="empty-state bg-white rounded-4 text-secondary text-center py-5">
                Aucune offre ne correspond à votre recherche.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
