<template>
<div class="c-header-group">
    <img class="c-header-group__img" :src="src">
    <h2 class="c-header-group__title">{{ title }}</h2>
</div>
</template>

<script>
export default {
	name: 'HeaderGroup',
	props: [ 'src', 'title']
}
</script>

<style lang="scss" scoped>
.c-header-group {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #38bb8e;
    padding: .5rem .5rem;
    width: 100%;

    &__img {
        width: 42px;
        height: 42px;
        flex-shrink: 0;
        border-radius: 100%;
        padding: .5rem;
    }

    &_title {
        font-size: 1.2rem;
        margin-top: 0.5rem;
        color: #1a9c4e;
    }
}
</style>