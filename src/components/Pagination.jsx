export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination des offres" className="mt-4">
      <ul className="pagination pagination-theme justify-content-center flex-wrap gap-2 mb-0">
        <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link rounded-pill px-3"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            ← Précédent
          </button>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <button
              type="button"
              className="page-link rounded-circle"
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}
        >
          <button
            type="button"
            className="page-link rounded-pill px-3"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Suivant →
          </button>
        </li>
      </ul>
    </nav>
  );
}
