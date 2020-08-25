<template>
<div class="comment-item">
    <img class="comment-item__avatar" :src="cover">
    <div>
        <div class="comment-item__header">
            <div class="comment-item__author">{{ author }}</div>
            <div class="comment-item__date">{{ date }}</div>
        </div>
        <div class="comment-item__content">
            {{ content }}
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'CommentItem',
    props: [
        'cover', 'author', 'date', 'content'
    ],
    data() {
        return {

        }
    }
}
</script>

<style lang="scss">

.comment-item {
    display: flex;
    font-size: .9rem;

    &__avatar {
        width: 32px;
        height: 32px;
        border-radius: 100%;
        margin: 0 .6rem;
    }

    &__header {
        display: flex;
        margin-bottom: .2rem;
    }

    &__author {
        margin-right: .5rem;
    }

    &__date {

    }
}
    
</style>