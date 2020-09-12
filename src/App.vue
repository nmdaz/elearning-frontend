<template>
  <div id="app">
    <NavigationBar class="header-block" />
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default {
    name: 'App',
    components: {
        NavigationBar
    }
}
</script>

<style lang="scss">
@import '@/css/_reset.scss';
@import '@/css/_global.scss';



</style>
