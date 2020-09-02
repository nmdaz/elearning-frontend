<template>
<div class="c-section-body">
    <div 
        v-for="lesson in lessons" :key="lesson.id"
        class="c-lesson-header" 
    >
        <div class="c-lesson-header__play-icon" v-if="currentLesson && lesson.id === currentLesson.id">
            <font-awesome-icon :icon="['fas', 'play']"/>
        </div>

        <div v-else class="c-lesson-header__counter">{{ lesson.counter }}</div>
        <p @click="$emit('click', lesson)" class="c-lesson-header__title">{{ lesson.name }}</p>
    </div>
</div>
</template>

<script>
export default {
	name: 'SectionBody',
	props: [ 'lessons', 'current-lesson',]
}
</script>

<style lang="scss" scoped>
.c-section-body {
    color: #444;
}

.c-lesson-header {
    margin-bottom: .2rem;
    display: flex;
    align-items: center;

    &__counter {
        border: 2px solid #38bb8e;
        padding: 0.25rem;
        border-radius: 100%;
        width: 1rem;
        height: 1rem;
        text-align: center;
        color: #38bb8e;
        font-weight: bold;
        margin-right: 0.5rem;
        flex-shrink: 0;
        line-height: normal;
    }

    &__play-icon {
        padding: 0.25rem;
        border-radius: 100%;
        width: 1rem;
        text-align: center;
        color: #38bb8e;
        font-weight: bold;
        margin-right: 0.5rem;
        flex-shrink: 0;
        font-size: 1.5rem;
    }

    &__title {
        cursor: pointer;
    }
}
</style>