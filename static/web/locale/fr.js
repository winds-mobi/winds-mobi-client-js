(function () {
    fr = {
        'Center': "Centrer",
        'List': "Liste",
        'Favorites': "Favoris",
        'Map': "Carte",
        'Help': "Aide",
        'Login': "Se connecter",
        'Logout': "Se deconnecter",
        'Wind': "Vent",
        'Gust': "Rafale",
        'Temperature': "Température",
        'Humidity': "Humidité",
        'Pressure': "Pression",
        'Rain': "Pluie",
        'Summary': "Résumé",
        'last hour': "dernière heure",
        'Minimum': "Minimum",
        'Mean': "Moyen",
        'Maximum': "Maximum",
        'Summit': "Sommet",
        'Plain': "Plaine",
        'no recent data': "pas de donnée récente",
        'meters': "mètres",
        'Location service is disabled': "Service de localisation désactivé",
        'Unable to find your location': "Votre position n’a pu être déterminée",

        'LIST_EMPTY_FAVORITES_TEXT_1': "Vos favoris sont vides.",
        'LIST_EMPTY_FAVORITES_TEXT_2': "Ajouter des stations en cliquant sur leur icône",
        'HELP_STATION_SUMMARY_TITLE': "Affichage résumé d'une balise",
        'HELP_STATION_NAME': "Nom de la balise",
        'HELP_ALTITUDE': "Altitude",
        'HELP_LAST_UPDATE': "Date et validité des mesures",
        'HELP_PROVIDER': "Nom du fournisseur des données",
        'HELP_STATION_SUMMARY_TEXT_1_RED_DATE': "Date en rouge : ",
        'HELP_STATION_SUMMARY_TEXT_1_RED': "les mesures ont plus de 2 heures ou la balise n'est pas opérationnelle",
        'HELP_STATION_SUMMARY_TEXT_1_ORANGE_DATE': "Date en orange : ",
        'HELP_STATION_SUMMARY_TEXT_1_ORANGE': "les mesures datent d'il y a 1 ou 2 heures ou la balise n'est pas fiable",
        'HELP_STATION_SUMMARY_TEXT_2': "Dernière mesure du vent moyen et de la rafale",
        'HELP_STATION_SUMMARY_TEXT_3': "Tendance: historique du vent moyen durant la dernière heure",
        'HELP_STATION_SUMMARY_TEXT_4': "Historique de la direction du vent: du centre du cercle (il y a 1 heure) " +
        "vers l'extéreur (dernière mesure)",
        'HELP_STATION_DETAIL_TITLE': "Affichage détaillé d'une balise",
        'HELP_STATION_DETAIL_TEXT_1': "Centrer la carte sur cette balise",
        'HELP_STATION_DETAIL_TEXT_2': "Afficher les balises environnantes en mode liste",
        'HELP_IFRAME_TITLE': "Ajouter winds.mobi à votre site",
        'HELP_IFRAME_TEXT': "winds.mobi peut-être intégré dans un site existant à l'aide d'une iframe. " +
        "Vous pouvez fixer le point de recherche ou la position de la carte avec les paramètres 'lat', 'lon' et 'zoom'.",
        'HELP_MAP_COLORS_TITLE': "Couleurs des balises en mode carte",
        'HELP_MAP_COLORS_TEXT': "Rafale [km/h]",
        'HELP_FAVORITES': "Stations favorites",
        'HELP_FAVORITES_TEXT_1': "Pour profiter de toutes les fonctionnalités de winds.mobi, se connecter à l'aide de votre compte [[facebookLink]] ou [[googleLink]]",
        'HELP_FAVORITES_TEXT_2': "Cliquer pour ajouter ou enlever un station de vos favoris, elle apparaîtra alors en tête de la vue liste",
        'HELP_PROVIDERS_TITLE': "Liste des fournisseurs de données",
        'HELP_COMPATIBILITY_TITLE': "Compatibilité",
        'HELP_COMPATIBILITY_TEXT': "winds.mobi fonctionne sur les dernières versions des principaux navigateurs web " +
        "(mobile ou bureau).",
        'HELP_PRIVACY_TITLE': "Politique de confidentialité",
        'HELP_PRIVACY_TEXT': "Winds.mobi stocke votre nom et votre adresse email lors de la connexion avec un compte Facebook ou Google. " +
        "Nous ne transmettrons jamais ces informations à d'autres et nous faisons tout notre possible pour garantir votre confidentialité.",
        'HELP_ABOUT_TITLE': "À propos",
        'HELP_ABOUT_TEXT': "Des questions, problèmes ou idées d'amélioration ? Contactez-moi !",
        'HELP_ABOUT_CREDITS_TEXT': "Remerciements:",
        'SOCIAL_LOGIN_TITLE': "Se connecter avec votre compte Facebook ou Google",
        'LOGIN_TITLE': "Se connecter avec un compte winds.mobi",
        'LOGIN_BENEFIT_TEXT': "Vous pourrez:",
        'LOGIN_BENEFIT_1': "sauvegarder vos stations préférées",

        'N': "N",
        'NE': "NE",
        'E': "E",
        'SE': "SE",
        'S': "S",
        'SW': "SO",
        'W': "O",
        'NW': "NO"
    };

    // Node: Export function
    if (typeof module !== "undefined" && module.exports) {
        module.exports = fr;
    }
    // AMD/requirejs: Define the module
    else if (typeof define === 'function' && define.amd) {
        define(function () {return fr;});
    }
    // Browser: Expose to window
    else {
        window.fr = fr;
    }
})();