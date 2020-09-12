<template>
    <div class="input-group">
        <label class="input-group__label" :for="_uid">{{ label }}</label>
        <input 
            :class="['input-group__input', {'input-group__input--error': error}]"
            ref="input"
            :value="value" 
            :type="type" 
            @input="$emit('input', $event.target.value)"
            @focus="$emit('focus', $event.target.value)"
            :required="required" 
            :placeholder="placeholder"
            :id="_uid"
        >
        <small v-if="error" class="input-group__error">
                {{ error }}
        </small>
    </div>
</template>

<script>
export default {
    name: 'InputGroup',
    props: { label: String, type: String, value: String, error: String, required: Boolean, placeholder: String },
    methods: {
        focus() {
            this.$refs.input.focus();
        }
    }
}
</script>

<style lang="scss" scoped>
.input-group {
    display: flex;
    flex-direction: column;
    font-size: 1rem;

    &__label {
        font-size: .8em;
        margin-bottom: .2em;
        color: #444;
    }

    &__input {
        padding: .4em;
        border-width: 0 0 1px 0;
        margin-bottom: .5em;
        font-size:  1em;
        letter-spacing: .18em;
    }

    &__input--error {
    }

    &__error {
        display: block;
        margin-bottom: 1em;
        color: #962222;
        letter-spacing: .12em;
        font-size: .8em;
    }
}   
</style>