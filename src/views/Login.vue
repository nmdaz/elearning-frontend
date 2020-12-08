<template>
    <div class="login-view">
<<<<<<< HEAD
        <BasicForm class="login-view__form" @submit="submit">
=======
        <BasicForm class="login-view__form" @submit="submit" legend="Login">
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
            <InputGroup  
                class="login-view__control-group"
                v-model="email"
                label="Email"
                type="email" 
                ref="email"
                :error="error.email"
            />

            <InputGroup  
                class="login-view__control-group"
                v-model="password"
                label="Password"
                type="password" 
                ref="password"
                :error="error.password"
            />

            <BaseButton type="submit" class="login-view__button">
                Login
            </BaseButton>    

            <small v-if="error.server" class="login-view__error">
                    {{ error.server }}
            </small>        

            <router-link class="forgot-password-link" :to="{ name: 'ForgotPassword' }"> Forgot Password? </router-link>
        </BasicForm>
    </div>
</template>

<script>

<<<<<<< HEAD
import BaseButton from '@/components/controls/BaseButton';
import InputGroup from '@/components/InputGroup';
import BasicForm from '@/components/controls/BaseForm';
=======
import BaseButton from '@/components/base/BaseButton';
import InputGroup from '@/components/InputGroup';
import BasicForm from '@/components/BasicForm';
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32

export default {
    components: { BaseButton, InputGroup, BasicForm },
    data() {
        return {
            error: { email: '', password: '', server: '' },
            email: '',
            password: ''
        }
    },
    methods: {
        submit() {
            this.resetErrors();

            if (!this.validateEmail()) return;

            if (!this.validatePassword()) return;
            
            this.login();
        },

        async login() {
            try {
                await this.$store.dispatch('auth/login', {
                    email: this.email,
                    password: this.password
                })

                if (this.$route.params.redirect) {
                    this.$router.push('/' + this.$route.params.redirect);
                    return;
                }

                this.$router.push({ name: 'Home' });
            } 
            catch (error) {
                this.error.server = error;
            }
        },

        validateEmail() {
            if (!this.email) {
                this.$refs.email.focus();
                this.error.email = 'Email field is required';
                return false;
            }

            return true;
        },

        validatePassword() {
            if (!this.password) {
                this.$refs.password.focus();
                this.error.password = 'Password field is required';
                return false;
            }

            return true;
        },

        resetErrors() {
            this.error.email = '';
            this.error.password = '';
            this.error.server = '';
        }
    }
}
</script>

<style lang="scss" scoped>
.login-view {
    margin-top: 2rem;
    padding: 1rem;

    &__form {
        margin-left: auto;
        margin-right: auto;
    }

    &__control-group {
        margin-bottom: 1rem;
    }

    &__error {
        display: block;
        margin-bottom: 1rem;
        color: red;
    }

    &__button {
        margin-bottom: 1rem;
        width: 100%;
    }
}

.forgot-password-link {
    display: block;
    font-size: 0.8rem;
    text-decoration: none;
    color: #636060;
}
</style>