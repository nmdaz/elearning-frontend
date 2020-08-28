<template>
<div class="navbar">
    <div class="navbar__brand">
        <router-link class="navbar__link" to="#">Elearning</router-link>
    </div>
    <div @click="toggleLinks" class="navbar__toggler navbar__toggler--hidden">
        =
    </div>
    <ul v-bind:class="{ 'navbar__link-list': true, 'navbar__link-list--show': showLinks }">
        <li class="navbar__item">
            <router-link class="navbar__link" to="/about">About</router-link>
        </li>
        <li class="navbar__item">
            <router-link class="navbar__link" to="/contact">Contact</router-link>
        </li>
        <li v-if="!authenticated" class="navbar__item">
            <router-link class="navbar__link" to="/login">Login</router-link>
        </li>
        <li v-if="!authenticated" class="navbar__item">
            <router-link class="navbar__link" to="/register">Register</router-link>
        </li>
        <li v-if="authenticated" class="navbar__item">
            <router-link class="navbar__link" to="/logout">Logout</router-link>
        </li>
    </ul>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

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
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated'
        })
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: white;
    color: #cccaca;
    font-size: 0.9rem;
    box-shadow: 1px 1px 5px 0px;

    &__toggler {
        cursor: pointer;
        color: #806f6f;
    }

    &__toggler--hidden {
        display: none;
    }

    &__link-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    &__item {
        margin-right: .5rem;
    }

    &__link {
        color: #806f6f;
    }
}

@media screen and (max-width: 500px) {
    .navbar {
        &__toggler {
            display: block;
        }

        &__link-list {
            display: none;
        }

        &__link-list--show {
            flex-basis: 100%;
            display: flex;
            flex-direction: column;
            margin-top: .8rem;
            border-top: 1px solid #DDD;            
        }

        &__item {
            margin-top: .8rem;
        }
    }
}

</style>