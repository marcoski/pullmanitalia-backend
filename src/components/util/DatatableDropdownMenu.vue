<template>
    <div>
        <b-dropdown class="app-dt-menu" variant="link" right no-caret>
            <template slot="button-content">
                <i class="fa fa-caret-down"></i>
            </template>
            <b-dropdown-item>
                <i class="fa fa-upload"></i> Importa
            </b-dropdown-item>
            <b-dropdown-item>
                <i class="fa fa-download"></i> Esporta
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="columnModal">
                <i class="fa fa-columns"></i> Vista colonne
            </b-dropdown-item>
        </b-dropdown>
        <b-modal header-bg-variant="light" ref="columnModalRef" size="lg">
            <div slot="modal-title">
                <h5 class="modal-title"><i class="fa fa-columns"></i> Vista Colonne</h5>
            </div>
            Hello Column Modal
        </b-modal>
    </div>
</template>

<script>

    export default {
        name: 'datatable-dropdown-menu',
        props: {
            scope: {
                type: String,
                required: true,
                default: ''
            }
        },
        methods: {
            columnModal: function(e){
                e.preventDefault();
                this.$refs.columnModalRef.show();
            }
        }
    }
</script>