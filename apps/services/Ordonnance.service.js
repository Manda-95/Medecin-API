import ordonnanceRepository from "../repository/Ordonnance.repository.js";

class OrdonnanceService {
    async getAll(page, limit, nom_patient) {
        return await ordonnanceRepository.findAll(page, limit, nom_patient);
    }

    async getById(id) {
        const ordonnance = await ordonnanceRepository.findById(id);
        if (!ordonnance) {
            throw new Error("Ordonnance introuvable");
        }
        return ordonnance;
    }

    async create(data) {
        const { nom_patient, medicaments } = data;
        if (!nom_patient || !Array.isArray(medicaments)) {
            throw new Error("Données invalides");
        }
        const ordonnance = await ordonnanceRepository.create({ nom_patient });
        if (medicaments.length > 0) {
            await ordonnanceRepository.addMedicaments(ordonnance, medicaments);
        }
        return ordonnance;
    }

    async update(id, data) {
        const ordonnance = await ordonnanceRepository.findById(id);
        if (!ordonnance) {
            throw new Error("Ordonnance introuvable");
        }

        const { nom_patient, medicaments } = data;

        if (nom_patient) {
            await ordonnanceRepository.update(ordonnance, { nom_patient });
        }

        if (medicaments && Array.isArray(medicaments)) {
            await ordonnanceRepository.setMedicaments(ordonnance, medicaments);
        }

        return ordonnance;
    }

    async delete(id) {
        return await ordonnanceRepository.delete(id);
    }
}

const ordonnanceService = new OrdonnanceService();
export default ordonnanceService;
