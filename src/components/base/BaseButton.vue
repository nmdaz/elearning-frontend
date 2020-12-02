<template>
	<button class="base-button" :type="type" @click="$emit('click')">
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
.base-button {
	padding: .6rem 1.5rem;
    background-color: #38bb8e;
    border: none;
    color: #1e311e;
    letter-spacing: 0.12rem;
    border-radius: 0.2rem;
    font-size: .8rem;
	cursor: pointer;
	color: white;
	font-family: Roboto;
}
</style>