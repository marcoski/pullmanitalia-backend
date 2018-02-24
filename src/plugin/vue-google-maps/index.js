import {initErrorHandling} from "./util/error";
import GMapsLoader from "./loader";
import Autocomplete from "./components/Autocomplete";

function optionMergeStrategies(Vue){
    const strats = Vue.config.optionMergeStrategies;
    strats.googleMapsReady = strats.created;
    strats.googleMapsPrepare = strats.created;
}

export {
    Autocomplete
}

function registerComponents(Vue, prefix){
    Vue.component(`${prefix}autocomplete`, Autocomplete);
}

const GoogleMapsPlugin = {

    install: function(Vue, options){
        const finalOptions = Object.assign({}, {
            installComponents: true,
            componentsPrefix: 'google-maps-'
        }, options);

        optionMergeStrategies(Vue);
        initErrorHandling(Vue);

        if(finalOptions.installComponents){
            registerComponents(Vue, finalOptions.componentsPrefix);
        }

        if(finalOptions.load){
            GMapsLoader.load(finalOptions.load);
        }
    }
};

export default GoogleMapsPlugin;