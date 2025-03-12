import Medicament from "../entities/Medicament.entity.js";
import { Op } from "sequelize";

class MedicamentRepository {
    async findAllByPage(page = 0, limit = 10, nom = "") {
        const whereClause = nom ? { nom: { [Op.like]: `%${nom}%` } } : {};

        return await Medicament.findAll({
            where: whereClause,
            offset: parseInt(page) * parseInt(limit),
            limit: parseInt(limit)
        });
    }

    async findById(id) {
        return await Medicament.findByPk(id);
    }

    async create(data) {
        return await Medicament.create(data);
    }

    async update(medicament, data) {
        return await medicament.update(data);
    }

    async delete(id) {
        return await Medicament.destroy({ where: { id } });
    }
}

const medicamentRepository = new MedicamentRepository();
export default medicamentRepository;
