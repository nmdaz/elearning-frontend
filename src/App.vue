<template>
  <div id="app">
    <Navbar class="header-block" />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
    name: 'App',
    components: {
        Navbar
    }
}
</script>

<style lang="scss">
@import '@/css/_global.scss';
</style>
