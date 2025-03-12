import medicamentRouter from "./medicament.router.js";
import ordonnanceRouter from "./ordonnance.router.js";

export default function(app) {
    medicamentRouter(app);
    ordonnanceRouter(app);
}