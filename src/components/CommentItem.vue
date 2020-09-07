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
    
    <div v-if="canLike" class="comment-item__reacts">
        <font-awesome-icon 
            @click="$emit('like')" 
            :class="['comment-item__icon', {'comment-item__icon--active':liked}]" 
            :icon="['fas', 'heart']" 
        />

        <span class="comment-item__count"> x {{ likes }} </span>

        <font-awesome-icon 
            @click="$emit('dislike')" 
            :class="['comment-item__icon', {'comment-item__icon--active':disliked}]" 
            :icon="['fas', 'angry']" 
        />

        <span class="comment-item__count"> x{{ dislikes }} </span>

        <div class="comment-item__add-reply" @click="$emit('reply')">Reply</div>
    </div>

    <slot></slot>
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

    &__add-reply {
        font-size: .7rem;
        cursor: pointer;
    }
}
    
</style>