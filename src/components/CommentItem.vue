<template>
<div class="comment-item">
    <div class="comment-item__header">
        <img class="comment-item__avatar" :src="cover">
        <div class="comment-item__author">{{ author }}</div>
        <div class="comment-item__date">{{ date }}</div>
    </div>

    <div class="comment-item__content">
        {{ content }}
    </div>
    
    

    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'CommentItem',
    props: [
        'cover', 'author', 'date', 'content'
    ]
}
</script>

<style lang="scss">

.comment-item {
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
}
    
</style>