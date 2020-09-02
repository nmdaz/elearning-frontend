<template>
    <div class="course-viewer">
        <div v-for="course in courses" :key="course.id" class="course-viewer__item">
            <CoursePreview 
                :title="course.name"  
                :cover="'data:' + course.cover_image_mime_type + ';base64,' + course.cover_image"
                :description="course.description"
                :url="'/course-player/' + course.id"
            />
        </div>
    </div>
</template>

<script>
import CoursePreview from '@/components/CoursePreview';

export default {
    name: 'CourseViewer',
    props: [ 'courses' ],
    components: { CoursePreview }
}
</script>

<style lang="scss" scoped>
.course-viewer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .course-viewer__item {
        padding: 1rem;
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