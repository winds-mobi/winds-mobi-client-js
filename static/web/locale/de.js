(function () {
    de = {
        'Center': "Standort",
        'List': "Liste",
        'Favorites': "Favoriten",
        'Map': "Karte",
        'Help': "Hilfe",
        'Login': "Anmelden",
        'Logout': "Abmelden",
        'Wind': "Wind",
        'Gust': "Böen",
        'Temperature': "Temperatur",
        'Humidity': "Feuchtigkeit",
        'Pressure': "Druck",
        'Rain': "Regen",
        'Summary': "Übersicht",
        'last hour': "letzte Stunde",
        'Minimum': "Minimum",
        'Mean': "Mittel",
        'Maximum': "Maximum",
        'Summit': "Berg",
        'Plain': "Tal",
        'no recent data': "keine aktuellen Daten",
        'meters': "Meter",
        'Location service is disabled': "Lokalisierung ist ausgeschaltet",
        'Unable to find your location': "Deine Position nicht gefunden",

        'HELP_STATION_SUMMARY_TITLE': "Stationsübersicht",
        'HELP_STATION_NAME': "Stationsname",
        'HELP_ALTITUDE': "Höhe",
        'HELP_LAST_UPDATE': "Zeitpunkt der Messung",
        'HELP_PROVIDER': "Datenanbieter",
        'HELP_STATION_SUMMARY_TEXT_1_RED_DATE': "Rote Angabe: ",
        'HELP_STATION_SUMMARY_TEXT_1_RED': "Messung vor mehr als 2 Stunden, oder die Station ist nicht in Betrieb",
        'HELP_STATION_SUMMARY_TEXT_1_ORANGE_DATE': "Orange Angabe: ",
        'HELP_STATION_SUMMARY_TEXT_1_ORANGE': "Messung vor 1 bis 2 Stunden, oder die Station ist nicht zuverlässig",
        'HELP_STATION_SUMMARY_TEXT_2': "Letzte Messung von Mittelwind und Böen",
        'HELP_STATION_SUMMARY_TEXT_3': "Trend: Diagramm vom Mittelwind der letzten Stunde",
        'HELP_STATION_SUMMARY_TEXT_4': "Diagramm der Windrichtung vom Kreiszentrum (vor 1 Stunde) " +
        "zum Rand (letzte Messung)",
        'HELP_STATION_DETAIL_TITLE': "Stationsangaben",
        'HELP_STATION_DETAIL_TEXT_1': "Karte bei Station zentrieren",
        'HELP_STATION_DETAIL_TEXT_2': "Stationen in der Umgebung in Listenansicht anzeigen",
        'HELP_IFRAME_TITLE': "winds.mobi zu deiner Webseite hinzufügen",
        'HELP_IFRAME_TEXT': "winds.mobi kann mit iframe in deine Webseite integriert werden. Du kannst die " +
        "Kartenpositionierung mit Längen- und Breitengrad sowie Zoomfaktor bestimmen.",
        'HELP_MAP_COLORS_TITLE': "Farbe der Station in Kartenansicht",
        'HELP_MAP_COLORS_TEXT': "Windböen [km/h]",
        'HELP_FAVORITES': "Lieblingsstation",
        'HELP_FAVORITES_TEXT_1': "Um alle Funktionen von winds.mobi zu nutzen, melden Sie sich mit Ihrem [[facebookLink]] oder [[googleLink]] Konto an",
        'HELP_FAVORITES_TEXT_2': "Klicken Sie hier, um einen Sender aus Ihren Favoriten hinzuzufügen oder zu entfernen. Er wird dann am oberen Rand der Listenansicht angezeigt",
        'HELP_PROVIDERS_TITLE': "Liste der Datenanbieter",
        'HELP_COMPATIBILITY_TITLE': "Kompatibilität",
        'HELP_COMPATIBILITY_TEXT': "winds.mobi ist kompatibel mit den aktuellen Versionen der häufigsten Browser (Mobil und Desktop).",
        'HELP_PRIVACY_TITLE': "Privacy policy",
        'HELP_PRIVACY_TEXT': "Winds.mobi stores your name and your email address when you login with your facebook or google account. " +
        "We will never transmit your personal information to others and will do our best to ensure your privacy.",
        'HELP_ABOUT_TITLE': "Über winds.mobi",
        'HELP_ABOUT_TEXT': "Fragen, Anregungen oder Ideen? Bitte kontaktiere mich!",
        'HELP_ABOUT_CREDITS_TEXT': "Credits:",
        'SOCIAL_LOGIN_TITLE': "Mit Facebook or Google Konto einloggen",
        'LOGIN_TITLE': "Mit winds.mobi Konto einloggen",
        'LOGIN_BENEFIT_TEXT': "Ermöglicht dir:",
        'LOGIN_BENEFIT_1': "die Speicherung deiner favorisierten Stationen",

        'N': "N",
        'NE': "NO",
        'E': "O",
        'SE': "SO",
        'S': "S",
        'SW': "SW",
        'W': "W",
        'NW': "NW"
    };

    // Node: Export function
    if (typeof module !== "undefined" && module.exports) {
        module.exports = de;
    }
    // AMD/requirejs: Define the module
    else if (typeof define === 'function' && define.amd) {
        define(function () {return de;});
    }
    // Browser: Expose to window
    else {
        window.de = de;
    }
})();