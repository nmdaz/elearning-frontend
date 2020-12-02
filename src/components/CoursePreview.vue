<template>
    <div class="course-preview">
        <img class="course-preview__cover" :src="cover">
        <h2 class="course-preview__title">{{ title }}</h2>
        <div class="course-preview__text">
            <div class="mb-p5rem"> {{ description }} </div>
            <div> Lessons: {{ lessonsCount  }} </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'CoursePreview',
    props: [ 'title', 'cover', 'description', 'url', 'lessonsCount' ]
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