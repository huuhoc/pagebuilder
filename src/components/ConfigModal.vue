<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="text-lg font-medium">Edit Feature Post</h3>
                    <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="p-4">
                    <form @submit.prevent="saveChanges">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                            <input v-model="formData.title" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter title" />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea v-model="formData.description"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4" placeholder="Enter description"></textarea>
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input v-model="formData.imageUrl" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter image URL" />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
                            <input v-model="formData.date" type="date"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Reading Time (minutes)</label>
                            <input v-model.number="formData.readingTime" type="number" min="1"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </form>
                </div>

                <div class="flex justify-end gap-2 p-4 border-t">
                    <button @click="closeModal" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                        Cancel
                    </button>
                    <button @click="saveChanges" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    postData: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close', 'save']);

// Form data with defaults
const formData = ref({
    title: '',
    description: '',
    imageUrl: '',
    date: '',
    readingTime: 5
});

// Update form data when post data changes
watch(() => props.postData, (newVal) => {
    if (newVal) {
        formData.value = {
            title: newVal.title || '',
            description: newVal.description || '',
            imageUrl: newVal.imageUrl || '',
            date: newVal.date || new Date().toISOString().split('T')[0],
            readingTime: newVal.readingTime || 5
        };
    }
}, { immediate: true });

const closeModal = () => {
    emit('close');
};

const saveChanges = () => {
    emit('save', {
        ...formData.value,
        id: props.postData.id
    });
    closeModal();
};
</script>