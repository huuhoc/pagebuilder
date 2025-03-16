<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { ListItemsElementType } from '@/types'
import { Container, Draggable } from "vue3-smooth-dnd";

const props = defineProps<{
    dataItem: ListItemsElementType;
}>();

const emit = defineEmits<{
    onDropSection: [value: any]
}>();

const onDropLayout = (dropResult: any) => {
    emit('onDropSection', { data: dropResult, sectionId: props.dataItem.id })
}

const getChildPayload2 = (index: any) => {
    return props.dataItem.children ? props.dataItem.children[index] : null
}

</script>

<template>
    <div class="border border-gray-300 border-opacity-60 rounded p-3">
        <div class="container mx-auto px-10">
            <Container group-name="list-elements" orientation="horizontal" behaviour="contain"
                :get-child-payload="getChildPayload2" @drop="onDropLayout($event)" class="!flex gap-3">
                <Draggable v-if="dataItem.children && dataItem.children.length > 0"
                    v-for="(item, i) in dataItem.children" :key="item.id" class="flex">
                    <component :is="item.data.component" :dataItem="item"></component> <!-- Updated to use component -->
                </Draggable>
            </Container>
        </div>
    </div>
</template>