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
    width: 100%;
    background-color: #38bb8e;

    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: none;
    width: 100%;
    background-color: #38bb8e;

    &__img {
        width: 100px;
        height: 100px;
        flex-shrink: 0;
        padding: .5rem;

        width: 100px;
        height: 100px;
        flex-shrink: 0;
        padding: 0;
    }

    &__title {
        font-size: 1rem;
        margin-top: 0.5rem;
        color: white;
        padding: .25rem;
    }
}
</style>