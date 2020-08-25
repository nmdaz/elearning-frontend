<template>
    <div class="welcome-view">
        <header class="hero-header">
            <p class="hero-header--text">Learn at your own place and at your own time</p>
            <router-link to="/register" class="hero-header--button">Signup Now</router-link>
        </header>
    </div>
</template>

<style lang="scss" scoped>
.hero-header {
    margin-top: 5rem;
    text-align: center;

    .hero-header--text {
        margin-bottom: 1.5rem;
    }

    .hero-header--button {
        padding: 0.8rem;
        text-decoration: none;
        color: inherit;
        background-color: #333;
        color: white;
        border-radius: 0.2rem;
        font-size: .8rem;
    }
}

@media only screen and (max-width: 500px) {
    .hero-header {
        font-size: .8rem;

        .hero-header--text {
            margin-bottom: 1rem;
        }

        .hero-header--button {
            font-size: .6rem;
            padding: .6rem;
        }
    }
}

</style>