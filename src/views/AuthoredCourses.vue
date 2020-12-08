<template>
    <PageLoader v-if="!authoredCourses" text="Loading Enrolled Courses" />

    <div v-else class="enrolled-courses">
<<<<<<< HEAD
        
        <div class="align-center" v-if="authoredCourses.length == 0">
            You have no created course yet
        </div>

=======
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
        <div class="align-center mt-1rem mb-1rem">
            <BaseButton @click="createCourse">Create New Course</BaseButton>
        </div>

<<<<<<< HEAD
        <div v-if="authoredCourses.length != 0" class="flex">
=======
        <div class="align-center" v-if="authoredCourses.length == 0">
            You have no created course yet
        </div>

        <div v-else class="flex">
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
            <div v-for="course in authoredCourses" :key="course.id" class="flex__child">
                <CoursePreview
                    :title="course.name"  
                    :cover="course.cover_image ? 'data:' + course.cover_image_mime_type + ';base64,' + course.cover_image : require('../assets/img/404.jpg')"
                    :description="course.description"
                    :url="'/mycourses/course/' + course.id"
                    :lessonsCount="course.lessons_count"
                >
                    <BaseButton class="button mb-p5rem" @click="watchCourse(course.id)">Watch Course</BaseButton>
                    <BaseButton class="button mb-p5rem" @click="editCourse(course.id)">Edit Course</BaseButton>
                    <BaseButton class="button" @click="deleteCourse(course.id)">Delete</BaseButton>
                </CoursePreview>
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
import PageLoader from '@/components/PageLoader';
import CoursePreview from '@/components/CoursePreview';
import { mapState } from 'vuex';
import { addLessonCountToCourses } from '../includes/Helper';

export default {
    name: 'Home',
    components: {
        CoursePreview, BaseButton, PageLoader
    },
    data() {
      return {
            authoredCourses: null
        };
    },
    computed: {
         ...mapState({
            user: state => state.auth.user,
            apiUrl: state => state.server.apiUrl
        })
    },
    mounted() {
        this.fetchAuthoredCourses();
    },
    methods: {
        fetchAuthoredCourses() {
            window.axios.get(`${this.apiUrl}/users/${this.user.id}/authored-courses`)
            .then((response) => {
                this.authoredCourses = response.data.courses;
                addLessonCountToCourses(this.authoredCourses);
            })
            .catch( (error) => {
                console.log([error]);
            });
        },
        editCourse(courseId) {
            this.$router.push(`/edit-course/${courseId}`);
        },
        deleteCourse(courseId) {
<<<<<<< HEAD
            window.axios.delete(`${this.apiUrl}/courses/${courseId}`)
=======
            window.axios.delete(`${this.apiUrl}/users/${this.user.id}/authored-courses/${courseId}`)
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
            .then(() => {
                this.authoredCourses = null;
                this.fetchAuthoredCourses();
            })
            .catch( (error) => {
                console.log(error);
            });
        },
        createCourse() {
            this.$router.push('/create-course');
        },
        watchCourse(courseId) {
            this.$router.push('/course-player/' + courseId);
        }
    }
}
</script>

<style lang="scss" scoped>

<<<<<<< HEAD
.enrolled-courses {
    min-height: 90vh;
}

=======
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
.title {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    text-align: center;
    font-family: Roboto;
}

.flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .flex__child {
        flex-basis: 300px;
    }
}

.button {
    width: 100%;
}
    
</style>
