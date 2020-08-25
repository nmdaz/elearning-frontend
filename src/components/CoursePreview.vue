<template>
    <div class="course-preview">
        <img 
            class="course-preview__cover" 
            :src="cover"
        >

        <router-link 
            class="course-preview__title" 
            :to="url"
        >
            {{ title }}
        </router-link>

        <div class="course-preview__text">{{ description }}</div>
    </div>
</template>

<script>
export default {
    name: 'CoursePreview',
    props: [
        'title', 'cover', 'description', 'url'
    ],
    data() {
        return {

        }
    }
}
</script>

<style lang="scss">
.course-preview {

    padding: .5rem;

    .course-preview__cover {
        width: 100%;
        margin-bottom: .5rem;
    }

    .course-preview__title {
        font-size: 1.2rem;
        display: block;
        margin-bottom: .2rem;
        text-decoration: none;
        color: inherit;
    }

    .course-preview__text {
        font-size: .9rem;
    }
}
</style>