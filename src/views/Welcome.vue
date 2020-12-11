<template>
  <div class="welcome-view">
    <header class="hero-header">
      <p class="hero-header__text">Create your own courses and lessons</p>
      <p class="hero-header__text mb-1rem">Enroll to others user's course</p>
      <BaseButton @click="register" class="hero-header__button">Join Now</BaseButton>

      <DemoLogin />
    </header>
  </div>
</template>

<script>
import BaseButton from '@/components/controls/BaseButton';
import DemoLogin from '@/components/DemoLogin';

export default {
  name: 'WelcomeView',
  components: { BaseButton, DemoLogin },
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
  padding: 5rem 3rem;
  background-image: url('../assets/img/bg_welcome.jpg');
  background-size: cover;
  min-height: 90vh;
  color: #DDD;
  line-height: 2rem;

  &__quote {
    font-family: "Open Sans";
    font-weight: bold;
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 2rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  &__text {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: .025rem;
    font-family: Roboto;
  }

  &__button {
    margin: 0 auto 0 auto;
    display: block;
    border-radius: 2px;
    text-transform: none;
    letter-spacing: .04rem;
    font-size: 1rem;
  }

  @include for-tablet-down {

    padding-left:  1rem;
    padding-right: 1rem;

    &__quote {
      font-size: 1.5rem;
      line-height: 2rem;
    }

    &__text {
      font-size: 1rem;
      line-height: 1.2rem;
    }

    &__button {
      font-size: .8rem;
      padding: .5rem 1rem;
    }
  }

  @include for-phone-only {
    &__quote {
      font-size: 1rem;
      line-height: 1.6rem;
    }
    
    &__text {
      font-size: .8rem;
    }

    &__button {
      font-size: .7rem;
      padding: .3rem .8rem;
    }
  }
}



</style>