<template>
  <div class="demo-login" @click="login">
    <font-awesome-icon class="demo-login__icon" :icon="['fas', 'user']" />
    <span class="demo-login__text">Login Demo</span>
  </div>
</template>


<script>
  export default {
    name: 'DemoLogin',
    data() {
      return {
        username: 'demo@gmail.com',
        password: 'demo@gmail.com'
      }
    },
    methods: {
      async login() {
        try {
          await this.$store.dispatch('auth/login', {
            email: this.username,
            password: this.password
          });

          this.$router.push({name: 'AuthoredCourses'});
        } catch (error) {
          console.log(error);
        }     
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import '@/css/_mixin.scss';

  .demo-login {
    font-size: 20px;
    text-align: center;
    width: fit-content; 
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 2px;
    padding: .2em 1em;
    margin-top: 5rem;
    border: 3px solid white;
    border-radius: 2px;


    &__icon {
      font-size: 1em;
      margin-right: .5rem;
    }

    &__text {
      font-size: 1em; 
    }

    @include for-tablet-down {
      font-size: 15px;
      border-width: 2.5px;
    }

    @include for-phone-only {
      border-width: 2.2px;
    }
  }
</style>