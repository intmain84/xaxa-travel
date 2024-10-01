import { Icon } from "leaflet"

function MarkerIcon() {
    const icon = new Icon({
        iconUrl: "./",
        iconSize: [40, 40],
        iconAnchor : [22,94],
    popupAnchor : [-3, -76]
    })

    return icon
}

export default MarkerIcon
