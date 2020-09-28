<template>
    <div class="course-preview">
        <img class="course-preview__cover" :src="cover">

        <router-link class="course-preview__title" :to="url">
            {{ title }}
        </router-link>

        <div class="course-preview__text">{{ description }}</div>

        <router-link :to="url">
            <BaseButton> Watch Now </BaseButton>
        </router-link>
    </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton';
export default {
    name: 'CoursePreview',
    props: [
        'title', 'cover', 'description', 'url'
    ],
    components: { BaseButton }
}
</script>

<style lang="scss">
.course-preview {

    padding: .5rem;

    .course-preview__cover {
        width: 100%;
        margin-bottom: 1rem;
    }

    .course-preview__title {
        font-size: 1.2rem;
        display: block;
        margin-bottom: .5rem;
        text-decoration: none;
        color: #008051;
        letter-spacing: .02rem;
    }

    .course-preview__text {
        font-size: .9rem;
        margin-bottom: 1rem;
    }
}
</style>