<template>
<div v-if="course" class="course-viewer">
    <div class="course-viewer__controls">
        <h2 class="course-viewer__title">{{ course.name }}</h2>

        <div class="course-viewer__section" v-for="section in course.sections" :key="section.id">
            <h3 class="course-viewer__section-name">{{ section.name }}</h3>

            <div v-bind:class="['course-viewer__lesson', { active: lesson.id == currentLesson.id }]" v-for="lesson in section.lessons" :key="lesson.id">
                <p @click="lessonClick(lesson)" class="course-viewer__lesson-name">{{ lesson.name }}</p>
            </div>

        </div>
    </div>

    <div class="lesson-viewer">
        <video class="lesson-viewer__video" controls>
            <source src="https://video.xx.fbcdn.net/v/t42.9040-2/118222047_2842340399330811_3521705405993489946_n.mp4?_nc_cat=102&_nc_sid=985c63&efg=eyJ2ZW5jb2RlX3RhZyI6ImxlZ2FjeV9zZCJ9&_nc_eui2=AeE31RNGdaG71jc749P4eC9iZz4CQ4pCfCBnPgJDikJ8IHcsUdaN8GdjbbADrZWl34omEKCVTWClWs2PPc5UN7Sj&_nc_ohc=Gj3CBG61xqEAX_0Nsqa&_nc_ht=video.fmnl6-1.fna&oh=be01134d768ecf01246c697da71dfbcd&oe=5F43DC18" type="video/mp4">
        </video>
        <div v-if="currentLesson" class="lesson-viewer__info">
            <h3 class="lesson-viewer__name">{{ currentLesson.name }}</h3>
            <p class="lesson-viewer__description">{{ currentLesson.description }}</p>
        </div>
        <div class="lesson-viewer__comments">   
            <AddComment @submit="addComment" />
            <div v-for="comment in currentLesson.comments" :key="comment.id">
                <CommentItem
                    :author="comment.user_name"
                    :date="comment.created_at"
                    :cover="require('@/assets/img/cover-placeholder.jpg')"
                    :content="comment.body"
                />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CommentItem from '@/components/CommentItem';
import AddComment from '@/components/AddComment';
import { mapState } from 'vuex';

export default {
    components: {
        CommentItem,
        AddComment
    },
    name: 'UserCourse',
    data() {
        return {
            courseId: undefined,
            course: null,
            currentLesson: null,
        }
    },
    computed: {
        ...mapState({
            apiUrl: state => state.server.apiUrl,
            user: state => state.auth.user
        }),
    },
    methods: {
        lessonClick(lesson) {
            this.currentLesson = lesson;
        },
       async addComment(newComment) {

            try {
                const url = `${this.apiUrl}/lessons/${this.currentLesson.id}/comments`;
                window.axios.post(url, { body: newComment });

                this.fetchCourses();
            }
            catch (error) {
                console.log(error);
            }    
        },

        async fetchCourses() {
            try {
                const url = `${this.apiUrl}/users/${this.user.id}/courses/${this.courseId}`;
                const response = await window.axios.get(url);
                this.course = response.data.course;
                this.currentLesson = this.course.sections[0].lessons[0];
            }
            catch (error) {
               console.log(error);
            }
        }
    },
    mounted() {
        this.courseId = this.$route.params.id;
        this.fetchCourses();
    }
}
</script>

<style lang="scss">

.comment-item {
    margin-bottom: 1rem;
}

.course-viewer {
    display: flex;

    &__controls {
        letter-spacing: 0.01rem;
        font-family: Roboto;
        padding: 0.5rem;
        max-width: 300px;
        min-height: 100vh;
        background-color: #fff;
        box-shadow: 1px 17px 6px 0px;
        color: #00000061;

        @media only screen and (max-width: 800px) {
            display: none;
        } 
    }
    

    &__title {
        font-size: 1.2rem;
        margin-top: .5rem;
        margin-bottom: 1rem;
        color: #1a9c4e;
    }

    &__section {
        margin-bottom: 1rem;
        color: #444;

        .course-viewer__section-name {
            margin-bottom: .5rem;
            font-size:  .9rem;
        }

        .course-viewer__lesson {
            font-size:  .85rem;
            margin-bottom:  .5rem;
        }
    }

    &__lesson {
        font-size: .9rem;
        margin-bottom: .2rem;

        
    }

    .active:before {
        content: 'Playing Now';
        font-size: .7rem;
    }

    .active {
        padding: 0.2rem;
        background-color: #1a9c4e;
        color: white;
    }

    &__lesson-name {
        cursor: pointer;
    }
}

.lesson-viewer {
    width: 100%;

    &__info {
        padding: 1rem;
    }

    &__video {
        background-color: black;
        height: 400px;
        width: 100%;
    }

    &__name {
        margin-bottom: .4rem;
    }

    &__comments {
        padding: 1rem;
    }
}

</style>