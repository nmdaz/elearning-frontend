<template>
    <div class="welcome-view">
        <header class="hero-header">

            <div class="hero-header__quote">
               <font-awesome-icon :icon="['fa', 'quote-left']" />
                They cannot stop me. I will get my education. If it is in the home, school or any place
                <font-awesome-icon :icon="['fa', 'quote-right']" />
            </div>

            <p class="hero-header__text">Create your own courses and lesson</p>
            <p class="hero-header__text mb-1rem">or enroll to others user's course</p>

            <BaseButton @click="register" class="hero-header__button">Join Now</BaseButton>
        </header>
    </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton';

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
    }

    &__text {
        text-align: center;
        font-size: 1.25rem;
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
    }
}



</style>