import ordonnanceService from "../services/Ordonnance.service.js";

class OrdonnanceController {
    async getAllOrdonnances(req, res, next) {
        try {
            const { page = 0, limit = 10, nom_patient = "" } = req.query;
            const ordonnances = await ordonnanceService.getAll(page, limit, nom_patient);
            res.json(ordonnances);
        } catch (err) {
            next(err);
        }
    }

    async getOrdonnanceById(req, res, next) {
        try {
            const ordonnance = await ordonnanceService.getById(req.params.id);
            res.json(ordonnance);
        } catch (err) {
            next(err);
        }
    }

    async getOrdonnanceMedicaments(req, res, next) {
        try {
            const medicaments = await ordonnanceService.getMedicamentsByOrdonnanceId(req.params.id);
            res.json(medicaments);
        } catch (err) {
            next(err);
        }
    }    

    async createOrdonnance(req, res, next) {
        try {
            const ordonnance = await ordonnanceService.create(req.body);
            res.status(201).json(ordonnance);
        } catch (err) {
            next(err);
        }
    }

    async updateOrdonnance(req, res, next) {
        try {
            const ordonnance = await ordonnanceService.update(req.params.id, req.body);
            res.json(ordonnance);
        } catch (err) {
            next(err);
        }
    }

    async deleteOrdonnance(req, res, next) {
        try {
            await ordonnanceService.delete(req.params.id);
            res.json({ message: "Ordonnance supprimée avec succès" });
        } catch (err) {
            next(err);
        }
    }
}

const ordonnanceController = new OrdonnanceController();
export default ordonnanceController;
