define(['underscore', 'backbone'], function(_, Backbone){
    return Backbone.Model.extend({
       defaults: {
           'name': '',
           'surname': '',
           'phone': '',
           'email': '',
           'password': '',
           'registrationDate': '',
           'vat': '',
           'fiscalCode': '',
           'address': '',
           'isTrusted': false,
           'searches': [],
           'reservations': []
       }
    });
});
