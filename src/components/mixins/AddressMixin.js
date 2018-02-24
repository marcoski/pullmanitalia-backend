var tmpUserAddressData;

export default{

    data: function(){
        return {
            disabledCopyBtn: true
        }
    },

    mounted: function(){
        var self = this;
        this.$refs.googleMapsAutocomplete.$on('gmaps:autocomplete:place-changed', (data, place, id) => {
            if(id === 'searchClientAddress'){
                this.fillUserAddressFields(data);
            }

            this.$refs.googleMapsAutocomplete.clear();
        });
        this.$radio.$on('address:fill', function(data){
            self.disabledCopyBtn = false;
            tmpUserAddressData = data;
        });
    },

    computed: {
        isEmptyAddress: function(){
            return this.item.address === null || this.item.address === '';
        },

        isEmptyCap: function(){
            return this.item.cap === null || this.item.cap === '';
        },

        isEmptyDistrict: function(){
            return this.item.district === null || this.item.district === '';
        },

        isEmptyCountry: function(){
            return this.item.country === null || this.item.country === '';
        },

        isEmptyCity: function(){
            return this.item.city === null || this.item.city === '';
        }
    },

    methods: {
        fillUserAddressFields: function(data){
            this.item.address = data.route;
            if(data.hasOwnProperty('street_number')){
                this.item.address += `, ${data.street_number}`;
            }
            if(data.hasOwnProperty('postal_code')) {
                this.item.cap = data.postal_code;
            }
            if(data.hasOwnProperty('administrative_area_level_2')){
                this.item.district = data.administrative_area_level_2;
            }
            if(data.hasOwnProperty('country')){
                this.item.country = data.country;
            }
            if(data.hasOwnProperty('locality')){
                this.item.city = data.locality;
            }
        },

        copyAddressData: function(){
            if(tmpUserAddressData !== "undefined"){
                this.fillUserAddressFields(tmpUserAddressData);
            }
        }
    }
}