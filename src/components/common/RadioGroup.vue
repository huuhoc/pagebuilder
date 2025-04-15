<template>
    <div :class="['flex', orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-4']">
        <slot>
            <RadioGroupItem v-for="option in options" :key="option.value" :value="option.value" :label="option.label"
                :disabled="option.disabled" :name="name" :checked="modelValue === option.value"
                @update:checked="updateValue(option.value)" />
        </slot>
    </div>
</template>

<script setup>
import RadioGroupItem from '@/components/base/RadioGroupItem.vue';

const props = defineProps({
    modelValue: {
        type: [String, Number, Boolean],
        default: '',
    },
    options: {
        type: Array,
        default: () => [],
    },
    orientation: {
        type: String,
        default: 'vertical',
        validator: (value) => ['vertical', 'horizontal'].includes(value),
    },
    name: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value) => {
    emit('update:modelValue', value);
};
</script>