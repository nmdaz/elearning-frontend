<template>
		<router-link class="button-link" :to="url"><slot></slot></router-link>
</template>

<script>
export default {
	name: 'ButtonLink',
	props: [ 'url' ]
}
</script>

<style lang="scss" scoped>
.button-link {
	padding: .6rem 1.5rem;
	background-color: #38bb8e;
	border: none;
	color: #1e311e;
	letter-spacing: 0.12rem;
	font-size: .8rem;
	cursor: pointer;
	color: white;
	font-family: Roboto;
	width: fit-content;
}
</style>