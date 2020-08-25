<template>
<div class="navbar">
	<div class="navbar__brand">
		Elearning
	</div>
	<div @click="toggleLinks" class="navbar__toggler navbar__toggler--hidden">
		=
	</div>
	<ul v-bind:class="{ navbar__links: true, 'navbar__links--show': showLinks   }">
		<li class="navbar__item">
			About
		</li>
		<li class="navbar__item">
			Contact
		</li>
		<li class="navbar__item">
			Account
		</li>
	</ul>
</div>
</template>

<script>
export default {
	name: 'Navbar',
	data() {
		return {
			showLinks: false
		}
	},
	methods: {
		toggleLinks() {
			this.showLinks = !this.showLinks;
		}
	}
}
</script>

<style lang="scss" scoped>
.navbar {
	padding: 1rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	background-color: #333;
	color: #fff;
	font-size: .9rem;

	.navbar__toggler--hidden {
		display: none;
	}

	.navbar__links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
	}

	.navbar__item {
		margin-right: .5rem;
	}
}

@media screen and (max-width: 500px) {
	.navbar {
		.navbar__toggler {
			display: block;
		}

		.navbar__links {
			display: none;
		}

		.navbar__links--show {
			flex-basis: 100%;
			display: flex;
			flex-direction: column;
			margin-top: .8rem;
			border-top: 1px solid white;

			.navbar__item {
				margin-top: .8rem;
				font-size: .8rem;
			}
		}
	}
}

</style>