<template>
	<div class="register-view">
		<form class="register-form" @submit.prevent="register">
			<InputGroup
				label="Name"
				type="text"
				v-model="name"
				:error="error.name"
			/>

			<InputGroup
				label="Email"
				type="email"
				v-model="email"
				:error="error.email"
			/>

			<InputGroup
				label="Password"
				type="password"
				v-model="password"
				:error="error.password"
			/>

			<InputGroup
				label="Confirm Password"
				type="password"
				v-model="password_confirmation"
				:error="error.password_confirmation"
			/>

			<BaseButton type="submit" text="Register" />
		</form>
	</div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton';
import InputGroup from '@/components/InputGroup';

export default {
	name: 'register',
	components: { InputGroup, BaseButton },
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
	padding: 2rem;
}

.register-form {
	padding: 1rem;
	max-width: 500px;
	margin: auto;

	.register-form__control-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;
	}

	.register-form__label {
		font-size: .8rem;
		margin-bottom: .2rem;
		color: #444;
	}

	.register-form__input {
		padding: .4rem;
		border-width: 0 0 1px 0;
	}

	.register-form__error {
		margin-top: .2rem;
		color: red;
	}
}



</style>