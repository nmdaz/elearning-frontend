<template>
<div :class="['navigation-bar', { 'navigation-bar--transparent': transparentMode }]">
    <div v-if="showLeftToggler"  @click="$emit('toggleMenu')" class="navigation-bar__menu-toggler">
        <font-awesome-icon :icon="['fas', 'list']" />
    </div>
    <div class="navigation-bar__brand">
        <router-link class="navigation-bar__brand-link" to="/">
            <font-awesome-icon :icon="['fas', 'book-reader']" />
        </router-link>
    </div>
    <div @click="toggleLinks" class="navigation-bar__toggler navigation-bar__toggler--hidden">
        <font-awesome-icon :icon="['fas', 'bars']" />
    </div>
    <ul v-bind:class="{ 'navigation-bar__link-list': true, 'navigation-bar__link-list--show': showLinks }">
        <li class="navigation-bar__item">
            <router-link class="navigation-bar__link" to="/courses">FIND COURSES</router-link>
        </li>
        <li v-if="authenticated" class="navigation-bar__item">
            <router-link class="navigation-bar__link" to="/home">HOME</router-link>
        </li>
        <li v-if="!authenticated" class="navigation-bar__item">
            <router-link class="navigation-bar__link" to="/login">LOGIN</router-link>
        </li>
        <li v-if="!authenticated" class="navigation-bar__item">
            <router-link class="navigation-bar__link" to="/register">REGISTER</router-link>
        </li>
        <li v-if="authenticated" class="navigation-bar__item">
            <router-link class="navigation-bar__link" to="/logout">LOGOUT</router-link>
        </li>
    </ul>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'navigation-bar',
    data() {
        return {
            showLinks: false,
            showLeftToggler: false,
            transparentMode: false
        }
    },
    methods: {
        toggleLinks() {
            this.showLinks = !this.showLinks;
        },

        trans(transparentMode = true) {
            this.transparentMode = transparentMode;
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated'
        })
    },
    mounted() {
        this.$store.state.navbar = this;
        this.showLeftToggler = false;
    }
}
</script>

<style lang="scss" scoped>
@import '@/css/_mixin.scss';

.navigation-bar {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: white;
    color: #cccaca;
    font-size: 0.8rem;
    position: relative;
    align-items: center;
    z-index: 100;
    border-bottom: 1px solid #e2dfdf;
    font-weight: bold;

    &__brand {
        font-size: 2rem;
        color: #38bb8e;
    }

    &__toggler, &__menu-toggler {
        cursor: pointer;
        color: #38bb8e;
        font-size: 2rem;
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
        margin-right: 1rem;
    }

    &__link {
        color: #38bb8e;
    }

    .router-link-active {
        color: #38bb8e;
        font-weight: bold;
    }
}

.navigation-bar--transparent {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    background-color: transparent;
    box-shadow: none;

    .navigation-bar {
        &__link {
            color: #38bb8e;
        }
    }
}

@include for-tablet-down {
    .navigation-bar {
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