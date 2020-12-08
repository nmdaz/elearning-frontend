<template>
    <div class="welcome-view">
        <header class="hero-header">

            <div class="hero-header__quote">
               <p> Get your education. </p>
               <p> At home, school or any place </p>
            </div>

            <p class="hero-header__text">Create your own courses and lessons</p>
            <p class="hero-header__text mb-1rem">or enroll to others user's course</p>

            <BaseButton @click="register" class="hero-header__button">Join Now</BaseButton>
        </header>
    </div>
</template>

<script>
<<<<<<< HEAD
import BaseButton from '@/components/controls/BaseButton';
=======
import BaseButton from '@/components/base/BaseButton';
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32

export default {
    name: 'WelcomeView',
    components: { BaseButton },
    methods: {
        register() {
            this.$router.push({name: 'Register' });
        }
    },
    
}
</script>

<style lang="scss" scoped>
@import '@/css/_mixin.scss';

.hero-header {
    padding: 3rem;
    background-image: url('../assets/img/bg_welcome.jpg');
    background-size: cover;
    min-height: 90vh;
    color: #f1f1f1;

    &__quote {
        font-family: "Open Sans";
        font-weight: bold;
        text-align: center;
        font-size: 1.8rem;
        margin-bottom: 2rem;
        line-height: 2.5rem;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }

    &__text {
        text-align: center;
        font-size: 1.25rem;
        font-weight: bold;
        letter-spacing: .08rem;
        font-family: Roboto;
        line-height: 1.4rem;
    }

    &__button {
        margin: 0 auto 0 auto;
        display: block;
    }

    @include for-tablet-down {
        &__quote {
            font-size: 1.5rem;
            line-height: 2rem;
        }

        &__text {
            font-size: 1rem;
        }
    }

    @include for-phone-only {
        &__quote {
            font-size: 1.1rem;
            line-height: 1.6rem;
        }
<<<<<<< HEAD

        &__text {
            font-size: .9rem;
        }
=======
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
    }
}



</style>