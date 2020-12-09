<template>

<div class="c-lesson-controls">
    <font-awesome-icon 
        @click="$emit('previous')" 
        :class="['c-lesson-controls__icon', current <= 1 ? 'c-lesson-controls__icon--disabled' : '']" 
        :icon="['fas', 'chevron-left']" 
    />

    <div  class="c-lesson-controls__info">
        <h3 class="c-lesson-controls__title">{{ name }}</h3>
    </div>

    <font-awesome-icon 
        @click="$emit('next')"
        :class="['c-lesson-controls__icon', current >= max ? 'c-lesson-controls__icon--disabled' : '']" 
        :icon="['fas', 'chevron-right']" 
    />
</div>

</template>


<script>

export default {
	name: 'LessonControls',
	props: [ 'name', 'max', 'current' ]
}

</script>


<style lang="scss" scoped>

.c-lesson-controls {
    display: flex;
    align-items:center;
    padding: 1rem;
    justify-content: space-around;
    background-color: #38bb8e;


    &__icon {
        font-size: 2rem;
    }

    &__icon--disabled {
        color: white;
    }

    &__info {
        max-width: 500px;
    }

    &__title {
        margin-bottom: .4rem;
        font-size: 1.4rem;
        text-align: center;
    }
}

</style>