<template>
    <div class="edit-course-info">

        <div class="l-flex l-flex--wrap l-flex--j-center">
            <div class="l-flex-child l-flex-child--half pd-1rem">
                <div class="edit-item">
                    <img v-if="!course.cover_image" class="edit-item__cover-image" src="../assets/img/404.jpg">
                    <img v-else class="edit-item__cover-image" :src="newCoverImagePreview ?  newCoverImagePreview : 'data:' + course.cover_image_mime_type + ';base64,' + course.cover_image">
                    <div v-if="!newCoverImage" class="edit-item__controls edit-item__controls--center" @click="$refs.coverImageInput.click()">
                        <font-awesome-icon class="edit-item__icon edit-item__icon--big" :icon="['fas', 'edit']" /> 
                        <span class="edit-item__label edit-item__label--big">New Cover Image</span>
                    </div>
                    <div v-else class="edit-item__controls edit-item__controls--center">
                        <font-awesome-icon class="edit-item__icon edit-item__icon--big" @click="saveNewCoverImage" :icon="['fas', 'save']" />
                        <font-awesome-icon class="edit-item__icon edit-item__icon--big" @click="cancelNewCoverImage" :icon="['fas', 'trash-alt']" />
                    </div>

                    <div v-if="errors && errors.cover_image" class="edit-item__error edit-item__error--center">{{ errors.cover_image[0] }}</div>
                    <div v-if="coverImageError" class="edit-item__error edit-item__error--center">{{ coverImageError }}</div>

                     <input type="file" ref="coverImageInput" @change="selectNewCoverImage" style="display: none">
                </div>
            </div>
            <div class="l-flex-child l-flex-child--half pd-1rem">
                <div class="edit-item edit-item--border mb-1rem">
                    <span class="edit-item__label"> Name </span> 

                    <template v-if="newName === undefined">
                        <font-awesome-icon class="edit-item__icon" :icon="['fas', 'edit']" @click="editName(course.name)" />
                        <div class="edit-item__value"> {{ course.name }} </div>
                    </template>

                    <template v-else>
                        <input class="edit-item__input" type="text" v-model="newName">
                        <div>
                            <font-awesome-icon class="edit-item__icon" @click="saveNewName" :icon="['fas', 'save']" />
                            <font-awesome-icon class="edit-item__icon" @click="cancelNewName" :icon="['fas', 'trash-alt']"/>
                        </div>
                    </template>              

                    <div v-if="errors && errors.name" class="edit-item__error">{{ errors.name[0] }}</div>
                </div>              

                <div class="edit-item edit-item--border mb-1rem">
                    <span class="edit-item__label"> Description </span> 

                    <template v-if="newDescription === undefined">
                        <font-awesome-icon class="edit-item__icon" :icon="['fas', 'edit']" @click="editDescription(course.description)" />
                        <div class="edit-item__value"> {{ course.description }} </div>
                    </template>

                    <template v-else>
                        <textarea class="edit-item__textarea" v-model="newDescription"></textarea>
                        <div class="edit-item__controls">
                            <font-awesome-icon class="edit-item__icon" @click="saveNewDescription" :icon="['fas', 'save']" />
                            <font-awesome-icon class="edit-item__icon" @click="cancelNewDescription" :icon="['fas', 'trash-alt']"/>
                        </div>
                    </template>                   

                    <div v-if="errors && errors.description" class="edit-item__error">{{ errors.description[0] }}</div>
                </div>

                <div class="edit-item edit-item--border"> 
                   <div class="edit-item__label" v-if="!course.attachment_url && !newAttachment">This course has no attachment</div>
                   <div class="edit-item__label" v-else-if="newAttachment">New Attachment Ready</div>
                   <div class="edit-item__label" v-else>Attachment Available</div>
                   <div class="mb-1rem">
                        <template v-if="newAttachment">
                            <font-awesome-icon class="edit-item__icon" @click="saveNewAttachment" :icon="['fas', 'save']" />
                            <font-awesome-icon class="edit-item__icon" @click="cancelNewAttachment" :icon="['fas', 'trash-alt']"/>
                        </template>
                        <template v-else>
                            <font-awesome-icon v-if="course.attachment_url" class="edit-item__icon" @click="$emit('download-attachment')" :icon="['fas', 'download']" />
                            <font-awesome-icon @click="$refs.attachmentInput.click()" class="edit-item__icon" :icon="['fas', 'edit']" />
                        </template>
                   </div>
                    
                   <div v-if="errors && errors.attachment" class="edit-item__error">{{ errors.attachment[0] }}</div>
                   <div v-if="attachmentError" class="edit-item__error">{{ attachmentError }}</div>

                    <input type="file" ref="attachmentInput" @change="selectNewAttachment" style="display: none">
                </div>

            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'EditCourseInfo',
    props: [ 'course', 'errors' ],
    data() {
        return {
            newCoverImage: null,
            newCoverImagePreview: null,
            newName: undefined,
            newDescription: undefined,
            newAttachment: null,
            coverImageError: undefined,
            attachmentError: undefined
        }
    },
    methods: {
        selectNewCoverImage(event) {
            this.coverImageError = null;

            if (event.target.files.length == 0) return;

            const file = event.target.files[0];
            const fileName = file.name.split('.');

            if (!fileName || fileName.length < 2) {
                this.coverImageError = 'Invalid File';
            }

            const fileType = fileName[1];

            if (fileType !== 'jpg' && fileType !== 'jpeg') {
                this.coverImageError = 'Wrong File Type: JPEG or JPG only';
                return;
            }

            const reader = new FileReader();
            
            this.newCoverImage = file;

            reader.onload = (e) => {
                this.newCoverImagePreview = e.target.result;
            };

            reader.readAsDataURL(file);
        },

        saveNewCoverImage() {
            this.$emit('new-cover-image', this.newCoverImage);
            this.newCoverImage = null;
        },

        cancelNewCoverImage() {
            this.newCoverImage = null;
            this.newCoverImagePreview = null;
        },

        editName(oldCourseName) {
            this.newName = oldCourseName;
        },

        saveNewName() {
           this.$emit('new-name', this.newName);
           this.newName = undefined;
        },

        cancelNewName() {
            this.newName = undefined;
        },

        editDescription(oldDescription) {
            this.newDescription = oldDescription;
        },

        saveNewDescription() {
           this.$emit('new-description', this.newDescription);
           this.newDescription = undefined;
        },

        cancelNewDescription() {
            this.newDescription = undefined;
        },

        selectNewAttachment(event) {
            this.attachmentError = null;
            
            if (event.target.files.length == 0) return;

            const file = event.target.files[0];
            const fileName = file.name.split('.');

            if (!fileName || fileName.length < 2) {
                this.attachmentError = 'Invalid File';
            }

            const fileType = fileName[1];

            if (fileType !== 'rar' && fileType !== 'zip') {
                this.attachmentError = 'Wrong File Type: ZIP or RAR only';
                return;
            }

            this.newAttachment = file;
        },

        saveNewAttachment() {
            this.$emit('new-attachment', this.newAttachment);
            this.newAttachment = null;
        },

        cancelNewAttachment() {
            this.newAttachment = null;
        }
    }
}
</script>


<style lang="scss">
.edit-item {
    padding: 1rem;
    position: relative;

    &--border {
        border: 1px solid #DDD;
    }

    &--center {
        text-align: center;
    }

    &__cover-image {
        width: 100%;
    }

    &__attachment {
        font-size: .8rem;
    }
    
    &__label {
        font-size: 0.8rem;
        color: #38bb8e;
    }

    &__label--big {
        font-size: 1rem;
    }

    &__input {
        padding: .5rem;
        margin-bottom: .5rem;
    }

    &__icon {
        margin-right: .5rem;
        cursor: pointer;
        color: #d85c5c;
    }

    &__icon--big {
        font-size: 1.5rem;
    }

    &__textarea {
        width: 100%;
        height: 200px;
        padding: 1rem;
    }

    &__controls {
        margin-top: .5rem;
    }

    &__controls--center {
        text-align: center;
    }

    &__error {
        font-size: .7rem;
        color: red;
        line-height: .7rem;
        margin-top: .5rem;
    }

    &__error--center {
        text-align: center;
    }
}
</style>