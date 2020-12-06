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
    border-bottom: none;
    width: 100%;
    background-color: #38bb8e;
    padding: .5rem;

    &__img {
        width: 64px;
        height: 64px;
        flex-shrink: 0;
        padding: 0;
        margin-right: .5rem;
        border-radius: 100%;
    }

    &__title {
        font-size: 1rem;
        color: white;
    }
}
</style>