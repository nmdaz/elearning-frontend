<template>
    <input 
        class="base-input" 
        ref="input"
        :type="type" 
        :name="name"
        :value="value"
        @input="$emit('input', $event.target.value)"
    >
</template>

<script>
export default {
    name: 'BaseInput',
    props: { type: String, name: String, value: String },
    methods: {
        focus() {
            this.$refs.input.focus();
        }
    }
}
</script>

<style>
.base-input {
    padding: .4rem;
    border-width: 0 0 1px 0;
}
</style>