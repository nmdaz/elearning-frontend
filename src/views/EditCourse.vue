<template>
    <PageLoader v-if="loading || !course" />

    <ConfirmationBox 
        v-else-if="deleteSectionId"
        class="edit-course__confirmation-box"
        message="Are you sure you want to delete?"
        @confirm="deleteSection(deleteSectionId)"
        @cancel="cancelDeleteSection"
    />

    <BasicForm v-else-if="newSection" @submit="saveSection" legend="New Section">
        <InputGroup 
            label="Section Name"
            v-model="newSection.name"
            :error="newSection.errors ? newSection.errors.name[0] : ''"
        />
        <BaseButton class="edit-course__button"  type="submit">Save Section</BaseButton> 
        <BaseButton class="edit-course__button"  @click="cancelNewSection">Cancel</BaseButton>
    </BasicForm>

    <BasicForm v-else-if="newLesson" @submit="saveLesson" legend="New Section">
        <InputGroup 
            label="Lesson Name"
            v-model="newLesson.name"
            :error="newLesson.errors.name ? newLesson.errors.name[0] : ''"
        />
        <InputGroup 
            label="Video URL"
            v-model="newLesson.videoUrl"
            :error="newLesson.errors.video_url ? newLesson.errors.video_url[0] : ''"
        />
        <BaseButton class="edit-course__button"  type="submit">Save Lesson</BaseButton> 
        <BaseButton class="edit-course__button"  @click="cancelNewLesson">Cancel</BaseButton>
    </BasicForm>

    <div v-else class="edit-course">
        <EditCourseInfo 
            :course="course"
            :errors="errors"
            @new-cover-image="newCoverImage"
            @new-name="newName"
            @new-description="newDescription"
            @new-attachment="newAttachment"
            @download-attachment="downloadAttachment"
        />

        <hr/>

        <div class="sections">
            <div class="section" v-for="section in this.sections" :key="section.id">
                <div class="section-info">
                    Section Name: {{ section.name }} 
                </div>

                <BaseButton class="edit-course__button"  @click="deleteSectionConfirmation(section.id)"> Delete Section</BaseButton>
                <BaseButton class="edit-course__button"  @click="addLesson(section.id)"> Add Lesson</BaseButton>

                <div class="lessons" v-if="section.lessons && section.lessons.length !== 0">
                    <div v-for="(lesson, index) in section.lessons" :key="lesson.id">
                        <hr v-if="index > 0"/>
                        <div>
                            Name: {{ lesson.name }}
                        </div>
                        <div>
                            Video URL: {{ lesson.video_url }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PageLoader from '@/components/PageLoader';
import InputGroup from '@/components/InputGroup';
import BaseButton from '@/components/base/BaseButton';
import BasicForm from '@/components/BasicForm';
import ConfirmationBox from '@/components/ConfirmationBox';
import EditCourseInfo from '@/components/EditCourseInfo';

export default {
    name: 'EditCourse',
    components: {
        BaseButton, InputGroup, BasicForm, PageLoader, ConfirmationBox, EditCourseInfo
    },
    data() {
        return {
            courseId: undefined,
            course: null,

            errors: null,

            sections: null,
            newSection: null,
            newLesson: null,
            message: null,
            deleteSectionId: undefined,
            loading: false
        }
    },
    computed: {
        ...mapState({
            apiUrl: (state) => state.server.apiUrl,
            user: (state) => state.auth.user
        })
    },
    async mounted() {

        if (! this.$route.params.courseId) return this.$router.push({name: 'NotFound'});

        this.courseId = this.$route.params.courseId;

        await this.fetchCourse();

        if (!this.course || this.course.author_id !== this.user.id) return this.$router.push({name: 'NotFound'});

        await this.fetchSections();
    },

    methods: {
        async fetchCourse() {
            this.loading = true;
            try {
                const response = await window.axios.get(`${this.apiUrl}/courses/${this.courseId}`);
                this.course = response.data.course;
                this.loading = false;
            }
            catch (error) {
                this.loading = false;
            }
        },

        async fetchSections() {
            this.loading = true;
            try {
                const response = await window.axios.get(`${this.apiUrl}/courses/${this.courseId}/sections`);
                this.sections = response.data.sections;
                this.loading = false;
            }
            catch (error) {
                console.log([error]);
                this.loading = false;
            }
        },

        async newCoverImage(newCoverImage) {
            try {
                await this.updateCourse('cover_image', newCoverImage);
                this.fetchCourse();
            }
            catch (error) {
                console.log(error);
            }
        },

        async newName(newName) {
            try {
                await this.updateCourse('name', newName);
                this.course.name = newName;
            }
            catch (error) {
                console.log(error);
            }
        },

        async newDescription(newDescription) {
            try {
                await this.updateCourse('description', newDescription);
                this.course.description = newDescription;
            }
            catch (error) {
                console.log(error);
            }
        },

        async newAttachment(newAttachment) {
            try {
                await this.updateCourse('attachment', newAttachment);
                this.fetchCourse();
            }
            catch (error) {
                console.log(error);
            }
        },

        downloadAttachment() {
            window.open(`${this.apiUrl}/courses/${this.course.id}/download-attachment`, '_blank');
        },

        addSection() {
            this.newSection = {
                name: ''
            };
        },

        deleteSectionConfirmation(sectionId) {
            this.deleteSectionId = sectionId;
        },

        cancelDeleteSection() {
            this.deleteSectionId = undefined;
        },

        async deleteSection(sectionId) {
            this.loading = true;

            try {
                await window.axios.delete(`${this.apiUrl}/courses/${this.courseId}/sections/${sectionId}`);
                
                this.loading = false;
                this.deleteSectionId = undefined;
                this.fetchSections();
            }
            catch (error) {
                this.loading = false;
                console.log([error]);
            }
        },

        async saveSection() {
            this.loading = true;

            try {
                await window.axios.post(`${this.apiUrl}/courses/${this.courseId}/sections`, {
                    name: this.newSection.name
                });
                
                this.loading = false;
                this.newSection = null;
                this.fetchSections();
            }
            catch (error) {
                this.loading = false;
                this.newSection.errors = error.response.data.errors;
            }
        },

        cancelNewSection() {
            this.newSection = null;
        },

        addLesson(sectionId) {
            this.newLesson = {
                name: '',
                videoUrl: '',
                sectionId: sectionId,
                errors: {}
            };
        },

        async saveLesson() {
            this.loading = true;

            try {
                await window.axios.post(`${this.apiUrl}/courses/${this.courseId}/sections/${this.newLesson.sectionId}/lessons`, {
                    name: this.newLesson.name,
                    video_url: this.newLesson.videoUrl
                });
                
                this.loading = false;
                this.newLesson = null;
                this.fetchSections();
            }
            catch (error) {
                this.loading = false;
                this.newLesson.errors = error.response.data.errors;
                console.log([error]);
            }
        },

        cancelNewLesson() {
            this.newLesson = null;
        },

        async selectEditCourseAttachment(file) {
            this.editCourseAttachmentValue = file;
        },
        
        async updateCourse(field, value) {
            try {
                this.loading = true;
                let data = new FormData();
                data.append('_method', 'PATCH');
                data.append(field, value);
                await window.axios.post(`${this.apiUrl}/courses/${this.course.id}`, data);
                this.loading = false;
            }
            catch (error) {
                this.loading = false;
                this.errors = error.response.data.errors;
                throw error;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.edit-course {
    margin: 1rem;

    &__confirmation-box {
        margin: 1rem auto 1rem auto;
    }
}

.course-info {
    margin-bottom: 1rem;

    &__group {

    }

    &__group--column {
        display: flex;
        flex-direction: column;
        width: fit-content;
    }

    &__cover-image {
        width: 300px;
    }

    &__text {
        font-size: 1rem;
    }

    &__text--link {
        font-size: .8rem;
        color: #1f6eff;
    }
}

.lessons {
    border: 1px solid #DDD;
    padding: 1rem;
    margin: .5rem;
}

.section {
    border: 1px solid #DDD;
    padding: 1rem;
    margin-bottom: .5rem;
}

.section-info {
    margin-bottom: .5rem;
}

.edit-course__button {
    font-size: .6rem;
    margin-right: .5rem;
    padding: .5rem .5rem;
}




</style>