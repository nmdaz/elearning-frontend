<template>
	<div class="c-text-link">
		{{ leftText  }}
		<router-link class="c-text-link__anchor" :to="src">{{ srcText }}</router-link>
		{{ rightText }}
	</div>
</template>
<script>
export default {
	name: 'TextLink',
	props: [ 'leftText', 'srcText', 'rightText', 'src' ]
}
</script>

<style lang="scss" scoped>

.c-text-link {
	color: inherit;

	&__anchor {
		color: #232371;
		font-weight: bold;
	}
}

</style>