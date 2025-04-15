<template>
    <label :class="[
        'flex items-center space-x-2 cursor-pointer',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90',
    ]">
        <input type="radio" :name="name" :value="value" :checked="checked" :disabled="disabled"
            class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
            @change="$emit('update:checked', $event.target.checked)" />
        <span :class="[
            'text-sm font-medium',
            disabled ? 'text-gray-500' : 'text-gray-900',
        ]">
            {{ label }}
        </span>
    </label>
</template>

<script setup>
defineProps({
    value: {
        type: [String, Number, Boolean],
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['update:checked']);
</script>