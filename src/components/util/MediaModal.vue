<template>
    <b-modal lazy class="modal-info app-modal-avatar" ref="mediaModal" @ok="ok" @cancel="cancel" ok-variant="info">
        <div slot="modal-title">
            <h5 class="modal-title"><i class="fa fa-image"></i> Scegli un avatar</h5>
        </div>
        <b-container>
            <b-card no-body>
                <b-tabs pills card>
                    <b-tab title="Da URL">
                        <b-input-group size="lg">
                            <b-form-input type="text" v-model="imageUrl" placeholder="Url immagine"></b-form-input>
                        </b-input-group>
                    </b-tab>
                    <b-tab title="Libreria">
                        
                    </b-tab>
                    <b-tab title="Upload">

                    </b-tab>
                </b-tabs>
            </b-card>
        </b-container>
    </b-modal>
</template>

<script>
    export default {
        name: 'media-modal',

        data: function(){
            return {
                imageUrl: null
            }
        },

        methods: {
            open: function(){
                this.$refs.mediaModal.show();
            },

            ok: function(){
                if(this.imageUrl !== null){
                    this.$radio.$emit('media_modal:ok', this.imageUrl);
                }
            },

            cancel: function(){
                this.imageUrl = null;
            }
        }
    }
</script>
