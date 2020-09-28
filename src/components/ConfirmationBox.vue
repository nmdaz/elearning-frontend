<template>
	<div class="confirmation-box">
		<div class="confirmation-box__message">
			{{ message }}
		</div>
		<div class="confirmation-box__body">
			<button class="confirmation-box__button" @click="$emit('confirm')">Confirm</button>
			<button class="confirmation-box__button" @click="$emit('cancel')">Cancel</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ConfirmationBox',
	props: ['message']
}
</script>

<style lang="scss" scoped>
.confirmation-box {
	border: 1px solid #ddd;
	width: fit-content;
	padding: 1rem;

	&__message {
		margin-bottom: .5rem;
	}

	&__body {
		text-align: center;
	}

	&__button {
		margin-right: .5rem;
	}
}
</style>