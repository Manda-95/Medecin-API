import Medicament from "../apps/entities/Medicament.entity.js";
import Ordonnance from "../apps/entities/Ordonnance.entity.js";
import database from "./db.js";

const seedData = async () => {
    await database.sync({ force: true });

    const medicamentsData = [
        { nom: "Paracétamol", description: "Analgésique et antipyrétique", effets_secondaires: "Nausées, somnolence" },
        { nom: "Ibuprofène", description: "Anti-inflammatoire non stéroïdien", effets_secondaires: "Maux d'estomac, vertiges" },
        { nom: "Amoxicilline", description: "Antibiotique à large spectre", effets_secondaires: "Allergies, troubles digestifs" },
        { nom: "Doléprane", description: "Antidouleur courant", effets_secondaires: "Fatigue, maux de tête" },
        { nom: "Aspirine", description: "Anticoagulant et anti-inflammatoire", effets_secondaires: "Saignements, ulcères" },
        { nom: "Cétirizine", description: "Antihistaminique", effets_secondaires: "Somnolence, sécheresse buccale" },
        { nom: "Oméprazole", description: "Traitement des reflux gastriques", effets_secondaires: "Maux de tête, diarrhée" },
        { nom: "Metformine", description: "Traitement du diabète de type 2", effets_secondaires: "Ballonnements, troubles digestifs" },
        { nom: "Salbutamol", description: "Bronchodilatateur contre l'asthme", effets_secondaires: "Tremblements, palpitations" },
        { nom: "Atorvastatine", description: "Médicament pour réduire le cholestérol", effets_secondaires: "Douleurs musculaires, fatigue" }
    ];

    const medicaments = await Medicament.bulkCreate(medicamentsData);
    console.log("Médicaments insérés avec succès !");

    const ordonnancesData = [
        { nom_patient: "Jean Dupont", medicaments: [1, 3, 5] },  // Paracétamol, Amoxicilline, Aspirine
        { nom_patient: "Alice Martin", medicaments: [2, 4, 6] }, // Ibuprofène, Doléprane, Cétirizine
        { nom_patient: "Paul Bernard", medicaments: [7, 8, 9] }, // Oméprazole, Metformine, Salbutamol
        { nom_patient: "Sophie Durant", medicaments: [10, 1, 4] }, // Atorvastatine, Paracétamol, Doléprane
        { nom_patient: "Marc Lemoine", medicaments: [3, 6, 8] } // Amoxicilline, Cétirizine, Metformine
    ];

    for (const ordonnanceData of ordonnancesData) {
        const ordonnance = await Ordonnance.create({ nom_patient: ordonnanceData.nom_patient });
        
        const meds = await Medicament.findAll({ where: { id: ordonnanceData.medicaments } });
        await ordonnance.addMedicaments(meds);
    }

    console.log("Ordonnances insérées avec succès !");
}

export default seedData;
