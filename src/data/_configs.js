export default {
    pagination: {
        items_per_page: 5,
        per_page_options: [5, 10, 50]
    },
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
    }
}