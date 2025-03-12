import { Model, DataTypes } from "@sequelize/core";
import database from "../../librairies/db.js";
import Medicament from "./Medicament.entity.js";

class Ordonnance extends Model {

}

Ordonnance.init(
    {
        nom_patient: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize: database,
        freezeTableName: true,
    }
)

Medicament.belongsToMany(Ordonnance, { through: "OrdonnanceMedicament" });
Ordonnance.belongsToMany(Medicament, { through: "OrdonnanceMedicament" });


export default Ordonnance;