<template>
<div class="c-comment-item">
    <div>
        <div class="c-comment-item__header">
            <img class="c-comment-item__avatar" :src="cover">
            <div class="c-comment-item__author">{{ author }}</div>
            <div class="c-comment-item__date">{{ date }}</div>
        </div>
        <div class="c-comment-item__content">
            {{ content }}
        </div>
        <div v-if="canLike" class="c-comment-item__reacts">
            <font-awesome-icon @click="$emit('like')" :class="['c-comment-item__icon', {'c-comment-item__icon--active':liked}]" :icon="['fas', 'heart']" />
            <span class="c-comment-item__count"> x{{ likes }} </span>
            <font-awesome-icon @click="$emit('dislike')" :class="['c-comment-item__icon', {'c-comment-item__icon--active':disliked}]" :icon="['fas', 'angry']" />
            <span class="c-comment-item__count"> x{{ dislikes }} </span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'CommentItem',
    props: [
        'cover', 'author', 'date', 'content', 'canLike', 'liked', 'disliked', 'likes', 'dislikes'
    ]
}
</script>

<style lang="scss">

.c-comment-item {
    display: flex;
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