<template>
	<div class="full-page-text">
		<div>{{ text }}</div>
		<slot></slot>
	</div>
</template>

<script>

export default {
	name: 'FullPageText',
	props: [ 'text' ]
}	

</script>

<style lang="scss">

.full-page-text {
	font-size: 1rem;
	position: absolute;
	height: 50vh;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	text-align: center;
    height: 80vh;
    margin-top: 20%;
}


</style>