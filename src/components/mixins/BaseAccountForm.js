import UserAvatarForm from "../util/UserAvatarForm";
import UserDataForm from "../util/UserDataForm";
import BankAcountForm from "../util/BankAccountForm";

export default{
    components: {
        UserAvatarForm,
        UserDataForm,
        BankAcountForm
    },

    data: function(){
        return {
            formBtnLabel: 'Aggiungi',
            formBtnIcon: 'fa fa-plus',
            formTitle: 'Nuovo Fornitore',
            formTitleIcon: 'fa fa-user-plus'
        }
    },

    methods: {
        setData: function(item){
            this.item = item;
            this.formBtnLabel = 'Modifica';
            this.formBtnIcon = 'fa fa-edit';
            this.formTitle = 'Modifica: ' + this.item.name;
            this.formTitleIcon = 'fa fa-user';
        }
    }
}