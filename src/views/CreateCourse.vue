<template>
    <div class="create-course">
        <form class="create-course__form" @submit.prevent="()=>{}">
            <div class="create-course__content">
                <div class="create-course__course-info">
                    Course Info
                    <InputGroup  
                        v-model="course.name"
                        label="Name"
                        type="text" 
                    />

                    <InputGroup  
                        v-model="course.description"
                        label="Description"
                        type="text" 
                    />

                    <InputGroup  
                        v-model="course.cover"
                        label="Cover or Preview Image"
                        type="file" 
                    />

                    <InputGroup  
                        v-model="course.attachment"
                        label="Attachment (optional)"
                        type="file" 
                    />

                    <BaseButton class="create-course__button" @click="addSection">Add Section</BaseButton>
                    <BaseButton class="create-course__button" @click="saveCourse">Save Course</BaseButton>
                </div>

                <div class="create-course__sections">
                    
                    <div 
                        v-for="(section, index) in course.sections" 
                        :key="section.id"
                        :class="['create-course__section', {'create-course__section--alt': index % 2 !== 0}]"
                    >
                        <div class="create-course__section-counter">
                            Section {{ index + 1 }}
                            <BaseButton @click="toggleSection(section)">
                                <font-awesome-icon :icon="['fas', 'bars']" />
                            </BaseButton>
                        </div>

                        <div v-if="currentSection == section" class="create-course__section-content">
                            <InputGroup  
                                v-model="section.name"
                                label="Name"
                                type="text" 
                            />

                            <InputGroup  
                                v-model="section.description"
                                label="Description"
                                type="text" 
                            />

                            <BaseButton @click="addLesson(section)" class="create-course__button">Add Lesson</BaseButton>

                            <div class="create-course__lessons">
                                <div v-for="( lesson, index ) in section.lessons" :key="lesson.id" class="create-course__lesson">
                                    <div class="create-course__lesson-counter">
                                        Lesson {{ index + 1}}
                                    </div>

                                    <InputGroup  
                                        v-model="lesson.name"
                                        label="Name"
                                        type="text" 
                                    />

                                    <InputGroup  
                                        v-model="lesson.description"
                                        label="Description"
                                        type="text" 
                                    />

                                    <InputGroup  
                                        v-model="lesson.url"
                                        label="Youtube Url"
                                        type="text" 
                                    />
                                </div>
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import InputGroup from '@/components/InputGroup';
import BaseButton from '@/components/base/BaseButton';
export default {
    name: 'CreateCourse',
    components: {
        InputGroup, BaseButton
    },
    data() {
        return {
            course: {
                name: '',
                description: '',
                cover: null,
                sections: []
            },
            currentSection: null
        }
    },
    methods: {
        addSection() {
            let section = {
                name: '',
                description: '',
                lessons: [],
                collapse: true
            };

            this.course.sections.push(section);
            this.currentSection = section;
        },

        addLesson(section) {
            section.lessons.push({
                name: '',
                description: '',
                url: ''
            })
        },

        toggleSection(section) {
            if (this.currentSection != section || !this.currentSection) this.currentSection = section; 
            else this.currentSection = null;
        },

        saveCourse() {

        }
    }
}
</script>

<style lang="scss">
@import '@/css/_mixin.scss';

.create-course {
    &__content {
        display: flex;
    }

    &__course-info {
        width: 40%;
        padding: 1rem;
    }

    &__sections {
        width: 60%;
        padding: 1rem;
    }

    &__section {
        border: 1px solid #DDD;
        padding: 1rem;
        margin-bottom: 1rem;
    }

    &__section--alt {
        background-color: #f0fffa;
    }

    &__section-counter {
        color: #38bb8e;
        margin-bottom: .5rem;
        font-size: .8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__lesson {
        border: 1px solid #DDD;
        padding: 1rem;
        margin-bottom: 1rem;
    }

    &__button {
        margin-bottom: 1rem;
        margin-right: 1rem;
    }

    &__lesson-counter {
        color: #38bb8e;
        margin-bottom: .5rem;
        font-size: .8rem;
    }
}

@include for-tablet-down {
    .create-course {
        &__content {
            flex-wrap: wrap;
        }

        &__course-info {
            width: 100%;
            padding: 1rem;
        }

        &__sections {
            width: 100%;
            padding: 1rem;
        }
    }
}

</style>