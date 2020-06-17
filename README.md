# DW-TG-P7

## Créez un réseau social d’entreprise
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

## Pré-requis

`NodeJs`
`Gestionnaire de base de données` 

Exemples:
`WampServer` https://www.wampserver.com/#wampserver-64-bits-php-5-6-25-php-7
ou 
`Mamp` https://downloads.mamp.info/MAMP-PRO/releases/5.7/MAMP_MAMP_PRO_5.7.pkg


### Mise en place de la bdd

Créee une base de données vierge avec les droits de création a l'utilisateur qui sera enregistrer dans le fichier de configuration `db.config.js`

Modifier le fichier ``` db.config.js ``` dans le dossier ``` Back-end/config ```

     HOST: "adresse de la base de donnée"
     USER: "User de la base de donnée"
     PASSWORD: "Mot de passe de connection de la base de donnée"
     DB: "Nom de la base de donnée"

Pour ajouter un administrateur mettre `1` dans `isAdmin` sur la ligne de l'utilisateur concerné

### Pour la premiere installation** :

* *Pour installer les packages nodeJS :*

     * ```npm install```


* *Pour lancer le projet :*

    * ```npm run mvp```

Puis attendre le lancement automatique de votre navigateur sur l'adresse *`localhost:4200`*