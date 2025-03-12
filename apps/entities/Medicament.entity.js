import { Model, DataTypes } from "@sequelize/core";
import database from "../../librairies/db.js";

class Medicament extends Model {

}

Medicament.init(
    {
        nom: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        effets_secondaires: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize: database,
        freezeTableName: true,
    }
)

export default Medicament;