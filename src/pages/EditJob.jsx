import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import JobForm from "../components/JobForm";
import { getJobById, updateJob } from "../services/jobService";

export default function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loadingJob, setLoadingJob] = useState(true);
    const [fetchError, setFetchError] = useState("");

    useEffect(() => {
        let isCancelled = false;

        const fetchJob = async () => {
            try {
                setLoadingJob(true);
                setFetchError("");
                const data = await getJobById(id);
                if (!isCancelled) {
                    setJob(data);
                }
            } catch (error) {
                console.error(error);
                if (!isCancelled) {
                    setFetchError("Impossible de charger cette offre d'emploi.");
                }
            } finally {
                if (!isCancelled) {
                    setLoadingJob(false);
                }
            }
        };

        fetchJob();

        return () => {
            isCancelled = true;
        };
    }, [id]);

    const handleUpdateJob = async (updatedFields) => {
        await updateJob(id, updatedFields);
    };

    if (loadingJob) {
        return (
            <div className="container mt-5 text-center">
                <p>Chargement de l&apos;offre...</p>
            </div>
        );
    }

    if (fetchError || !job) {
        return (
            <div className="container mt-5" style={{ maxWidth: "700px" }}>
                <div className="alert alert-danger">
                    {fetchError || "Offre d'emploi introuvable."}
                </div>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}
                >
                    Retour à l&apos;accueil
                </button>
            </div>
        );
    }

    return (
        <JobForm
            key={job.id ?? id}
            title="Modifier l'offre d'emploi"
            submitLabel="Enregistrer les modifications"
            loadingLabel="Modification en cours..."
            successMessage="Offre modifiée"
            initialValues={job}
            onSubmit={handleUpdateJob}
        />
    );
}
