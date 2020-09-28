<template>
    <div class="welcome-view">
        <header>
            <div class="hero-header">
                <img class="hero-header__cover" src="../assets/img/welcome_bg.jpg">
                <div class="hero-header__content">
                    <div class="hero-header__title-group">
                        <h2 class="hero-header__title">
                            Teacher or Educators?
                        </h2>
                        <p class="hero-header__text">
                            Create your own courses and lesson. Make it public or private and add homework.
                        </p>
                    </div>
                    <div class="hero-header__title-group">
                        <h2 class="hero-header__title">
                            Students
                        </h2>
                        <p class="hero-header__text">
                            Enroll to public courses or join private courses by invites
                        </p>
                    </div>
                    <BaseButton @click="register" class="hero-header__button">
                        Join Now
                    </BaseButton>
                </div>
            </div>
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
    display: flex;
    height: 80vh;
    align-items: center;

    &__cover {
        width: 500px;
        padding: 1rem;
        box-sizing: border-box;
    }

    &__content {
        padding: 1rem;
    }

    &__title-group {
        margin-bottom: 1rem;
    }

    &__title {
        margin-bottom: .5rem;
        color: #38bb8e;
    }

    &__text {
        color: #444;
    }
}

@include for-tablet-down {
    .hero-header {
        flex-wrap: wrap;

        &__cover {
            width: 100%;
        }
    }
}

</style>