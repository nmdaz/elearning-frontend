<template>
    <div class="input-group">
        <label v-if="label" class="input-group__label" :for="_uid">{{ label }}</label>
        <input 
            :class="['input-group__input', {'input-group__input--error': error}]"
            :ref="reference ? reference : 'input'"
            :value="value" 
            :type="type" 
            @input="$emit('input', $event.target.value)"
            @focus="$emit('focus', $event.target.value)"
            @change="type === 'file' ? $emit('select', $event.target.files[0]) : ''"
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
    props: { label: String, type: String, value: String, error: String, required: Boolean, placeholder: String, reference: String },
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

    &__label {
        font-size: .75em;
        color: #444;
    }

    &__input {
        color: #333;
        padding: .4rem;
        border-width: 0 0 1px 0;
        margin-bottom: 1rem;
        font-size:  1em;
        letter-spacing: .02rem;
        background-color: transparent;
    }

    &__error {
        display: block;
        margin-bottom: 1rem;
        color: #962222;
        font-size: 0.7em;
    }
}   
</style>