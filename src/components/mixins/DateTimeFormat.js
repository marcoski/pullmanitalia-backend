export default {
    computed: {
        dateFormat: function(){
            return this.$app.configs.moment_date_format;
        },
        dateTimeFormat: function(){
            return this.$app.configs.moment_datetime_format;
        },
        timeFormat: function(){
            return this.$app.configs.moment_time_format;
        }
    },

}