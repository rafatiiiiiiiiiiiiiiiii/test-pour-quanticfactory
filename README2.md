# test-pour-quanticfactory

# Îlots de fraîcheur à Paris

Ce projet est une application web réalisée dans le cadre de ma candidature pour l'offre d'alternance en Licence 3 Informatique pour l'entreprise quanticfactory.  
L’application permet d’explorer les îlots de fraîcheur de Paris grâce aux données ouvertes de la Ville. Ces îlots comprennent les fontaines, les espaces verts et les équipements accessibles au public.

---

## Objectifs du projet

- Offrir un outil simple qui présente les données publiques de la Ville de Paris de façon claire et interactive.
- Faciliter la recherche d’un lieu précis grâce à une barre de recherche et des filtres.
- Apprendre et mettre en pratique des technologies modernes du web comme React, Vite et Tailwind CSS.
- Organiser les données en tableaux structurés pour rendre l’exploration plus intuitive.

---

## Fonctionnalités

### Page d’accueil
- Une barre de recherche générale avec suggestions automatiques (exemple : taper "parc", "fontaine", "Bercy").
- Un bouton "Explorer" qui lance une recherche.
- Un bouton "Explorer les données" qui affiche directement toutes les informations disponibles.

### Page des données
- Trois onglets distincts :
  - **Fontaines**  
    Filtrage par commune, type, disponibilité, modèle.  
  - **Espaces verts**  
    Filtrage par code postal, catégorie, adresse, présence ou non d’une clôture.  
  - **Équipements et activités**  
    Filtrage par type, arrondissement, gratuit ou payant, horaires ou période d’ouverture.  
- Les résultats sont affichés dans des tableaux clairs, avec un style uniforme.

---

## Technologies utilisées

- **React** : bibliothèque JavaScript pour construire l’interface utilisateur.  
- **Vite** : outil de développement rapide pour les projets React.  
- **Tailwind CSS** : framework CSS pour appliquer des styles rapidement.  
- **Framer Motion** : librairie utilisée pour les animations.  
- **Open Data Paris** : les données proviennent de la plateforme officielle [opendata.paris.fr](https://opendata.paris.fr).  

---

## Installation et lancement

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/rafatiiiiiiiiiiiiiiiii/test-pour-quanticfactory/
   cd test-pour-quanticfactory

2. Installer les dépendances : 
  ```bash
npm install
npm run dev 

3.Lancer le site en local : 
'''bash
http://localhost:5173/

