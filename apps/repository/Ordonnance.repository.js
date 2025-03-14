import Ordonnance from "../entities/Ordonnance.entity.js";
import Medicament from "../entities/Medicament.entity.js";
import { Op } from "sequelize";

class OrdonnanceRepository {
    async findAll(page = 0, limit = 10, nom_patient = "") {
        const whereClause = nom_patient ? { nom_patient: { [Op.like]: `%${nom_patient}%` } } : {};

        return await Ordonnance.findAll({
            where: whereClause,
            offset: parseInt(page) * parseInt(limit),
            limit: parseInt(limit)
        });
    }

    async findById(id) {
        return await Ordonnance.findByPk(id);
    }

    async findMedicamentsByOrdonnanceId(id) {
        const ordonnance = await Ordonnance.findByPk(id, {
            include: {
                model: Medicament,
                attributes: ["id", "nom", "description", "effets_secondaires"],
                through: { attributes: [] }
            }
        });

        if (!ordonnance) {
            throw new Error("Ordonnance introuvable");
        }
        
        return ordonnance.medicaments.map(med => ({
            id: med.id,
            nom: med.nom,
            description: med.description,
            effets_secondaires: med.effets_secondaires
        }));
    }

    async create(data) {
        return await Ordonnance.create(data);
    }

    async update(ordonnance, data) {
        return await ordonnance.update(data);
    }

    async delete(id) {
        return await Ordonnance.destroy({ where: { id } });
    }

    async addMedicaments(ordonnance, medicaments) {
        return await ordonnance.addMedicaments(medicaments);
    }

    async setMedicaments(ordonnance, medicaments) {
        return await ordonnance.setMedicaments(medicaments);
    }
}

const ordonnanceRepository = new OrdonnanceRepository();
export default ordonnanceRepository;
