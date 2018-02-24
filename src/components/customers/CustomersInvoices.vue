<template>
    <b-card header-tag="header">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-file-text"></i> Fatture di {{ nameParam }} (120)</h4>
            </div>
            <div class="ml-auto p-1">

            </div>
        </div>
        <b-container fluid class="app-bills-body">

        </b-container>
    </b-card>
</template>
<script>
    import BreadcrumbModifier from "../mixins/BreadcrumbModifier";
    export default {
        name: "customers-invoice",

        mixins: [BreadcrumbModifier]
    }
</script>

