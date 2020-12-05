
</template>
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

<style lang="scss" scoped>

.full-page-text {
	width: 100%;
    text-align: center;
    height: 50vh;
    margin-top: 20%;
}

</style>