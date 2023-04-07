# README - Lancement de l'application Kasa

## Instructions pour lancer l'application Kasa :

-   **Étape 1 : Mettre à jour Node.js avec npm**

    1. Ouvrez le terminal sur votre système.
    2. Tapez la commande suivante pour mettre à jour npm : `npm install -g npm`.
    3. Tapez la commande suivante pour mettre à jour Node.js : `npm install -g n`.
    4. Tapez la commande suivante pour mettre à jour Node.js à la dernière version stable : `n stable`.


-   **Étape 2 : Accédez au dossier principale de l'application**

    1.  Ouvrez un terminal.
    2.  Naviguez jusqu'au dossier "kasa" en utilisant la commande
        "cd".
        `cd kasa`

-   **Étape 3 : Lancement de l'application React**

    1.  Dans ce même terminal, Naviguez jusqu'au dossier "front_kasa"
        en utilisant la commande "cd".
        `cd front_kasa`
    2.  Entrez ensuite la commande `npm i` afin d'installer toutes les dépendances
        nécessaire au lancement et au fonctionnement de l'application.
    3.  Entrez la commande "npm start" pour lancer l'application
        React.
        `npm start`
    4.  L'application React sera ouverte dans votre navigateur par
        défaut à l'adresse
        [http://localhost:3000/](http://localhost:3000/){target="_blank"}.

-   **Étape 4 : Lancement du serveur Node.js et connexion à la base de**
    **données MongoDB**

    1.  Ouvrez un second terminal en splitant le premier.
    2.  Naviguez de cran en arrière jusqu'au dossier principale
        "kasa" en utilisant la commande "cd ..".
        `cd ..`
    3.  Naviguez ensuite jusqu'au dossier "back_kasa" en utilisant la
        commande "cd".
        `cd back_kasa`
    4.  Entrez ensuite la commande `npm i` afin d'installer toutes les dépendances
        nécessaire au lancement et au fonctionnement de l'application.
    5.  Entrez la commande "npm start" pour lancer le serveur
        Node.js.
        `npm start`
    6.  Le serveur Node.js sera maintenant en cours d'exécution dans
        votre navigateur par défaut à l'adresse
        [http://localhost:4000/](http://localhost:4000/){target="_blank"}
        et connecté à la base de données MongoDB.

        **ATTENTION !!! TOUT FICHIER SUPPRIMé DANS L'APPLICATION, LE SERA**
        **EFFECTIVEMENT DANS AU SEIN DE LA BASE DE DONNéES MONGO DB !!!**

### Vous pouvez maintenant utiliser l'application Kasa dans votre
### navigateur pour effectuer des opérations sur la base de données.
