<template>
  <div id="app">
    <NavigationBar class="header-block" />
    <router-view/>
    <BottomFooter />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import BottomFooter from '@/components/BottomFooter.vue';

export default {
    name: 'App',
    components: {
        NavigationBar, BottomFooter
    }
}
</script>

<style lang="scss">
@import '@/css/_reset.scss';
@import '@/css/_global.scss';
</style>
