<template>
    <div class="like-dislike">
        <font-awesome-icon 
            @click="$emit('like')" 
            :class="['like-dislike__icon', {'like-dislike__icon--active':liked}]" 
            :icon="['fas', 'heart']" 
        />

        <span class="like-dislike__count"> x {{ likes }} </span>

        <font-awesome-icon 
            @click="$emit('dislike')" 
            :class="['like-dislike__icon', {'like-dislike__icon--active':disliked}]"  
            :icon="['fas', 'angry']" 
        />

        <span class="like-dislike__count"> x {{ dislikes }} </span>
    </div>
</template>

<script>
export default {
    name: 'LikeDislike',
    props: ['liked', 'disliked', 'likes', 'dislikes']
}
</script>

<style lang="scss">
.like-dislike {
    margin-left: .5rem;
    display: flex;
    align-items: center;
    
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