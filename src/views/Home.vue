<template>
    <div class="home">
        <div class="home__controls">
            <div class="home__control-item">
                <font-awesome-icon v-if="$route.path == '/home/enrolled-courses'" :icon="['fas', 'angle-right']" />
                <router-link class="home__button" to="/home/enrolled-courses">ENROLLED COURSES</router-link>
            </div>      
            <div class="home__control-item">
                <font-awesome-icon v-if="$route.path == '/home/authored-courses'" :icon="['fas', 'angle-right']" />
                <router-link class="home__button" to="/home/authored-courses">AUTHORED COURSES</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Home',
    mounted() {
        if (this.$route.path === '/home' || this.$route.path === '/home') 
            this.$router.push('/home/enrolled-courses');
    }
}
</script>

<style lang="scss" scoped>
<<<<<<< HEAD
@import '@/css/_mixin.scss';

=======
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
.home {
    font-size: .7rem;

    &__controls {
        margin-bottom: 2rem;
        display: flex;
        background-color: #38bb8e;
        padding: .5rem;
        justify-content: center;
        color: white;
    }

    &__control-item {
        display: flex;
        align-items: center;
    }

    &__button {
        white-space: nowrap;
        margin-right: 1rem;
        margin-left: .25rem;
    }
<<<<<<< HEAD

    @include for-phone-only {
        font-size: .6rem;
    }
=======
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
}
</style>