<template>
<div class="c-comment-item">
    <div class="c-comment-item__header">
        <img class="c-comment-item__avatar" :src="avatar">
        <div class="c-comment-item__author">{{ author }}</div>
        <div class="c-comment-item__date">{{ date }}</div>
    </div>

    <div class="c-comment-item__content">
        {{ content }}
    </div>
</div>
</template>

<script>
export default {
    name: 'CommentItem',
    props: [
        'avatar', 'author', 'date', 'content'
    ]
}
</script>

<style lang="scss">

.c-comment-item {
    margin-bottom: 1rem;
    border: 1px solid #DDD;
    padding: 1rem;

    &__header {
        display: flex;
        margin-bottom: 0.2rem;
        align-items: center;
    }

    &__avatar {
        width: 32px;
        height: 32px;
        border-radius: 100%;
        margin-right: .5rem;    
    }

    &__author {
        font-size: .8rem;
        margin-right: .5rem;
    }

    &__date {
        font-size: .6rem;
    }

    &__content {
        padding: 0 1rem;
        margin-bottom: .5rem;
    }

    &__reacts {
        margin-left: .5rem;
        display: flex;
        align-items: center;
    }

    &__icon {
        color: #AAA;
        margin-right: .2rem;
        cursor: pointer;
    }

    &__icon--active {
        color: #2162c3;
    }

    &__count {
        margin-right: .5rem;
        font-size:  .6rem;
    }
}
    
</style>