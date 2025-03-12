import medicamentRepository from "../repository/Medicament.repository.js";

class MedicamentService {
    async getAll(page, limit, nom) {
        return await medicamentRepository.findAllByPage(page, limit, nom);
    }

    async getById(id) {
        const medicament = await medicamentRepository.findById(id);
        if (!medicament) {
            throw new Error("Médicament introuvable");
        }
        return medicament;
    }

    async create(data) {
        if (!data.nom) {
            throw new Error("Le nom est requis");
        }
        return await medicamentRepository.create(data);
    }

    async update(id, data) {
        const medicament = await medicamentRepository.findById(id);
        if (!medicament) {
            throw new Error("Médicament introuvable");
        }
        return await medicamentRepository.update(medicament, data);
    }

    async delete(id) {
        return await medicamentRepository.delete(id);
    }
}

const medicamentService = new MedicamentService();
export default medicamentService;
