<template>
    <div class="password-email">

        <CenterWrapper>
            <MessageBox v-if="emailSent"  title="Success">
                <div> Email has been sent to {{ email }} </div>
                <div> Please check your email </div>
            </MessageBox>

            <BasicForm v-else legend="Forgot Password" @submit="submit">
                <InputGroup
                    v-model = "email"
                    label="Email"
                    type="email"
                    class="form-reset__input-group"
                    :error="emailError"
                    @focus="resetError"
                    :required="true"
                />

                <BaseButton 
                    type="submit"
                    text="Submit"
                />
            </BasicForm>
        </CenterWrapper>
    
        
    </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton';
import InputGroup from '@/components/InputGroup';  
import BasicForm from '@/components/BasicForm';
import MessageBox from '@/components/MessageBox';
import CenterWrapper from '@/components/CenterWrapper';
import { mapState } from 'vuex';

export default {
    name: 'ForgotPassword',
    components: { InputGroup, BaseButton, BasicForm, MessageBox, CenterWrapper },
    data() {
        return {
            email: '',
            emailError: '',
            emailSent: false
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
                await window.axios.post(url, {
                    email: this.email,
                    callbackUrl: this.passwordResetCallbackUrl
                });
                this.emailSent = true;
            }
            catch (error) {
                if (error.response.data.errors.email)
                    this.emailError = error.response.data.errors.email[0];
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