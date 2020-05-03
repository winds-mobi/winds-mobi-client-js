(function () {
    en = {
        'Center': "Center",
        'List': "List",
        'Favorites': "Favorites",
        'Map': "Map",
        'Help': "Help",
        'Login': "Login",
        'Logout': "Logout",
        'Wind': "Wind",
        'Gust': "Gust",
        'Temperature': "Temperature",
        'Humidity': "Humidity",
        'Pressure': "Pressure",
        'Rain': "Rain",
        'Summary': "Summary",
        'last hour': "last hour",
        'Minimum': "Minimum",
        'Mean': "Mean",
        'Maximum': "Maximum",
        'Summit': "Summit",
        'Plain': "Plain",
        'no recent data': "no recent data",
        'meters': "meters",
        'Location service is disabled': "Location service is disabled",
        'Unable to find your location': "Unable to find your location",

        'LIST_EMPTY_FAVORITES_TEXT_1': "Your favorites are empty.",
        'LIST_EMPTY_FAVORITES_TEXT_2': "Add stations by clicking on their icon",
        'HELP_STATION_SUMMARY_TITLE': "Station summary view",
        'HELP_STATION_NAME': "Station name",
        'HELP_ALTITUDE': "Altitude",
        'HELP_LAST_UPDATE': "Date and measure validity",
        'HELP_PROVIDER': "Data provider name",
        'HELP_STATION_SUMMARY_TEXT_1_RED_DATE': "Red date: ",
        'HELP_STATION_SUMMARY_TEXT_1_RED': "measures are older than 2 hours or the station is not operational",
        'HELP_STATION_SUMMARY_TEXT_1_ORANGE_DATE': "Orange date: ",
        'HELP_STATION_SUMMARY_TEXT_1_ORANGE': "measures are between 1 and 2 hours old or the station is not accurate",
        'HELP_STATION_SUMMARY_TEXT_2': "Last mean wind and gust wind measure",
        'HELP_STATION_SUMMARY_TEXT_3': "Trend: last hour mean wind historic",
        'HELP_STATION_SUMMARY_TEXT_4': "Wind direction historic: from circle center (1 hour ago) " +
        "to outside (last measure)",
        'HELP_STATION_DETAIL_TITLE': "Station detail view",
        'HELP_STATION_DETAIL_TEXT_1': "Center the map on this station",
        'HELP_STATION_DETAIL_TEXT_2': "Display surrounding stations on list view",
        'HELP_IFRAME_TITLE': "Add winds.mobi to your website",
        'HELP_IFRAME_TEXT': "winds.mobi could be embedded inside your website with an iframe. You can specify " +
        "the search point or the map position with 'lat', 'lon' and 'zoom' parameters.",
        'HELP_MAP_COLORS_TITLE': "Station colors in map view",
        'HELP_MAP_COLORS_TEXT': "Wind gust [km/h]",
        'HELP_FAVORITES': "Favorite stations",
        'HELP_FAVORITES_TEXT_1': "To take advantage of all the features of winds.mobi, log in using your [[facebookLink]] or [[googleLink]] account",
        'HELP_FAVORITES_TEXT_2': "Click to add or remove a station from your favorites, it will then appear at the top of the list view",
        'HELP_PROVIDERS_TITLE': "Data providers list",
        'HELP_COMPATIBILITY_TITLE': "Compatibility",
        'HELP_COMPATIBILITY_TEXT': "winds.mobi runs on the latest versions of the major browsers (mobile or desktop).",
        'HELP_PRIVACY_TITLE': "Privacy policy",
        'HELP_PRIVACY_TEXT': "Winds.mobi stores your name and your email address when you login with a facebook or a google account. " +
        "We will never transmit your personal information to others and will do our best to ensure your privacy.",
        'HELP_ABOUT_TITLE': "About",
        'HELP_ABOUT_TEXT': "Questions, issues or improvement ideas ? Please contact me !",
        'HELP_ABOUT_CREDITS_TEXT': "Credits:",
        'HELP_ABOUT_CREDITS_SHV_FSVL': "Swiss Hang gliding association",
        'SOCIAL_LOGIN_TITLE': "Login with your Facebook or Google account",
        'LOGIN_TITLE': "Login with a winds.mobi account",
        'LOGIN_BENEFIT_TEXT': "You will be able to:",
        'LOGIN_BENEFIT_1': "save your favorite stations",

        'N': "N",
        'NE': "NE",
        'E': "E",
        'SE': "SE",
        'S': "S",
        'SW': "SW",
        'W': "W",
        'NW': "NW"
    };

    // Node: Export function
    if (typeof module !== "undefined" && module.exports) {
        module.exports = en;
    }
    // AMD/requirejs: Define the module
    else if (typeof define === 'function' && define.amd) {
        define(function () {return en;});
    }
    // Browser: Expose to window
    else {
        window.en = en;
    }
})();