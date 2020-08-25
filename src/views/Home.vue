<template>
<div class="home-view">   

    <div class="title">Your Courses</div>

    <div class="flex">
        <div v-for="course in courses" :key="course.id" class="flex__child">
            <CoursePreview 
                :title="course.name"  
                :cover="'data:' + course.cover_image_mime_type + ';base64,' + course.cover_image"
                :description="course.description"
                :url="'/mycourses/course/' + course.id"
            />
        </div>
    </div>

</div>
</template>

<script>
import CoursePreview from '@/components/CoursePreview';
import { mapState } from 'vuex';

export default {
    name: 'Home',
    components: {
        CoursePreview
    },
    data() {
      return {
            courses: null
        };
    },
    computed: {
         ...mapState({
            user: state => state.auth.user,
            apiUrl: state => state.auth.apiUrl
        })
    },
    mounted() {
        window.axios.get(`${this.apiUrl}/users/${this.user.id}/courses`)
        .then((response) => {
            let courses = response.data.courses;
            this.courses = courses;
        })
        .catch( (error) => {
            console.log(error);
            // if (error) {
            //     this.$store.commit('logout');
            //     this.$router.push({ name: 'Login' });
            // }
        });
    }
}
</script>

<style lang="scss">


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
    
</style>
