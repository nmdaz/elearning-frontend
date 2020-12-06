<template>
	<button class="c-button" :type="type" @click="$emit('click')">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'BaseButton',
	props: { type: String }
}
</script>

<style lang="scss" scoped>

.c-button {
	padding: 0.6rem 1.5rem;
	background-color: #38bb8e;
	border: none;
	letter-spacing: 0.12rem;
	font-size: 0.75rem;
	cursor: pointer;
	color: white;
	font-family: Roboto;
	text-transform: uppercase;
	background-color: #00000017;
	border: 2px solid #ffffff;
	border-radius: 4px;
}	

</style>