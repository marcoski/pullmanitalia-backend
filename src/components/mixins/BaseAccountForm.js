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
            formBtnIcon: 'fa fa-plus'
        }
    },

    methods: {
        setData: function(item){
            this.item = item;
            this.formBtnLabel = 'Modifica';
            this.formBtnIcon = 'fa fa-edit';
        },

        submit: function(){
            console.log(this.item);
        }
    }
}