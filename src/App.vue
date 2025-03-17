<script setup lang="ts">
import { Container, Draggable } from 'vue3-smooth-dnd'
// import ElSection from '@/components/ElSection.vue'
// import ElSliderPost from '@/components/ElSliderPost.vue'
// import ElListPost from '@/components/ElListPost.vue'
// import ElFeaturePost from '@/components/ElFeaturePost.vue'
import { useElementStore } from '@/stores/layouts'

// Use the element store
const layoutStore = useElementStore()
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <div class="aqt-sidebar w-2/12 border-r border-gray-200">
      <div>
        <h2 class="aqt-sidebar__title">Components</h2>
        <Container
          behaviour="copy"
          group-name="list-elements"
          :get-child-payload="layoutStore.getChildPayload1"
        >
          <Draggable
            v-for="item in layoutStore.availableElements"
            :key="item.id"
            class="aqt-sidebar__element"
          >
            <div class="cursor-pointer">
              {{ item.data.title }}
            </div>
          </Draggable>
        </Container>
      </div>
    </div>
    <div class="space-y-2 w-10/12 p-2.5" ref="container">
      <Container
        :get-child-payload="layoutStore.getChildPayload2"
        @drop="layoutStore.onDropLayout($event)"
        class="space-y-2 p-3 border border-dashed border-gray-300 rounded"
      >
        <Draggable v-for="item in layoutStore.layoutElements" :key="item.id" class="flex">
          <component
            :is="item.data.component"
            :dataItem="item"
            @onDropSection="(value: any) => layoutStore.handleDropSection(value)"
            @delete="layoutStore.deleteElement"
          >
          </component>
        </Draggable>
      </Container>
      <div
        class="border border-gray-300 p-2 text-center cursor-pointer hover:bg-gray-200 rounded text-sm"
        @click="layoutStore.addSection"
      >
        Thêm mới section
      </div>
    </div>
  </div>
</template>
