<template>
    <div class="message-box">
        <div class="message-box__title">
            {{ title }}
        </div>

        <div class="message-box__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageBox',
    props: [ 'title' ]
}
</script>

<style lang="scss" scoped>
.message-box {
    text-align: center;
    width: fit-content;
    height: fit-content;
    margin: auto;
    background-color: #ea6565;
    font-family: Roboto;
    box-shadow: 1px 1px 3px 1px;
    color: #0000005e;

    &__title {
        text-align: left;
        background-color: #333;
        padding: .5rem;
        color: white;
    }

    &__body {
        padding: 1rem;
        background-color: white;
        color: #333;
        font-size: .9rem;
    }
}
</style>

