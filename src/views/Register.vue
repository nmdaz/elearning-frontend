<template>
    <div class="register-view">
<<<<<<< HEAD
        <BasicForm class="register-view__form" @submit="register">
=======
        <BasicForm class="register-view__form" legend="Register an Account" @submit="register">
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
            <InputGroup
                class="register-view__input-group"
                label="Name"
                type="text"
                v-model="name"
                :error="error.name"
            />

            <InputGroup
                class="register-view__input-group"
                label="Email"
                type="email"
                v-model="email"
                :error="error.email"
            />

            <InputGroup
                class="register-view__input-group"
                label="Password"
                type="password"
                v-model="password"
                :error="error.password"
            />

            <InputGroup
                class="register-view__input-group"
                label="Confirm Password"
                type="password"
                v-model="password_confirmation"
                :error="error.password_confirmation"
            />

            <BaseButton class="register-view__button" type="submit">Register</BaseButton>
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
    name: 'register',
    components: { InputGroup, BaseButton, BasicForm },
    data() {
        return {
            error: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    },
    methods: {
        async register() {
            this.resetErrors();

            try {
                await this.$store.dispatch('auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                });

                this.$router.push({ name: 'Home' });
            }
            catch (errors) {
                if (errors['name'] && errors['name'][0]) 
                    this.error.name = errors['name'][0];

                if (errors['email'] && errors['email'][0]) 
                    this.error.email = errors['email'][0];

                if (errors['password'] && errors['password'][0]) 
                    this.error.password = errors['password'][0];

                if (errors['password_confirmation'] && errors['password_confirmation'][0]) 
                    this.error.password_confirmation = errors['password_confirmation'][0];
            }
        },
        resetErrors() {
            this.error.name = '';
            this.error.email = '';
            this.error.password = '';
            this.error.password_confirmation = '';
        }
    }
}
</script>

<style lang="scss">
.register-view {
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
        margin-top: 2rem;
        margin-bottom: 1rem;
        width: 100%;
    }
}
</style>