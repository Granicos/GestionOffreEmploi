import JobForm from "../components/JobForm";
import { addJob } from "../services/jobService";

export default function AddJob() {
    const handleAddJob = async (jobData) => {
        await addJob({
            ...jobData,
            datePublication: new Date().toISOString().split("T")[0],
        });
    };

    return (
        <JobForm
            title="Ajouter une offre d'emploi"
            submitLabel="Publier l'offre"
            loadingLabel="Ajout en cours..."
            successMessage="Offre ajoutée"
            onSubmit={handleAddJob}
        />
    );
}
