<template>
    <div class="course-viewer">
        <div v-for="course in courses" :key="course.id" class="course-viewer__item">
            <CoursePreview 
                :title="course.name"  
                :cover="
                    course.cover_image ? 'data:' + course.cover_image_mime_type + ';base64,' + course.cover_image :
                    require('../assets/img/404.jpg')
                "
                :description="course.description"
                :url="'/course-player/' + course.id"
                :lessonsCount="course.lessons_count"
            >
            </CoursePreview>
            <div>
                <BaseButton v-if="$store.getters['auth/authenticated']" class="button" @click="$emit('enroll', course.id)">Enroll</BaseButton>
                <BaseButton v-else @click="redirectToLogin" class="button">Login to view course</BaseButton>
                <BaseButton @click="watchCourse(course.id)" class="button">Watch Course</BaseButton>
            </div>
        </div>  
    </div>
</template>

<script>
<<<<<<< HEAD
import BaseButton from '@/components/controls/BaseButton';
=======
import BaseButton from '@/components/base/BaseButton';
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
import CoursePreview from '@/components/CoursePreview';

export default {
    name: 'CoursePreviewList',
    props: [ 'courses' ],
    components: { CoursePreview, BaseButton },
    methods: {
        redirectToLogin() {
            this.$router.push('/login/courses');
        },

        watchCourse(courseId) {
            this.$router.push('/course-player/' + courseId);
        }
    }
}
</script>

<style lang="scss" scoped>
.course-viewer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .button {
        width: 100%;
        margin-top: .5rem;
    }

    .course-viewer__item {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @media only screen and (max-width: 500px) {
        .course-viewer__item {
            flex-basis: 100%;
        }
    }

    @media only screen and (min-width: 700px) {
        .course-viewer__item {
            flex-basis: 50%;
        }
    }

    @media only screen and (min-width: 900px) {
        .course-viewer__item {
            flex-basis: 33.33%;
        }
    }
}
</style>