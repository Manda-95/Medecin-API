import { body, param, query } from "express-validator";

export const validateMedicamentCreation = [
    body("nom")
        .trim()
        .notEmpty().withMessage("Le nom du médicament est requis")
        .isString().withMessage("Le nom doit être une chaîne de caractères"),
    
    body("description")
        .optional()
        .isString().withMessage("La description doit être une chaîne de caractères"),
    
    body("effets_secondaires")
        .optional()
        .isString().withMessage("Les effets secondaires doivent être une chaîne de caractères"),
];

export const validateMedicamentUpdate = [
    param("id")
        .isInt().withMessage("L'ID du médicament doit être un entier"),
    
    body("nom")
        .optional()
        .trim()
        .isString().withMessage("Le nom doit être une chaîne de caractères"),
    
    body("description")
        .optional()
        .isString().withMessage("La description doit être une chaîne de caractères"),
    
    body("effets_secondaires")
        .optional()
        .isString().withMessage("Les effets secondaires doivent être une chaîne de caractères"),
];

export const validateMedicamentId = [
    param("id")
        .isInt().withMessage("L'ID du médicament doit être un entier"),
];

export const validatePagination = [
    query("page")
        .optional()
        .isInt({ min: 0 }).withMessage("Le numéro de page doit être un entier positif"),

    query("limit")
        .optional()
        .isInt({ min: 1 }).withMessage("Le nombre d'éléments par page doit être un entier positif"),
];
