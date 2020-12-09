<template>

<div class="full-height" ref="target">
	<div class="full-height__text">{{ text }}</div>
	<slot></slot>
</div>

</template>

<script>

export default {
	name: 'FullHeight',
	props: [ 'text' ],
	mounted() {
		const availableScreenHeight = this.$store.getters.availableScreenHeight + 'px';
		this.$refs.target.style.height = availableScreenHeight;
	}
}	

</script>

<style lang="scss">

.full-height {
	width: 100%;
	text-align: center;

	&__text {
		margin-top: 20%;
	}
}

</style>