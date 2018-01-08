    var Translations = window.translations;

    String.prototype.strtr = function(replacePairs){
        "use strict";
        var str = this.toString(), key, re;
        for(key in replacePairs){
            if(replacePairs.hasOwnProperty(key)){
                re = new RegExp(key, "g");
                str = str.replace(re, replacePairs[key]);
            }
        }

        return str;
    };

    var Translator = {
        trans: function(id, domain, parameters){
            if(_.isNull(domain)){
                parameters = domain;
                domain = 'messages';
            }
            parameters || (parameters = {});

            if(Translations.hasOwnProperty(domain) && Translations[domain].hasOwnProperty(id)){
                return Translations[domain][id].strtr(parameters);
            }

            return id;
        },

        transChoice: function(id, number, domain, parameters){
            if(_.isNull(domain)){
                parameters = domain;
                domain = 'messages';
            }
            parameters || (parameters = {});
            parameters = _.extend({
                '%count%': number
            }, parameters);

            if(number > 1 && id.hasOwnProperty('plural')){
                return Translator.trans(id.plural, domain, parameters);
            }

            if(number == 1 && id.hasOwnProperty('singular')){
                return Translator.trans(id.singular, domain, parameters);
            }

            return '';
        }
    };