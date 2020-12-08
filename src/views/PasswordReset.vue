<template>
    <div class="password-reset">
        <div v-if="success" class="success-text">
            Your password has been reset
        </div>
        <form v-else class="form-reset" @submit.prevent="submit">
            <legend class="form-reset__legend">Password Reset</legend>
            <InputGroup
                class="form-reset__input-group"
                v-model = "email"
                label="Email"
                type="email"
                :error="errors.email"
                @focus="resetError"
            />
            <InputGroup
                class="form-reset__input-group"
                v-model = "password"
                label="New Password"
                type="password"
                :error="errors.password"
                @focus="resetError"
            />
            <InputGroup
                class="form-reset__input-group"
                v-model = "password_confirmation"
                label="Confirm New Password"
                type="password"
                @focus="resetError"
            />

            <BaseButton type="submit">Reset Password</BaseButton>

            <small v-if="errors.token" class="error-message">
                    {{ errors.token }}
            </small>     
        </form>
    </div>
</template>

<script>
<<<<<<< HEAD
import BaseButton from '@/components/controls/BaseButton';
=======
import BaseButton from '@/components/base/BaseButton';
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
import InputGroup from '@/components/InputGroup';   
import { mapState } from 'vuex';

export default {
    name: 'PasswordReset',
    components: { InputGroup, BaseButton },
    props: [
        'token'
    ],
    data() {
        return {
            email: '',
            password: '',
            password_confirmation: '',
            errors: {
                email: '',
                password: '',
                token: ''
            },
            success: false
        }
    },
    computed: {
        ...mapState({ apiUrl: state => state.server.apiUrl })
    },
    methods: {
        async submit() {
            const url = `${this.apiUrl}/auth/password/reset`;

            try {
                const data = { 
                    email: this.email, 
                    password: this.password, 
                    password_confirmation: this.password_confirmation,
                    token: this.token
                };

                await window.axios.post(url, data);

                this.success = true;

                window.setTimeout( () => {
                    this.$router.push({ name: 'Login' });
                }, 3000);
            }
            catch (error) {
                const errors = error.response.data.errors;

                if (errors.email) this.errors.email = errors.email[0];
                if (errors.password) this.errors.password = errors.password[0];
                if (errors.token) this.errors.token = errors.token[0];
            }
        },

        resetError() {
            this.errors.email = '';
            this.errors.password = '';
            this.errors.token = '';
        },
    }
}
</script>

<style lang="scss" scoped>
.success-text {
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-reset {
    min-width: 350px;
    max-width: 500px;
    margin: auto;
    padding: 2rem;

    &__legend {
        margin-bottom: 2rem;
        background-color: #333;
        padding: .5rem;
        color: #DDD;
        font-size: .8rem;
    }

    &__input-group {
        margin-bottom: 2rem;
    }
}

.error-message {
    display: block;
    margin-bottom: 1rem;
    color: red;
    margin-top: 1rem;
}
</style>