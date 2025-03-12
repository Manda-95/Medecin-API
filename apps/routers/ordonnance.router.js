import { validationResult } from "express-validator";
import ordonnanceController from "../controllers/ordonnance.controller.js";
import {
    validateOrdonnanceCreation,
    validateOrdonnanceUpdate,
    validateOrdonnanceId,
    validatePagination
} from "../validators/ordonnance.validator.js";


/**
 * @swagger
 * tags:
 *   name: Ordonnances
 *   description: API pour la gestion des ordonnances
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ordonnance:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de l'ordonnance (généré automatiquement)
 *         nom_patient:
 *           type: string
 *           description: Nom du patient
 *         medicaments:
 *           type: array
 *           items:
 *             type: integer
 *           description: Liste des IDs des médicaments associés
 *       example:
 *         id: 1
 *         nom_patient: "Jean Dupont"
 *         medicaments: [1, 2, 3]
 * 
 *     OrdonnanceInput:
 *       type: object
 *       properties:
 *         nom_patient:
 *           type: string
 *           description: Nom du patient
 *         medicaments:
 *           type: array
 *           items:
 *             type: integer
 *           description: Liste des IDs des médicaments associés
 *       example:
 *         nom_patient: "Jean Dupont"
 *         medicaments: [1, 2, 3]
 */

/**
 * @swagger
 * /ordonnances:
 *   get:
 *     summary: Récupère la liste des ordonnances avec pagination
 *     tags: [Ordonnances]
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
 *         name: nom_patient
 *         schema:
 *           type: string
 *         description: Nom du patient de l'ordonnance à rechercher
 *     responses:
 *       200:
 *         description: Liste des ordonnances récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ordonnance'
 */

/**
 * @swagger
 * /ordonnances/{id}:
 *   get:
 *     summary: Récupère une ordonnance par ID
 *     tags: [Ordonnances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'ordonnance
 *     responses:
 *       200:
 *         description: Ordonnance récupérée avec succès
 *       404:
 *         description: Ordonnance non trouvée
 */

/**
 * @swagger
 * /ordonnances/{id}/medicaments:
 *   get:
 *     summary: Récupère uniquement la liste des médicaments d'une ordonnance
 *     tags: [Ordonnances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'ordonnance
 *     responses:
 *       200:
 *         description: Liste des médicaments récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID du médicament
 *                   nom:
 *                     type: string
 *                     description: Nom du médicament
 *                   description:
 *                     type: string
 *                     description: Description du médicament
 *       404:
 *         description: Ordonnance non trouvée
 */

/**
 * @swagger
 * /ordonnances:
 *   post:
 *     summary: Crée une nouvelle ordonnance avec des médicaments
 *     tags: [Ordonnances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrdonnanceInput'
 *     responses:
 *       201:
 *         description: Ordonnance créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ordonnance'
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /ordonnances/{id}:
 *   put:
 *     summary: Met à jour une ordonnance existante
 *     tags: [Ordonnances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'ordonnance à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrdonnanceInput'
 *     responses:
 *       200:
 *         description: Ordonnance mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ordonnance'
 *       404:
 *         description: Ordonnance non trouvée
 */

/**
 * @swagger
 * /ordonnances/{id}:
 *   delete:
 *     summary: Supprime une ordonnance
 *     tags: [Ordonnances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'ordonnance à supprimer
 *     responses:
 *       200:
 *         description: Ordonnance supprimée avec succès
 *       404:
 *         description: Ordonnance non trouvée
 */

const ordonnanceRouter = (app) => {
    const validate = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };

    app.get("/ordonnances", validatePagination, validate, ordonnanceController.getAllOrdonnances);
    app.post("/ordonnances", validateOrdonnanceCreation, validate, ordonnanceController.createOrdonnance);
    app.get("/ordonnances/:id", validateOrdonnanceId, validate, ordonnanceController.getOrdonnanceById);
    app.get("/ordonnances/:id/medicaments", validateOrdonnanceId, validate, ordonnanceController.getOrdonnanceMedicaments);
    app.put("/ordonnances/:id", validateOrdonnanceId, validateOrdonnanceUpdate, validate, ordonnanceController.updateOrdonnance);
    app.delete("/ordonnances/:id", validateOrdonnanceId, validate, ordonnanceController.deleteOrdonnance);
};

export default ordonnanceRouter;