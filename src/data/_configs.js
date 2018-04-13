export default {
    locale: 'it',
    currency: '€',
    pagination: {
        items_per_page: 5,
        per_page_options: [5, 10, 50]
    },
    moment_date_format: 'DD/MM/YYYY',
    moment_time_format: 'HH:mm',
    moment_datetime_format: 'DD/MM/YYYY HH:mm',
    default_avatar: 'avatar/blank.svg',
    customer_fields: {
        name: {
            label: 'Nome',
            sortable: true
        },
        trusted: {
            label: 'Trusted',
            class: 'text-center',
            tdClass: 'text-warning'
        },
        feedback: {
            label: 'Feedback'
        },
        city: {
            label: 'Città'
        },
        email: {
            label: 'Email'
        }
    },
    supplier_fields: {
        name: {
            label: 'Nome',
            sortable: true
        },
        pullmans: {
            label: 'Pullman',
            class: 'text-center',
        },
        feedback: {
            label: 'Feedback'
        },
        city: {
            label: 'Città'
        },
        email: {
            label: 'Email'
        }
    },
    pullman_fields: {
        name: {
            label: 'Nome',
            sortable: true
        },
        seats: {
            label: 'Posti',
            class: 'text-center',
            sortable: true
        },
        drivers: {
            label: 'Autisti',
            class: 'text-center',
        },
        services: {
            label: 'Servizi'
        },
        loc: {
            label: 'Geolocalizazione'
        }
    },
    pullman_services: [
        {
            label: "Impianto sterero",
            icon: "icon icon-music-player"
        },
        {
            label: "Macchina del caffè",
            icon: "icon icon-coffe-machine"
        },
        {
            label: "Aria condizionata",
            icon: "icon icon-air-conditioner",
        },
        {
            label: "Schermo TV",
            icon: "icon icon-monitor"
        },
        {
            label: "Lettore DVD",
            icon: "icon icon-dvd",
        },
        {
            label: "Prese elettriche",
            icon: "icon icon-plug"
        },
        {
            label: "Mini frigo",
            icon: "icon icon-fridge"
        },
        {
            label: "Cucina a bordo",
            icon: "icon icon-oven"
        },
        {
            label: "Sedili in pelle",
            icon: "icon icon-leather"
        },
        {
            label: "Luce da lettura",
            icon: "icon icon-idea"
        },
        {
            label: "Vano valige",
            icon: "icon icon-luggage"
        },
        {
            label: "Microfono",
            icon: "icon icon-karaoke"
        },
        {
            label: "Vetri panoramici",
            icon: "icon icon-window"
        },
        {
            label: "Radio",
            icon: "icon icon-radio"
        },
        {
            label: "Vetri oscurati",
            icon: "icon icon-windows-tinted"
        },
        {
            label: "Toilette",
            icon: "icon icon-toilet"
        },
        {
            label: "Antenna TV",
            icon: "icon icon-television"
        },
        {
            label: "Carica USB",
            icon: "icon icon-usb"
        },
        {
            label: "Pedana carrozzine",
            icon: "icon icon-wheelchair"
        },
        {
            label: "WiFi",
            icon: "icon icon-connection"
        }
    ],
    costs: {
        driverDaily: 18.00,
        extraDriver: 200.00
    }
}