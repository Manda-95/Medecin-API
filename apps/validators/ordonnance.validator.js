import { body, param, query } from "express-validator";

export const validateOrdonnanceCreation = [
    body("nom_patient")
        .trim()
        .notEmpty().withMessage("Le nom du patient est requis")
        .isString().withMessage("Le nom du patient doit être une chaîne de caractères"),
    
    body("medicaments")
        .isArray({ min: 1 }).withMessage("La liste des médicaments doit contenir au moins un élément")
        .custom((value) => value.every(id => Number.isInteger(id))).withMessage("Chaque médicament doit être un entier"),
];

export const validateOrdonnanceUpdate = [
    param("id")
        .isInt().withMessage("L'ID de l'ordonnance doit être un entier"),
    
    body("nom_patient")
        .optional()
        .trim()
        .isString().withMessage("Le nom du patient doit être une chaîne de caractères"),
    
    body("medicaments")
        .optional()
        .isArray().withMessage("Les médicaments doivent être sous forme de liste")
        .custom((value) => value.every(id => Number.isInteger(id))).withMessage("Chaque médicament doit être un entier"),
];

export const validateOrdonnanceId = [
    param("id")
        .isInt().withMessage("L'ID de l'ordonnance doit être un entier"),
];

export const validatePagination = [
    query("page")
        .optional()
        .isInt({ min: 0 }).withMessage("Le numéro de page doit être un entier positif"),

    query("limit")
        .optional()
        .isInt({ min: 1 }).withMessage("Le nombre d'éléments par page doit être un entier positif"),
    
    query("nom_patient")
        .optional()
        .isString().withMessage("Le nom du patient doit être une chaîne de caractères"),
];
