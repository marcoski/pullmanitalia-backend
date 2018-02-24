<template>
    <b-input-group>
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <b-input-group-addon>
            <i class="fa fa-calendar-o"></i>
        </b-input-group-addon>
    </b-input-group>
</template>
<script>
    export default{
        name: 'invoice-date-range',

        data: function(){
            return {
                selected: 'all',
                options: [
                    { value: 'all', text: 'Tutte' },
                    { value: 'last_month', text: 'Ultimo mese' },
                    { value: 'last_three_month', text: 'Ultimi 3 mesi'},
                    { value: 'last_six_month', text: 'Ultimi 6 mesi' },
                    { value: 'last_year', text: 'Ultimo anno'}
                ]
            }
        }
    }
</script>