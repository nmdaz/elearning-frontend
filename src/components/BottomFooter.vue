<template>
	<div>
		<div class="c-big-footer">
			<div class="c-big-footer__section">
				<div class="c-big-footer__content">
					<div class="c-big-footer__title c-big-footer__title">Elearning</div>
					<p class="c-big-footer__item">This is a demo or portfolio web development project that use modern back-end and front-end framework</p>
				</div>
			</div>

<<<<<<< HEAD
			<div class="c-big-footer__section c-big-footer__section--duo">
=======
			<div class="c-big-footer__section">
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
				<div class="c-big-footer__content">
					<div class="c-big-footer__title ml-p25rem">Frontend</div>
					<p class="c-big-footer__item">
						<font-awesome-icon class="c-big-footer__icon" :icon="['fab', 'js']" />
						<a href=""> JS</a>
					</p>
					<p class="c-big-footer__item">
						<font-awesome-icon class="c-big-footer__icon" :icon="['fab', 'vuejs']" />
						<a href=""> Vue.js</a>
					</p>
					<p class="c-big-footer__item">
						<font-awesome-icon class="c-big-footer__icon" :icon="['fab', 'sass']" />
						<a href=""> Sass</a>
					</p>
				</div>
			</div>

<<<<<<< HEAD
			<div class="c-big-footer__section c-big-footer__section--duo">
=======
			<div class="c-big-footer__section">
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
				<div class="c-big-footer__content">
					<div class="c-big-footer__title ml-p25rem">Backend</div>
					<p class="c-big-footer__item">
						<font-awesome-icon class="c-big-footer__icon" :icon="['fab', 'php']" />
						<a href=""> PHP</a>
					</p>
					<p class="c-big-footer__item">
						<font-awesome-icon class="c-big-footer__icon" :icon="['fab', 'laravel']" />
						<a href=""> Laravel</a>
					</p>
					<p class="c-big-footer__item">
						<font-awesome-icon class="c-big-footer__icon" :icon="['fa', 'database']" />
						<a href=""> MySQL</a>
					</p>
				</div>
			</div>

			<div class="c-big-footer__section">
				<div class="c-big-footer__content">
					<div class="c-big-footer__title ml-p25rem">Contacts</div>
					<p class="c-big-footer__item">
						<font-awesome-icon class="c-big-footer__icon" :icon="['fas', 'envelope']" />
						<a href="mailto:nmdazgames@gmail.com">nmdazgames@gmail.com</a>
					</p>
					<p class="c-big-footer__item">
						<font-awesome-icon class="c-big-footer__icon" :icon="['fab', 'facebook-square']" />
						<a href="https://facebook.com/daznoeljr">facebook.com/daznoeljr</a>
					</p>
					<p class="c-big-footer__item">
						<font-awesome-icon class="c-big-footer__icon" :icon="['fab', 'github']" />
						<a href="https://github.com/nmdaz">github.com/nmdaz</a>
					</p>
				</div>
			</div>
		</div>

		<footer class="c-footer">
			<font-awesome-icon class="c-footer__icon" :icon="['far', 'copyright']" />
			Noel M. Daz Jr.
		</footer>
	</div>
</template>

<script>

export default {
	name: 'BottomFooter'
}

</script>

<style lang="scss">

@import '@/css/_mixin.scss';

.c-big-footer {
	font-size: .8rem;
	padding: 1rem 1.5rem;
    background-color: #313131;
    display: flex;
    color: #c5c3c3;
    line-height: 1rem;
    display: flex;
    flex-wrap: wrap;

	&__icon {
		font-size: 1.2em;
		min-width: 32px;
		text-align: left;
	}

	&__section {
		flex-basis: 25%;
	}

	&__content {
		width: fit-content;
	}

	&__content--two-column {
		display: flex;
	}

	&__column {
		margin-right: 1rem;
	}

	&__item {
		font-size: .8em;
		margin-top: .2rem;
	}

	&__title {
		font-size: 1em;
		color: #e8e5e5;
		margin-bottom: .1em;
		font-weight: bold;
	}

	&__title--center {
		text-align: center;
	}

	@include for-tablet-portrait-up {
		&__content {
			margin-left: auto;
			margin-right: auto;
		}
	}

	@include for-tablet-down {
		&__section {
			flex-basis: 50%;
			margin-top: 1rem;
		}

		&__item {
			max-width: 200px;
		}
	}

	@include for-phone-only {
		&__section {
			flex-basis: 100%;
		}

		&__content {
			width: 320px;
<<<<<<< HEAD
			margin-left:1rem;
		}

		&__section--duo {
=======
			margin-left: 2rem;
		}

		&__section:nth-child(2), &__section:nth-child(3) {
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
			flex-basis: 50%;

			.c-big-footer__content {
				width: 100%;
			}
		}		
	}
}

.c-footer {
	padding: .5rem;
	text-align: center;
	font-size: .7rem;
	display: flex;
	justify-content: center;
	font-family: Roboto;
	text-transform: uppercase;
	font-weight: bold;
	background-color: #202020;
	color: white;

	&__icon {
		font-size: .9rem;
		margin-right: .25rem;
		margin-bottom: .01rem;
	}
}

</style>