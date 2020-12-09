<template>
    <div class="create-course">
        <PageLoader v-if="loading" />
        <BasicForm v-else @submit="save" legend="Create Course">
            <InputGroup  
                v-model="course.name"
                label="Name"
                type="text"
                :error="courseErrors && courseErrors.name ? courseErrors.name[0] : ''"
            />

            <InputGroup  
                v-model="course.description"
                label="Description"
                type="text" 
                :error="courseErrors && courseErrors.description ? courseErrors.description[0] : ''"
            />

            <InputGroup  
                label="Cover Image (optional)"
                type="file"
                @select="selectCoverImage"
                :error="courseErrors && courseErrors.cover_image ? courseErrors.cover_image[0] : ''"
            />

            <InputGroup  
                label="Attachment (optional)"
                type="file" 
                @select="selectAttachment"
                :error="courseErrors && courseErrors.attachment ? courseErrors.attachment[0] : ''"
            />

            <BaseButton class="create-course__button" type="submit">Save Course</BaseButton>
        </BasicForm>
    </div>
</template>

<script>
import InputGroup from '@/components/InputGroup';
import BaseButton from '@/components/controls/BaseButton';
import BasicForm from '@/components/controls/BaseForm';
import PageLoader from '@/components/PageLoader';
import { mapState } from 'vuex';

export default {
    name: 'CreateCourse',
    components: {
        InputGroup, BaseButton, BasicForm, PageLoader
    },
    data() {
        return {
            course: {
                name: '',
                description: '',
                cover_image: null,
                attachment: null
            },
            courseErrors: {},
            loading: false
        }
    },
    computed: {
        ...mapState({
            'apiUrl': (state) => state.server.apiUrl
        })
    },
    methods: {
        selectCoverImage(file) {
            this.course.cover_image = file;
        },

        selectAttachment(file) {
            this.course.attachment = file;
        },

        async save() {
            this.loading = true;

            try {
                let courseId = await this.submitCourse();
                this.loading = false;
                this.$router.push({ name: 'EditCourse', params: { courseId: courseId }});
            }
            catch (error) {
                console.log([error]);
                this.loading = false;
                this.courseErrors = error.response.data.errors;
            }           
        },

        async submitCourse() {
            let data = new FormData();

            data.append('name', this.course.name);
            data.append('description', this.course.description);
            
            if (this.course.cover_image) data.append('cover_image', this.course.cover_image);
            if (this.course.attachment) data.append('attachment', this.course.attachment);

            try {
                let response = await window.axios.post(`${this.apiUrl}/courses`, data);
                return response.data.course_id;
            }
            catch (error) {
                throw error;
            }
        },

        async submitSection(courseId, section) {
            let data = { name: section.name };

            try {
                let response = await window.axios.post(`${this.apiUrl}/courses/${courseId}/sections`, data);
                return response.data.section_id;
            }
            catch (error) {
                throw new Error(error.message);
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/css/_mixin.scss';

.create-course {
    margin: 1rem;
}

</style>