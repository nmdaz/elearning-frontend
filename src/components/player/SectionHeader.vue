<template>
<div class="c-section-head">
    <small class="c-section-head__counter">{{ 'Section ' + counter }}</small>
    <div class="l-flex l-flex--space-between w-100">
        <h3 class="c-section-head__title">
            {{ name }}
        </h3>
        <font-awesome-icon v-if="isActive"
            class="c-section-head__toggler" 
            :icon="['fas', 'chevron-up']"
            @click="$emit('click')" 
        />
        <font-awesome-icon v-else
            class="c-section-head__toggler" 
            :icon="['fas', 'chevron-down']"
            @click="$emit('click')" 
        />
    </div>
</div>
</template>

<script>
export default {
	name: 'SectionHeader',
	props: [ 'counter', 'name', 'isActive' ]
}
</script>

<style lang="scss" scoped>
.c-section-head {
    display: flex;
    flex-wrap: wrap;

    &__counter {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        background-color: #38bb8e;
        width: fit-content;
        padding: .2rem .4rem;
        border-radius: .2rem;
        color: white;
    }

    &__title {
        margin-bottom: .5rem;
        font-size:  1rem;
        flex-basis: 80%;
    }

    &__toggler {
        font-size: 2rem;
        flex-basis: 20%;
        color: #38bb8e;
    }
}
</style>