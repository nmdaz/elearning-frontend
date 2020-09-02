<template>
<PageLoader v-if="!course" text="Please wait white page is loading" />
<div v-else class="l-flex">
    <SlideFade>
        <div v-if="showSidebar" class="c-sidebar" ref="sidebar">

            <HeaderGroup 
                :src="'data:' + course.cover_image_mime_type + ';base64,' + course.cover_image" 
                :title="course.name" 
            />

            <div
                v-for="section in course.sections" :key="section.id"
                class="c-section"
            >

                <SectionHeader 
                    :counter="section.counter" 
                    :name="section.name"
                    :is-active="currentSection && section.id === currentSection.id"
                    @click="sectionClick(section)"
                />

                <SectionBody 
                    v-if="currentSection && currentSection.id === section.id"
                    :lessons = "section.lessons"
                    :current-lesson = "currentLesson"
                    @click="lessonClick"
                />

            </div>
        </div>
    </SlideFade>

    <div class="c-content">
        <div class="c-video">
            
        </div>

        <LessonControls :name="currentLesson.name"/>

        <div class="pd-1rem">
            <AddComment class="mb-1rem" v-if="authenticated" @submit="addComment" />

            <TextLink 
                v-else
                left-text="Please"
                src-text="Login"
                right-text="to add comments"
                class="mb-2rem"
                :src="{ name: 'Login', params: { redirect: $route.path  }}"
            />

            <CommentItem v-for="comment in currentLesson.comments" :key="comment.id"
                :author="comment.user_name"
                :date="comment.created_at"
                :cover="require('@/assets/img/cover-placeholder.jpg')"
                :content="comment.body"
                @like="isLiked(comment) ? unlikeComment(comment) :likeComment(comment)"
                @dislike="isDisliked(comment) ? unlikeComment(comment) :dislikeComment(comment)"
                :can-like="authenticated"
                :liked="authenticated ? isLiked(comment) : ''"
                :disliked="authenticated ? isDisliked(comment) : ''"
                :likes="comment.likes.length"
                :dislikes="comment.dislikes.length"
            />
        </div>
    </div>
</div>
</template>

<script>
import AddComment from '@/components/AddComment';
import CommentItem from '@/components/CommentItem';
import TextLink from '@/components/TextLink';
import { mapState, mapGetters } from 'vuex';
import SlideFade from '@/components/transitions/SlideFade'
import PageLoader from '@/components/PageLoader'

import HeaderGroup from '@/components/player/HeaderGroup'
import SectionHeader from '@/components/player/SectionHeader'
import SectionBody from '@/components/player/SectionBody'
import LessonControls from '@/components/player/LessonControls'

export default {
    name: 'CoursePlayer',
    components: {
        AddComment, CommentItem, TextLink, SlideFade, PageLoader, HeaderGroup, SectionHeader, SectionBody, LessonControls
    },
    data() {
        return {
            courseId: undefined,
            course: null,
            currentLesson: null,
            currentSection: null,
            showSidebar: true
        }
    },
    computed: {
        ...mapState({
            apiUrl: state => state.server.apiUrl,
            user: state => state.auth.user
        }),
        ...mapGetters('auth',[
            'authenticated'
        ])
    },
    mounted() {
        this.courseId = this.$route.params.courseId;
        this.fetchCourses();

        this.$store.state.navbar.showLeftToggler = true;

        this.$store.state.navbar.$on('toggleMenu', () => {
            this.showSidebar = !this.showSidebar;
        })
    },
    updated() {
        if (this.$refs.sidebar)
            this.$refs.sidebar.style.minHeight = (window.document.body.offsetHeight - this.$store.state.navbar.$el.offsetHeight) + 'px';
    },
    methods: {
        sectionClick(section) {
            if (!this.currentSection || this.currentSection.id !== section.id)
                this.currentSection = section;
            else
                this.currentSection = null;
        },

        lessonClick(lesson) {
            this.currentLesson = lesson;
        },

       async addComment(newComment) {
            try {
                const url = `${this.apiUrl}/lessons/${this.currentLesson.id}/comments`;
                await window.axios.post(url, { body: newComment });

                this.fetchCourses();
            }
            catch (error) {
                console.log(error);
            }    
        },

        async fetchCourses() {
            try {
                const url = `${this.apiUrl}/courses/${this.courseId}`;
                const response = await window.axios.get(url);

                this.course = response.data.course;
                this.currentLesson = this.course.sections[0].lessons[0];
                this.addCounterToLessons(this.course);

                console.log(this.course.sections[0].lessons[0].comments[0]);
            }
            catch (error) {
               console.log([error]);
            }
        },

        addCounterToLessons(course) {
            let sectionCounter = 0;
            let lessonCounter = 0;
            course.sections.forEach( (section) => {
                section.counter = sectionCounter += 1;
                section.lessons.forEach( (lesson) => {
                    lesson.counter = lessonCounter += 1;
                })
            })
        },

        async likeComment(comment) {
            try {
                await window.axios.post(`${this.apiUrl}/comments/${comment.id}/like`);
                this.fetchCourses();
            }
            catch (error) {
                console.log(error);
            }
        },

        async dislikeComment(comment) {
            try {
                await window.axios.post(`${this.apiUrl}/comments/${comment.id}/dislike`);
                this.fetchCourses();
            }
            catch (error) {
                console.log(error);
            }
        },

        async unlikeComment(comment) {
            try {
                await window.axios.post(`${this.apiUrl}/comments/${comment.id}/unlike`);
                this.fetchCourses();
            }
            catch (error) {
                console.log(error);
            }
        },

        isLiked(comment) {
            let isLiked = false;

            comment.likes.forEach( (like) => {
                if (like.user_id === this.user.id) isLiked  = true;
            })

            return isLiked;
        },

        isDisliked(comment) {
            let isDisliked = false;

            comment.dislikes.forEach( (dislike) => {
                if (dislike.user_id === this.user.id) isDisliked  = true;
            })

            return isDisliked;
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@/css/_mixin.scss';

.c-sidebar {
    min-width: 350px;
    max-width: 350px;
    width: 350px;
    height: 100vh;
    background-color: #fff;
    box-shadow: 1px 17px 6px 0px;

    @include for-tablet-down() {
        position: absolute;
        z-index: 10;
    }
}


.c-section {
    padding: .5rem;
    color: #444;
    border-bottom: 1px solid #38bb8e;
}

.c-content {
    width: 100%;
}

.c-video {
    background-color: black;
    height: 400px;
    width: 100%;
}




</style>