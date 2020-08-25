<template>
    <div class="login-view">
        <form class="login-form" @submit.prevent="submit">

            <InputGroup  
                class="login-form__control-group"
                v-model="email"
                label="Email"
                type="email" 
                ref="email"
                :error="error.email"
            />

            <InputGroup  
                class="login-form__control-group"
                v-model="password"
                label="Password"
                type="password" 
                ref="password"
                :error="error.password"
            />

            <BaseButton type="submit" text="Login" class="login-form__button" />    

            <small v-if="error.server" class="login-form__error">
                    {{ error.server }}
            </small>        

        </form>
    </div>
</template>

<script>

import BaseButton from '@/components/base/BaseButton';
import InputGroup from '@/components/InputGroup';

export default {
    components: { BaseButton, InputGroup },
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
        padding: 2rem;
    }

    .login-form {
        padding: 1rem;
        max-width: 500px;
        margin: auto;

        .login-form__control-group {
            margin-bottom: 1rem;
        }

        .login-form__error {
            display: block;
            margin-bottom: 1rem;
            color: red;
        }

        .login-form__button {
            margin-bottom: 1rem;
        }
    }
</style>