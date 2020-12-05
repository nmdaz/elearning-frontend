<template>
    <PageLoader v-if="!courses" text="Loading Courses">
        Loading Courses Please Wait...
    </PageLoader>

    <FullPageText v-else-if="courses.length === 0" text="No Course Available" />

    <div v-else>
        <CoursePreviewList :courses="courses" @enroll="enroll" />

        <div class="paginator-controls">
            <button 
                class="mr-p5rem"
                @click="previousPage" 
                :disabled="paginator.currentPage == 1"
            >
                Prev
            </button>

            <button 
                class="mb-1rem" 
                @click="nextPage" 
                :disabled="paginator.currentPage == paginator.lastPage"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script>
import PageLoader from '@/components/PageLoader.vue';
import CoursePreviewList from '@/components/CoursePreviewList';
import FullPageText from '@/components/FullPageText';
import { mapState } from 'vuex';
import { addLessonCountToCourses } from '../includes/Helper';

export default {
    name: 'Courses',
    components: { CoursePreviewList, PageLoader, FullPageText },
    data() {
        return {
            courses: null,
            coursesUrl: undefined,
            paginator: {
                currentPage: undefined,
                lastPage: undefined
            }
        }
    },
    computed: {
        ...mapState({
            apiUrl: state => state.server.apiUrl,
            user: state => state.auth.user
        })
    },
    mounted() {
        // dont show courses authored by user
        if (this.$store.getters['auth/authenticated']) this.coursesUrl = `${this.apiUrl}/users/${this.user.id}/not-enrolled-courses`;
        else this.coursesUrl = `${this.apiUrl}/courses`;

        this.fetchCourses();
    },
    methods: {
        async fetchCourses() {
            try {
                const response = await window.axios.get(this.coursesUrl);

                this.courses = response.data.courses;

                addLessonCountToCourses(this.courses);

                this.paginator.currentPage = response.data.meta.current_page;
                this.paginator.lastPage = response.data.meta.last_page;
            }
            catch (error) {
                console.log(error);
            }
        },

        async enroll(id) {
            try {
                const url = `${this.apiUrl}/users/${this.user.id}/enrolled-courses/${id}`;
                await window.axios.post(url);

                this.$router.push({ name: 'EnrolledCourses' });
            }
            catch (error) {
                console.log(error);
            }
        },

        async nextPage() {
            let nextPage = this.paginator.currentPage + 1;

            if (nextPage > this.paginator.lastPage) return; 

            try {
                const url = `${this.coursesUrl}?page=${nextPage}`;
                const response = await window.axios.get(url);

                console.log(response);

                this.courses = response.data.courses;
                addLessonCountToCourses(this.courses);

                this.paginator.currentPage = response.data.meta.current_page;
                this.paginator.lastPage = response.data.meta.last_page;
            }
            catch (error) {
                console.log(error);
            }
        },

        async previousPage() {
            let previousPage = this.paginator.currentPage - 1;

            if (previousPage < 1) return; 

            try {
                const url = `${this.coursesUrl}?page=${previousPage}`;
                const response = await window.axios.get(url);

                this.courses = response.data.courses;
                addLessonCountToCourses(this.courses);

                this.paginator.currentPage = response.data.meta.current_page;
                this.paginator.lastPage = response.data.meta.last_page;
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}   
</script>

<style lang="scss">
.paginator-controls {
    position: absolute;
    margin: auto;
    width: 100%;
    bottom: 10px;
    text-align: center;
}
</style>