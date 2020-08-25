<template>
  <div id="app">
    <Navbar />
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

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
}

html {
    font-size: 16px;
    letter-spacing: .15rem;
    font-family: Helvetica, Arial;
}

</style>
