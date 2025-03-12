import { validationResult } from "express-validator";
import medicamentController from "../controllers/medicament.controller.js";
import {
    validateMedicamentCreation,
    validateMedicamentUpdate,
    validateMedicamentId,
    validatePagination
} from "../validators/medicament.validator.js";

/**
 * @swagger
 * tags:
 *   name: Médicaments
 *   description: API pour la gestion des médicaments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Medicament:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID du médicament (généré automatiquement)
 *         nom:
 *           type: string
 *           description: Nom du médicament
 *         description:
 *           type: string
 *           description: Description du médicament
 *         effets_secondaires:
 *           type: string
 *           description: Effets secondaires possibles
 *       example:
 *         id: 1
 *         nom: "Paracétamol"
 *         description: "Un médicament utilisé pour traiter la douleur et la fièvre."
 *         effets_secondaires: "Nausées, somnolence"
 * 
 *     MedicamentInput:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *           description: Nom du médicament
 *         description:
 *           type: string
 *           description: Description du médicament
 *         effets_secondaires:
 *           type: string
 *           description: Effets secondaires possibles
 *       example:
 *         nom: "Paracétamol"
 *         description: "Un médicament utilisé pour traiter la douleur et la fièvre."
 *         effets_secondaires: "Nausées, somnolence"
 */

/**
 * @swagger
 * /medicaments:
 *   get:
 *     summary: Récupère la liste des médicaments avec pagination et filtre par nom
 *     tags: [Médicaments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numéro de la page (défaut = 0)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments par page (défaut = 10)
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         description: Nom du médicament à rechercher
 *     responses:
 *       200:
 *         description: Liste des médicaments récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medicament'
 */

/**
 * @swagger
 * /medicaments:
 *   post:
 *     summary: Crée un nouveau médicament
 *     tags: [Médicaments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicamentInput'
 *     responses:
 *       201:
 *         description: Médicament créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicament'
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /medicaments/{id}:
 *   get:
 *     summary: Récupère un médicament par son ID
 *     tags: [Médicaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du médicament à récupérer
 *     responses:
 *       200:
 *         description: Médicament récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicament'
 *       404:
 *         description: Médicament non trouvé
 */

/**
 * @swagger
 * /medicaments/{id}:
 *   put:
 *     summary: Met à jour un médicament existant
 *     tags: [Médicaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du médicament à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicamentInput'
 *     responses:
 *       200:
 *         description: Médicament mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicament'
 *       404:
 *         description: Médicament non trouvé
 */

/**
 * @swagger
 * /medicaments/{id}:
 *   delete:
 *     summary: Supprime un médicament
 *     tags: [Médicaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du médicament à supprimer
 *     responses:
 *       200:
 *         description: Médicament supprimé avec succès
 *       404:
 *         description: Médicament non trouvé
 */

const medicamentRouter = (app) => {

    const validate = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };

    app.get("/medicaments", validatePagination, validate, medicamentController.getAllMedicaments);
    app.post("/medicaments", validateMedicamentCreation, validate, medicamentController.createMedicament);
    app.get("/medicaments/:id", validateMedicamentId, validate, medicamentController.getMedicamentById);
    app.put("/medicaments/:id", validateMedicamentId, validateMedicamentUpdate, validate, medicamentController.updateMedicament);
    app.delete("/medicaments/:id", validateMedicamentId, validate, medicamentController.deleteMedicament);

};

export default medicamentRouter;
