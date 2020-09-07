<template>
<div class="add-comment">
    <div class="add-comment__content">
        <img class="add-comment__avatar" src="@/assets/img/cover-placeholder.jpg" width="32px">
        <form class="add-comment__form" @submit.prevent="submit">
            <input class="add-comment__input" type="text" name="newComment" v-model="newComment">
        </form>
    </div>
    <div class="add-comment__controls">
        <Button class="add-comment__button" text="Cancel" @click="cancel" />
        <Button class="add-comment__button" text="Comment" @click="submit" />
    </div>
</div>
</template>

<script>
import Button from '@/components/Button';

export default {
    name: 'AddReply',
    data() {
        return {
            newComment: ''
        }
    },
    components: {
        Button
    },
    methods: {
        submit() {
            this.$emit('submit', this.newComment);
            this.newComment = '';
        },
        cancel() {
            this.newComment = '';
        }
    }
}
</script>

<style lang="scss" scoped>
.add-comment {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &__content {
        display: flex;
        width: 100%;
    }

    &__avatar {
        width: 32px;
        height: 32px;
        margin: .5rem;
        border-radius: 100%;
    }

    &__form {
        width: inherit;
        padding: .5rem;
    }

    &__input {
        padding: .5rem;
        border-width: 0 0 1px 0;
        width: 100%;
    }

    &__controls {
        width: 100%;
        text-align: right;
    }

    &__button {
        margin-right: 1rem;
    }
}
</style>