<template>
	<div class="center-wrappper" id="center-wrapper" :height="height + 'px'">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'CenterWrapper',
	data() {
		return {
			totalHeight: 0
		}
	},
	computed: {
		height() {
			return window.innerHeight - this.totalHeight;
		}
	},
	mounted() {
		let totalHeight = 0;

		let blocks = window.document.querySelectorAll('.header-block');

		blocks.forEach((block) => {
			totalHeight += block.offsetHeight;
		})

		this.totalHeight = totalHeight;
	}
}
</script>

<style lang="scss" scoped>
.center-wrappper {
	display: flex;
	width: 100vw;
	height: 80vh;
}
</style>