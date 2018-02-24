import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import Application from './Application'
import router from './router'
import lodash from 'lodash';
import VueGoogleMapsPlugin from './plugin/vue-google-maps';
import Configs from './data/_configs';

Object.defineProperty(Vue.prototype, '$lodash', {value: lodash});
Object.defineProperty(Vue.prototype, '$app', {
    value: {
        configs: Configs
    }
});

Object.defineProperty(Vue.prototype, '$radio', {value: new Vue()} );


Vue.use(BootstrapVue);
Vue.use(VueGoogleMapsPlugin, {
    load: {
        apiKey: 'AIzaSyCeIV2gmisWRMFTyHqVM8h00FrtoMKBSr0', /** Pullman italia API KEY for GoogleMaps */
        libraries: ['places']
    }
});

new Vue({
    el: '#pullmanitalia-app',
    router,
    template: '<Application />',
    components: { Application }
});