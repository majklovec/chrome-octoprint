// SAMPLE
this.manifest = {
    "name": "OctoPrint",
    "icon": "icon.png",
    "settings": [
        {
            "tab": i18n.get("connection"),
            "group": i18n.get("connection"),
            "name": "ip",
            "type": "text",
            "label": i18n.get("IP"),
            //"text": i18n.get("x-characters")
        },
        {
            "tab": i18n.get("connection"),
            "group": i18n.get("connection"),
            "name": "apikey",
            "type": "text",
            "label": i18n.get("API key"),
            //"text": i18n.get("x-characters")
        }
    ]
};
