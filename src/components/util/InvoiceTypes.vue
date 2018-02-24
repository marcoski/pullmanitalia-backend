<template>
    <b-form-select v-model="selected" :options="options" class="mb-2"></b-form-select>
</template>
<script>
    export default{
        name: 'invoice-types',

        data: function(){
            return {
                selected: 'all',
                options: [
                    { value: 'all', text: 'Tutte' },
                    { value: 'sent', text: 'Inviate' },
                    { value: 'paid', text: 'Pagate' },
                    { value: 'overdue', text: 'Scadute' }
                ]
            }
        }
    }
</script>