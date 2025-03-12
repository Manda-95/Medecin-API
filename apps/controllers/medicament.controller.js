import medicamentService from "../services/Medicament.service.js";

class MedicamentController {
    async getAllMedicaments(req, res, next) {
        try {
            const { page = 0, limit = 10, nom = "" } = req.query;
            const medicaments = await medicamentService.getAll(page, limit, nom);
            res.json(medicaments);
        } catch (err) {
            next(err);
        }
    }

    async getMedicamentById(req, res, next) {
        try {
            const { id } = req.params;
            const medicament = await medicamentService.getById(id);
            res.json(medicament);
        } catch (err) {
            next(err);
        }
    }

    async createMedicament(req, res, next) {
        try {
            const medicament = await medicamentService.create(req.body);
            res.status(201).json(medicament);
        } catch (err) {
            next(err);
        }
    }

    async updateMedicament(req, res, next) {
        try {
            const medicament = await medicamentService.update(req.params.id, req.body);
            res.json(medicament);
        } catch (err) {
            next(err);
        }
    }

    async deleteMedicament(req, res, next) {
        try {
            await medicamentService.delete(req.params.id);
            res.json({ message: "Médicament supprimé avec succès" });
        } catch (err) {
            next(err);
        }
    }
}

const medicamentController = new MedicamentController();
export default medicamentController;
