<template>
    <PageLoader v-if="loading" text="Loading..." />
    <div v-else class="password-email">

        <CenterWrapper>
            <MessageBox v-if="emailSent"  title="Success">
                <div> Email has been sent to {{ email }} </div>
                <div> Please check your email </div>
            </MessageBox>

            <BasicForm v-else legend="Forgot Password" @submit="submit">
                <InputGroup
                    v-model="email"
                    label="Email"
                    type="email"
                    class="form-reset__input-group"
                    :error="emailError"
                    @focus="resetError"
                    :required="true"
                />
                <BaseButton>Submit</BaseButton>
            </BasicForm>
        </CenterWrapper>
    
        
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
import MessageBox from '@/components/MessageBox';
import CenterWrapper from '@/components/CenterWrapper';
import PageLoader from '@/components/PageLoader';
import { mapState } from 'vuex';

export default {
    name: 'ForgotPassword',
    components: { InputGroup, BaseButton, BasicForm, MessageBox, CenterWrapper, PageLoader },
    data() {
        return {
            email: '',
            emailError: '',
            emailSent: false,
            loading: false
        }
    },
    computed: {
        ...mapState({
            apiUrl: state => state.server.apiUrl,
            passwordResetCallbackUrl: state => state.auth.passwordResetCallbackUrl
        })
    },
    methods: {
        async submit() {

            if (this.validateEmailField() === false) return;

            const url = `${this.apiUrl}/auth/password/email`;

            try {
                this.loading = true;
                await window.axios.post(url, {
                    email: this.email,
                    callbackUrl: this.passwordResetCallbackUrl
                });
                this.emailSent = true;
                this.loading = false;
            }
            catch (error) {
                this.loading = false;
                console.log([error]);
                if (error.response.data.errors.email) this.emailError = error.response.data.errors.email[0];
            }
        },

        resetError() {
            this.emailError = '';
        },

        validateEmailField() {
            if (this.email) return true;
            this.emailError = 'Email field is required';
            return false;
        }
    }
}
</script>

<style lang="scss" scoped>
.password-reset {
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.email-sent {
    text-align: center;
    padding: 2rem;
}
</style>