<template>
    <form class="basic-form" @submit.prevent="$emit('submit', $event.target.value)">
        <legend v-if="legend" class="basic-form__legend">{{ legend }}</legend>
        <div class="basic-form__body">
            <slot></slot>
        </div>
    </form>
</template>

<script>
export default {
    name: 'BasicForm',
    props: [ 'legend' ]
}   
</script>

<style lang="scss" scoped>
.basic-form {
    max-width: 500px;
    margin: auto;
    box-shadow: #00000021 1px 1px 3px 0px;

    &__legend {
        background-color: #38bb8e;
        padding: 1rem 0.75rem;
        color: white;
        font-size: 0.75rem;
        font-weight: bold;
        letter-spacing: .05rem;
    }

    &__body {
        padding: 2rem;
    }
}
</style>