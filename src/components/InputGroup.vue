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

    &__label {
        font-size: .8rem;
        margin-bottom: .2rem;
        color: #444;
    }

    &__input {
        padding: .4rem;
        border-width: 0 0 1px 0;
        margin-bottom: .5rem;
        font-size:  1rem;
        letter-spacing: .18rem;
    }

    &__input--error {
    }

    &__error {
        display: block;
        margin-bottom: 1rem;
        color: #962222;
        letter-spacing: .12rem;
        font-size: .8rem;
    }
}   
</style>