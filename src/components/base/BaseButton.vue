<template>
	<button class="button" :type="type" @click="click">
		{{ text }}
	</button>
</template>

<script>
export default {
	name: 'BaseButton',
	props: { type: String, text: String },
	methods: {
		click() {
			this.$emit('click');
		}
	}
}
</script>

<style lang="scss" scoped>
.button {
	padding: .5rem;
}
</style>