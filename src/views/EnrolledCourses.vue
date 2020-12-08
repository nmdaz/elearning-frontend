<template>

    <PageLoader v-if="!enrolledCourses" text="Loading Enrolled Courses" />

    <div class="no-enrolled" v-else-if="enrolledCourses.length == 0">
        You are not enrolled to any course
        <ButtonLink class="mx-auto d-block mt-1rem" url="/courses">Find Course</ButtonLink>
    </div>

    <div v-else class="enrolled-courses">
        <div class="title">Your Enrolled Courses</div>

        <div class="flex">
            <div v-for="course in enrolledCourses" :key="course.id" class="flex__child">
                <CoursePreview
                    :title="course.name"  
                    :cover="course.cover_image ? 'data:' + course.cover_image_mime_type + ';base64,' + course.cover_image : require('../assets/img/404.jpg')"
                    :description="course.description"
                    :url="'/mycourses/course/' + course.id"
                    :lessonsCount="course.lessons_count"
                >

                    <BaseButton class="mb-p5rem" @click="watchCourse(course.id)">Watch Now</BaseButton>
                    <BaseButton @click="unenrollCourse(course.id)">Drop Course</BaseButton>

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
import ButtonLink from '@/components/ButtonLink'
import PageLoader from '@/components/PageLoader';
import CoursePreview from '@/components/CoursePreview';
import { mapState } from 'vuex';
import { addLessonCountToCourses } from '../includes/Helper';

export default {
    name: 'Home',
    components: {
        CoursePreview, BaseButton, PageLoader, ButtonLink
    },
    data() {
      return {
            enrolledCourses: null
        };
    },
    computed: {
         ...mapState({
            user: state => state.auth.user,
            apiUrl: state => state.server.apiUrl
        })
    },
    mounted() {
        this.fetchEnrolledCourses();
    },
    methods: {
        fetchEnrolledCourses() {
            window.axios.get(`${this.apiUrl}/users/${this.user.id}/enrolled-courses`)
            .then((response) => {
                this.enrolledCourses = response.data.courses;
                addLessonCountToCourses(this.enrolledCourses);
            })
            .catch( (error) => {
                console.log(error);
            });
        },
        watchCourse(courseId) {
            this.$router.push(`/course-player/${courseId}`);
        },
        unenrollCourse(courseId) {
            window.axios.delete(`${this.apiUrl}/users/${this.user.id}/enrolled-courses/${courseId}`)
            .then(() => {
                this.enrolledCourses = null;
                this.fetchEnrolledCourses();
            })
            .catch( (error) => {
                console.log(error);
            });
        }
    }
}
</script>

<style lang="scss" scoped>

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

.no-enrolled {
    margin-top: 10%;
    text-align: center;
<<<<<<< HEAD
    min-height: 90vh;
=======
>>>>>>> 339aa70e3233414930c9d0554896727f10200f32
}
    
</style>
