<template>
    <div class="animated fadeIn app-customers-container">
        <b-row>
            <b-col sm="12">
                <router-view></router-view>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: 'customers-container'
    }
</script>