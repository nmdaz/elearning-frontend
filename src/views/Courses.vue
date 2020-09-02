<template>
    <div v-if="courses">
        <CourseViewer :courses="courses" />
    </div>
    <div v-else>
        Loading Courses Please Wait...
    </div>
</template>

<script>
import CourseViewer from '@/components/CourseViewer';
import { mapState } from 'vuex';

export default {
    name: 'Courses',
    components: { CourseViewer },
    data() {
        return {
            courses: null
        }
    },
    computed: {
        ...mapState({
            apiUrl: state => state.server.apiUrl
        })
    },
    mounted() {
        this.fetchCourses();
    },
    methods: {
        async fetchCourses() {
            try {
                const url = `${this.apiUrl}/courses?preview=1`;
                const response = await window.axios.get(url);

                this.courses = response.data.courses;
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}   
</script>