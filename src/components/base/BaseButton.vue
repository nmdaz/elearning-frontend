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
	padding: 0.6rem 1.5rem;
    background-color: #38bb8e;
    border: none;
    letter-spacing: 0.12rem;
    font-size: 0.75rem;
    cursor: pointer;
    color: white;
    font-family: Roboto;
    text-transform: uppercase;
    border-radius: 2px;
}
</style>