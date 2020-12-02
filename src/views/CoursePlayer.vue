<template>

<PageLoader v-if="!course" text="Please wait white page is loading" />

<div v-else-if="!currentLesson" class="no-lesson"> This course has no lesson</div>

<div v-else class="l-flex">
    <SlideFade>
        <div v-if="showSidebar" class="sidebar" ref="sidebar">

            <HeaderGroup 
                :src="'data:' + course.cover_image_mime_type + ';base64,' + course.cover_image" 
                :title="course.name" 
            />

            <div
                v-for="section in course.sections" :key="section.id"
                class="section"
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

    <div v-if="!this.currentLesson" class="content">This course has no lesson</div>

    <div v-else class="content">
        <div class="video">
            <iframe width="100%" height="100%" :src="'//www.youtube.com/embed/' + currentLesson.video_id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <LessonControls :name="currentLesson.name"/>

        <div class="pd-1rem">
            <AddComment class="mb-1rem" v-if="authenticated" @submit="addComment" />

            <TextLink 
                v-else
                left-text="Please"
                srtext="Login"
                right-text="to add comments"
                class="mb-2rem"
                srcText="Login"
                :src="{ name: 'Login', params: { redirect: $route.path  }}"
            />

            <CommentItem 
                v-for="comment in currentLesson.comments" 
                :key="comment.id"
                :ref="'commentItem' + comment.id"
                :author="comment.user_name"
                :date="comment.created_at"
                :cover="require('@/assets/img/cover-placeholder.jpg')"
                :content="comment.body"
                
            >

                <div class="l-flex">
                    <LikeDislike
                        v-if="authenticated"
                        :liked="isLiked(comment)"
                        :disliked="isDisliked(comment)"
                        :likes="comment.likes.length"
                        :dislikes="comment.dislikes.length"
                        @like="isLiked(comment) ? unlikeComment(comment) : likeComment(comment)"
                        @dislike="isDisliked(comment) ? unlikeComment(comment) : dislikeComment(comment)"
                    />

                    <div class="course-player__add-reply" @click="reply(comment)">Reply</div>
                </div>

                <NewReply 
                    v-if="newReplyComment == comment" 
                    class="course-player__new-reply" 
                    @submit="submitReply"
                    @cancel="cancelReply"
                />

                <ReplyItem 
                    v-for="reply in comment.replies" 
                    class="course-player__reply-item" 
                    :key="reply.id"
                    :avatar="require('@/assets/img/cover-placeholder.jpg')"
                    :author="reply.user.name"
                    :date="reply.created_at"
                    :content="reply.body"
                />
            </CommentItem>
        </div>
    </div>
</div>

</template>

<script>
import AddComment from '@/components/AddComment';
import CommentItem from '@/components/CommentItem';
import TextLink from '@/components/TextLink';
import SlideFade from '@/components/transitions/SlideFade';
import PageLoader from '@/components/PageLoader';
import HeaderGroup from '@/components/player/HeaderGroup';
import SectionHeader from '@/components/player/SectionHeader';
import SectionBody from '@/components/player/SectionBody';
import LessonControls from '@/components/player/LessonControls';
import NewReply from '@/components/player/NewReply';
import ReplyItem from '@/components/player/ReplyItem';
import LikeDislike from '@/components/player/LikeDislike';

import { mapState, mapGetters } from 'vuex';

export default {
    name: 'CoursePlayer',
    components: {
        AddComment, 
        CommentItem, 
        TextLink, 
        SlideFade, 
        PageLoader, 
        HeaderGroup, 
        SectionHeader, 
        SectionBody, 
        LessonControls,
        NewReply,
        ReplyItem,
        LikeDislike
    },
    data() {
        return {
            courseId: undefined,
            course: null,
            currentLesson: null,
            currentSection: null,
            showSidebar: true,
            showNewReply: false,
            newReplyComment: null
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
    async mounted() {
        this.courseId = this.$route.params.courseId;

        await this.fetchCourses();

        if (this.currentLesson) {            
            this.$store.state.navbar.showLeftToggler = true;

            this.$store.state.navbar.$on('toggleMenu', () => {
                this.showSidebar = !this.showSidebar;
            })   
        }         
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

                if (!this.course.sections || !this.course.sections.lessons) {
                    this.currentLesson = null;
                }
                else {
                    this.currentLesson = this.course.sections[0].lessons[0];
                    this.addCounterToLessons(this.course);
                }
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

        reply(comment) {
            this.newReplyComment = comment;
        },

        async submitReply(reply) {
            let url = `${this.apiUrl}/comments/${this.newReplyComment.id}/replies`;

            try {
                await window.axios.post(url, { body: reply });
                this.newReplyComment = null;
                this.fetchCourses();
            }
            catch (errors) {
                console.log([errors]);
            }
            
        },

        cancelReply() {
            this.newReplyComment = null;
        },

        getId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            return (match && match[2].length === 11)
              ? match[2]
              : null;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/css/_mixin.scss';

.course-player {
    &__reply-item {
        margin-left: 1rem;
        margin-top: .5rem;
    }

    &__add-reply {
        font-size: .7rem;
        cursor: pointer;
    }
}

.sidebar {
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


.section {
    padding: .5rem;
    color: #444;
    border-bottom: 1px solid #38bb8e;
}

.content {
    width: 100%;
}

.video {
    background-color: black;
    height: 400px;
    width: 100%;
}

.no-lesson {
    text-align: center;
    margin-top: 10%;
}

</style>