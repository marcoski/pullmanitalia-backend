<template>
    <b-card class="app-card-table">
        <b-table
                class="app-datatable"
                ref="datatable"
                :no-provider-paging="true"
                :no-provder-sorting="true"
                :no-provider-filtering="true"
                striped
                bordered
                hover
                :items="loadItems"
                :fields="fields"
                :filter="filter"
                :current-page="currentPage"
                :per-page="perPage"

                @row-clicked="showItemDetails"
        >
            <template slot="HEAD_#" slot-scope="data">
                <b-form-checkbox @click.native.stop v-model="selectAll"></b-form-checkbox>
            </template>
            <template slot="#" slot-scope="data">
                <b-form-checkbox @click.native.stop v-model="selected" :value="data.item.id " ></b-form-checkbox>
            </template>
            <template slot="trusted" slot-scope="data">
                <i class="fa fa-star" v-if="data.value"></i>
            </template>
            <template slot="feedback" slot-scope="data">
                ({{ data.value }})
            </template>
            <template slot="email" slot-scope="data">
                <b-button size="sm"><i class="fa fa-envelope"></i> {{ data.value }}</b-button>
            </template>
            <template slot="city" slot-scope="data">
                {{ getCity(data) }}
            </template>
        </b-table>
        <div class="d-flex flex-row" slot="footer">
            <b-button :disabled="selected.length == 0" class="mr-2" @click.native.stop @click="deleteSelected"><i class="fa fa-trash"></i> Cancella selezionati</b-button>
            <b-button><i class="fa fa-download"></i> Esporta selezionati</b-button>
            <b-pagination class="ml-auto" :total-rows="itemsCount" :per-page="perPage" v-model="currentPage"></b-pagination>
        </div>
        <warning-modal-delete
                @ok="doDelete"
                ref="warningModal"
                title="Cancella clienti"
                body="Sei sicuro di voler cancellare i clienti selezionati? Clicca OK per proseguire..."></warning-modal-delete>
    </b-card>
</template>

<script>
    import DataTable from "../mixins/DataTable";

    export default {
        name: 'customers-data-table',

        mixins: [DataTable],

        data: function(){
            return {
                itemsCount: 0,
            }
        },

        methods: {
            /**
             * @augments ctx {Object} 
             * Contains properties:
             * 1. currentPage {Number} The current page number (starting from 1: the value of the current-page prop)
             * 2. perPage {Number} The maximum number of rows per page to display (the value of the per-page prop)
             * 3. filter {String} || {RegExp} || {Function} the value of the filter prop
             * 4. sortBy {String} The current column key being sorted, or null if no sorting
             * 5. sortDesc {Boolean} The current sort direction (true for descending, false for ascending)
             */
            loadItems: function(ctx){
                let cachedItems = this.$store.getters.allCustomers;
                if(cachedItems.length > 0 ){
                    return cachedItems;
                }
                /** 
                 * MUST HANDLE pagination, filters and sorting on the server side:
                 * to do that no-provider-paging, no-provider-sorting, no-provider-filtering props must be disabled or setted to false
                 */
                return this.$store.dispatch('loadCustomers', {msg: 'Carico clienti...'}).then(() => {
                    let items = this.$store.getters.allCustomers;
                    this.itemsCount = this.$store.getters.countCustomers;
                    return (items || []);
                });
            },

            doDelete: function(toDeleteElements){
                /** @todo          USE remote call to delete and refresh table from api server */
                this.$lodash.remove(this.$refs.datatable.localItems, item => toDeleteElements.includes(item.id));
                this.$refs.datatable.refresh();
            },
        },

        computed: {
            fields: {
                get: function(){
                    return this.$lodash.assign(
                        this.defaultFields,
                        this.$app.configs.customer_fields
                    );
                }
            }
        }
    }
</script>