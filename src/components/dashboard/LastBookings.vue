<template>
    <b-row>
        <b-col sm="12">
            <b-card header-tag="header">
                <div class="d-flex flex-row" slot="header">
                    <div class="p-1">
                        <h4><i class="fa fa-ticket"></i> Ultime prenotazioni</h4>
                    </div>
                    <div class="ml-auto p-1">
                        <i class="fa fa-caret-left font-xl mr-2 mt-1"></i>
                        <i class="fa fa-caret-right font-xl mt-1"></i>
                    </div>
                </div>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: 'last-booking'
    }
</script>