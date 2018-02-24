<template>
    <b-card header-tag="header">
        <div class="d-flex flex-row" slot="header">
            <div class="p-1">
                <h4><i class="fa fa-file-text"></i> Nuova Fattura</h4>
            </div>
            <div class="ml-auto p-1">

            </div>
        </div>
        <b-container fluid class="app-bills-body">
        </b-container>
    </b-card>
</template>
<script>

    export default {
        name: 'bills-form',

    }
</script>