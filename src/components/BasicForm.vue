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

    &__legend {
        padding: 1rem 0.75rem;
        color: white;
        font-size: 0.75rem;
        font-weight: bold;
        letter-spacing: 0.05rem;
        text-align: center;
        color: #555;
        font-size: 1.5rem;
        letter-spacing: 0.05rem;
        margin-bottom: 1.5rem;
        font-family: Roboto;
    }

    &__body {
        padding: 0 2rem 2rem 2rem;
    }
}
</style>