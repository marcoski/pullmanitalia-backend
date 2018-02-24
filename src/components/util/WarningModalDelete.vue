<template>
    <b-modal class="modal-warning" ref="warningModal" @ok="ok" ok-variant="warning">
        <div slot="modal-title">
            <h5 class="modal-title"><i class="fa fa-trash"></i> {{ title }}</h5>
        </div>
        <h5 class="text-center">{{ body }}</h5>
    </b-modal>
</template>
<script>
    export default {
        name: 'warning-modal-delete',
        props: {
            title: {
                type: String,
                required: true
            },
            body: {
                type: String,
                required: true
            },
        },

        data: function(){
            return {
                toDeleteElements: []
            }
        },

        methods: {
            open: function(toDeleteElements){
                this.toDeleteElements = toDeleteElements;
                this.$refs.warningModal.show();
            },

            ok: function(){
                this.$emit('ok', this.toDeleteElements)
            }
        }
    }
</script>