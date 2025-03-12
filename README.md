# Projet API Médicaments & Ordonnances

## Lancement du projet avec Docker

Ce projet est containerisé avec **Docker** et utilise **Docker Compose** pour orchestrer les services.

### **Prérequis**
Avant de commencer, assure-toi d'avoir installé :
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### **Démarrage du projet**
1. **Cloner le projet** :
   ```sh
   git clone https://github.com/Manda-95/Medecin-API.git
   cd Medecin-API
   ```
2. **Lancer le projet avec Docker Compose** :
   ```sh
   docker compose up -d
   ```
   🔹 L’option `-d` permet d'exécuter les conteneurs en arrière-plan.


### **Accès à la documentation Swagger**
Une fois le projet démarré, tu peux consulter la documentation de l'API avec Swagger :
[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

### **Tests avec Postman**

Les tests Postman sont disponibles dans le fichier :
**MedecineAPI.postman_collection.json**

### **Vérification du code avec ESLint**

Pour exécuter le linter et vérifier la qualité du code, utilise la commande suivante :
```sh
npm run lint
```

