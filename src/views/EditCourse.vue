<template>
    <PageLoader text="Loading Course" v-if="loading || loadingCourse" />

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

        <div class="loading-course" v-if="loadingCourse">Loading Courses</div>

        <template v-else-if="course">
            <BaseButton 
                class="edit-course__button edit-course__button--center" 
                @click="$router.push('/course-player/' + course.id)"
            >
                Watch Course
            </BaseButton> 

            <EditCourseInfo 
                :course="course"
                :errors="errors"
                @new-cover-image="newCoverImage"
                @new-name="newName"
                @new-description="newDescription"
                @new-attachment="newAttachment"
                @download-attachment="downloadAttachment"
            />
        </template>

        <div v-if="loadingSections">Loading Sections</div>

        <div v-else-if="course && sections" class="sections">
            <hr/>

            <BaseButton class="mb-1rem" @click="addSection">Add Section</BaseButton>

            <div v-if="sections.length === 0">No sections yet</div>

            <div v-else class="section" v-for="section in this.sections" :key="section.id">
                <div class="section-info">
                    Section Name: {{ section.name }} 
                </div>

                <BaseButton class="edit-course__button"  @click="deleteSectionConfirmation(section.id)"> Delete Section</BaseButton>
                <BaseButton class="edit-course__button"  @click="addLesson(section.id)"> Add Lesson</BaseButton>

                <template v-if="section.lessons && section.lessons.length !== 0">
                    <div class="lessons" v-for="(lesson, index) in section.lessons" :key="lesson.id">
                        <hr v-if="index > 0"/>
                        <div class="lessons__item">
                            Name: <span class="lessons__value"> {{ lesson.name }} </span>
                        </div>
                        <div class="lessons__item">
                            Video URL: <span class="lessons__value"> {{ lesson.video_url }} </span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PageLoader from '@/components/PageLoader';
import InputGroup from '@/components/InputGroup';
import BaseButton from '@/components/controls/BaseButton';
import BasicForm from '@/components/controls/BaseForm';
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

            loadingCourse: false,
            loadingSections: false,

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
            this.loadingCourse = true;
            try {
                const response = await window.axios.get(`${this.apiUrl}/courses/${this.courseId}`);
                this.course = response.data.course;
                this.loadingCourse = false;
            }
            catch (error) {
                console.log([error.response.data]);
                this.loadingCourse = false;
            }
        },

        async fetchSections() {
            this.loadingSections = true;
            try {
                const response = await window.axios.get(`${this.apiUrl}/courses/${this.courseId}/sections`);
                this.sections = response.data.sections;
                this.loadingSections = false;
            }
            catch (error) {
                console.log([error.response.data]);
                this.loadingSections = false;
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
                console.log(error.response.data);
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
                this.course.attachment = 'true';
            }
            catch (error) {
                console.log([error]);
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
            this.loadingSections = true;

            try {
                await window.axios.post(`${this.apiUrl}/courses/${this.courseId}/sections`, {
                    name: this.newSection.name
                });
                
                this.loadingSections = false;
                this.newSection = null;
                this.fetchSections();
            }
            catch (error) {
                this.loadingSections = false;
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
                let data = new FormData();
                data.append('_method', 'PATCH');
                data.append(field, value);
                await window.axios.post(`${this.apiUrl}/courses/${this.course.id}`, data);
            }
            catch (error) {
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
    min-height: 90vh;

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
    font-size: .8rem;

    &__item {
        overflow: scroll;
        overflow-x: hidden;
        overflow-y: hidden;
    }
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
    margin-top: .5rem;

    &--center {
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
}

.loading-course {
    text-align: center;
}


</style>