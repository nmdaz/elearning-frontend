<template>
    <div class="edit-course-info">

        <div class="l-flex l-flex--wrap l-flex--j-center">
            <div class="l-flex-child l-flex-child--half pd-1rem">
                <div class="edit-item edit-item--center">
                    <img class="edit-item__cover-image" :src="'data:' + course.cover_image_mime_type + ';base64,' + course.cover_image">

                    <InputGroup  
                        label="Cover or Preview Image"
                        type="file"
                        @select="selectNewCoverImage"
                        :error="errors && errors.cover_image ? errors.cover_image[0] : ''"
                    />

                    <div v-if="newCoverImage">
                        <font-awesome-icon class="edit-item__icon" @click="saveNewCoverImage" :icon="['fas', 'save']" />
                        <font-awesome-icon class="edit-item__icon" @click="cancelNewCoverImage" :icon="['fas', 'trash']" />
                    </div>
                </div>
            </div>
            <div class="l-flex-child l-flex-child--half pd-1rem">
                <div class="edit-item mb-1rem">
                    <span class="edit-item__label"> Name </span> 

                    <template v-if="newName === undefined">
                        <font-awesome-icon class="edit-item__icon" :icon="['fas', 'edit']" @click="editName(course.name)" />
                        <div class="edit-item__value"> {{ course.name }} </div>
                    </template>

                    <template v-else>
                        <input class="edit-item__input" type="text" v-model="newName">
                        <div>
                            <font-awesome-icon class="edit-item__icon" @click="saveNewName" :icon="['fas', 'save']" />
                            <font-awesome-icon class="edit-item__icon" @click="cancelNewName" :icon="['fas', 'trash']"/>
                        </div>
                    </template>              

                    <div v-if="errors && errors.name" class="edit-item__error">{{ errors.name[0] }}</div>
                </div>              

                <div class="edit-item mb-1rem">
                    <span class="edit-item__label"> Description </span> 

                    <template v-if="newDescription === undefined">
                        <font-awesome-icon class="edit-item__icon" :icon="['fas', 'edit']" @click="editDescription(course.description)" />
                        <div class="edit-item__value"> {{ course.description }} </div>
                    </template>

                    <template v-else>
                        <textarea class="edit-item__textarea" v-model="newDescription"></textarea>
                        <div>
                            <font-awesome-icon class="edit-item__icon" @click="saveNewDescription" :icon="['fas', 'save']" />
                            <font-awesome-icon class="edit-item__icon" @click="cancelNewDescription" :icon="['fas', 'trash']"/>
                        </div>
                    </template>                   

                    <div v-if="errors && errors.name" class="edit-item__error">{{ errors.name[0] }}</div>
                </div>

                <div class="edit-item"> 
                   <div v-if="!course.attachment_url">This course has no attachment</div>
                   <button v-else @click="$emit('download-attachment')">Download Attachment</button>
                   <InputGroup  
                       label="Change/Add attachment"
                       type="file"
                       @select="selectNewAttachment"
                       :error="errors && errors.attachment ? errors.attachment[0] : ''"
                       reference="attachment"
                   />
                   <div v-if="newAttachment">
                       <font-awesome-icon class="edit-item__icon" @click="saveNewAttachment" :icon="['fas', 'save']" />
                       <font-awesome-icon class="edit-item__icon" @click="cancelNewAttachment" :icon="['fas', 'trash']"/>
                   </div>
                </div>

            </div>
        </div>
        
        
<!--         <div class="edit-item mb-1rem">
            <div class="edit-item__header">
                <span class="edit-item__label"> Name </span> 
                <font-awesome-icon 
                    v-if="newName === undefined" 
                    class="edit-item__icon" :icon="['fas', 'edit']"  
                    @click="editCourseName(course.name)" 
                />
            </div>

            <div v-if="newName === undefined" class="edit-item__value"> {{ course.name }} </div>

            <div v-else>
                <input class="edit-item__input" type="text" v-model="newName">
                <div>
                    <font-awesome-icon 
                        class="edit-item__icon" 
                        @click="saveCourseName" 
                        :icon="['fas', 'save']" 
                    />
                    <font-awesome-icon 
                        class="edit-item__icon" 
                        @click="cancelCourseName" 
                        :icon="['fas', 'trash']" 
                    />
                </div>
            </div>                   

            <div v-if="errors && errors.name" class="edit-item__error">{{ errors.name[0] }}</div>
        </div>

        <div class="edit-item mb-1rem">
            <div class="edit-item__header">
                <span class="edit-item__label"> Description </span> 
                <font-awesome-icon 
                    v-if="editCourseDescriptionValue === undefined" 
                    class="edit-item__icon" :icon="['fas', 'edit']"  
                    @click="editCourseDescription(course.description)" 
                />
            </div>

            <div v-if="editCourseDescriptionValue === undefined" class="edit-item__value"> {{ course.description }} </div>

            <div v-else>
                <textarea class="edit-item__input" v-model="editCourseDescriptionValue"></textarea>
                <div>
                    <font-awesome-icon class="edit-item__icon" @click="saveCourseDescription" :icon="['fas', 'save']" />
                    <font-awesome-icon class="edit-item__icon" @click="cancelCourseDescription" :icon="['fas', 'trash']" />
                </div>
            </div>

            <div v-if="errors && errors.description" class="edit-item__error">{{ errors.description[0] }}</div>
        </div>
        
        

         <div class="mb-1rem"> 
            <div class="course-info__text">
                <div v-if="!course.attachment_url">This course has no attachment</div>
                <a 
                    v-else 
                    class="course-info__text course-info__text--link" 
                    href="#" 
                    target="_blank"
                >
                    Download Attachment
                </a> 
                <InputGroup  
                    label="Change/Add attachment"
                    type="file"
                    @select="selectEditCourseAttachment"
                    :error="errors && errors.attachment ? errors.attachment[0] : ''"
                />
                <button v-if="editCourseAttachmentValue" @click="saveEditCourseAttachment" class="btn">Save</button> 
            </div>
         </div> -->
    </div>
</template>

<script>
import InputGroup from '@/components/InputGroup';

export default {
    name: 'EditCourseInfo',
    components: { InputGroup },
    props: [ 'course', 'errors' ],
    data() {
        return {
            newCoverImage: null,
            newName: undefined,
            newDescription: undefined,
            newAttachment: null,
        }
    },
    methods: {
        selectNewCoverImage(file) {
            this.newCoverImage = file;
        },

        async saveNewCoverImage() {
            this.$emit('new-cover-image', this.newCoverImage);
            this.newCoverImage = null;
        },

        cancelNewCoverImage() {
            this.newCoverImage = null;
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

        selectNewAttachment(file) {
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
    border: 1px solid #DDD;
    padding: 1rem;

    &--center {
        text-align: center;
    }

    &__cover-image {
        width: 100%;
    }
    
    &__label {
        font-size: .8rem;
    }

    &__input {
        padding: .5rem;
        margin-bottom: .5rem;
    }

    &__icon {
        margin-right: .5rem;
    }

    &__textarea {
        width: 100%;
        height: 200px;
        padding: 1rem;
    }
}
</style>