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
    name: 'CourseForm',
    props: [ 'legend' ]
}   
</script>

<style lang="scss" scoped>
.basic-form {
    min-width: 350px;
    max-width: 500px;
    margin: auto;
    box-shadow: 1px 1px 4px 1px;
    color: #0e0e0e5c;
    border-radius: .2rem;

    &__legend {
        background-color: #38bb8e;
        padding: 1rem 0.75rem;
        color: #434c42;
        font-size: 0.8rem;
        border-top-left-radius: .2rem;
        border-top-right-radius: .2rem;
        font-weight: bold;
    }

    &__body {
        padding: 2rem;
    }
}
</style>