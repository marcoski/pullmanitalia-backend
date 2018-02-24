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
            <template slot="feedback" slot-scope="data">
                <i :class="getFeedbackIcon(data)"></i> ({{data.item.feedBacks.count}})
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
                title="Cancella fornitori"
                body="Sei sicuro di voler cancellare i fornitori selezionati? Clicca OK per proseguire..."></warning-modal-delete>
    </b-card>
</template>
<script>

    import Suppliers from "../../data/_suppliers";
    import DataTable from "../mixins/DataTable";

    export default {
        name: 'suppliers-data-table',

        mixins: [DataTable],

        data: function(){
            return {
                itemsCount: Suppliers.count,
            }
        },

        methods: {
            loadItems: function(ctx){
                /** @todo   USE Axios promises to load items from api server
                 /*          provider pagination is handled by server, for mock object is disabled
                 */
                    //filter and sorting aren't handled by provider function
                    //Now use mock object
                let items = this.$refs.datatable.localItems;
                if(items.length <= 0){
                    /**
                     * load with AXIOS only if new...
                     * The items.length check should not be correct in the real case
                     * to handle the data table state we need a more sophisticated way (IE use a state props?)
                     * what happens when the last items is deleted?
                     */
                    return Suppliers.items;
                }

                return this.$refs.datatable.localItems;
            },

            doDelete: function(toDeleteElements){
                /** @todo          USE remote call to delete and refresh table from api server */
                this.$lodash.remove(this.$refs.datatable.localItems, item => toDeleteElements.includes(item.id));
                this.$refs.datatable.refresh();
            },

            getFeedbackIcon: function(data){
                let feedBacks = data.item.feedBacks;
                let feedBackIcon;
                switch (feedBacks.strategy){
                    case "warning":
                        feedBackIcon = 'fa fa-exclamation-circle text-warning';
                        break;
                    case "error":
                        feedBackIcon = 'fa fa-times-circle text-danger';
                        break;
                    case "success":
                        feedBackIcon = 'fa fa-check-circle text-success';
                        break;
                }

                return feedBackIcon;
            }
        },

        computed: {
            fields: {
                get: function(){
                    return this.$lodash.assign(
                        this.defaultFields,
                        this.$app.configs.supplier_fields
                    );
                }
            }
        }
    }
</script>