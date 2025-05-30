/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { v6 as uuidv6 } from 'uuid'
import { ref } from 'vue'
import type { ListItemsElementType } from '@/types'

export const useElementStore = defineStore('element', () => {
  // Available element types that can be dragged from sidebar
  const availableElements = ref<ListItemsElementType[]>([
    {
      id: uuidv6(),
      el: 'ElSliderPost',
      name: 'Slider Post',
      description: 'Hiển thị bài viết theo kiểu slider',
      content: {
        title: {
          type: 'InputText',
          label: 'Tiêu đề',
          value: 'Slider Post',
        },
        category: {
          type: 'SelectCategory',
          label: 'Danh mục',
          desc: 'Mặc định không chọn danh mục bài viết sẽ lấy tất cả',
          value_vi: '',
        },
        isFeature: {
          type: 'CheckBox',
          label: 'Bài viết nổi bật',
        },
        numberPost: {
          type: 'InputNumber',
          label: 'Hiện thị số bài viết',
          value_vi: 5,
          value_en: 5,
        },
      },
      styles: {
        column: {
          type: 'BaseWidth',
          label: 'Độ rộng',
          value: 6,
        },
        isThumbnail: {
          type: 'CheckBox',
          label: 'Hiện thị thumbnail',
          value: true,
        },
        isThumbnailPost: {
          type: 'CheckBox',
          label: 'Hiện thị thumbnail là bài viết',
          value: false,
        },
        isThumbnailVertical: {
          type: 'CheckBox',
          label: 'Hiện thị thumbnail dạng cột',
          value: false,
        },
      },
    },
    {
      id: uuidv6(),
      el: 'ElListPost',
      name: 'List Post',
      description: 'Danh sách bài viết',
      content: {
        title: {
          type: 'InputText',
          label: 'Tiêu đề',
          value: 'List Post',
        },
        category: {
          type: 'SelectCategory',
          label: 'Danh mục',
          desc: 'Mặc định không chọn danh mục bài viết sẽ lấy tất cả',
          value_vi: '',
        },
        isFeature: {
          type: 'CheckBox',
          label: 'Bài viết nổi bật',
        },
        isLienHiep: {
          type: 'CheckBox',
          label: 'Chỉ bài viết của liên hiệp',
        },
        isHoiThanhVien: {
          type: 'CheckBox',
          label: 'Chỉ bài viết của các hội thành viên',
        },
        numberPost: {
          type: 'InputNumber',
          label: 'Hiện thị số bài viết',
          value_vi: 5,
          value_en: 5,
        },
      },
      styles: {
        column: {
          type: 'BaseWidth',
          label: 'Độ rộng',
          value: 3,
        },
      },
    },
    {
      id: uuidv6(),
      el: 'ElListPostStacked',
      name: 'List Post Stacked',
      description: 'Danh sách bài viết',
      content: {
        title: {
          type: 'InputText',
          label: 'Tiêu đề',
          value: 'List Post',
        },
        category: {
          type: 'SelectCategory',
          label: 'Danh mục',
          desc: 'Mặc định không chọn danh mục bài viết sẽ lấy tất cả',
          value_vi: '',
        },
        titlePage: {
          type: 'InputText',
          label: 'Tiêu đề trang thành phần',
          value: 'List Post Page',
        },
        page: {
          type: 'SelectPage',
          label: 'Danh mục trang thành phần',
          desc: 'Mặc định không chọn danh mục bài viết sẽ lấy tất cả',
          value_vi: '',
        },
        isFeature: {
          type: 'CheckBox',
          label: 'Bài viết nổi bật',
        },
        isLienHiep: {
          type: 'CheckBox',
          label: 'Chỉ bài viết của liên hiệp',
        },
        isHoiThanhVien: {
          type: 'CheckBox',
          label: 'Chỉ bài viết của các hội thành viên',
        },
        numberPost: {
          type: 'InputNumber',
          label: 'Hiện thị số bài viết',
          value_vi: 5,
          value_en: 5,
        },
      },
      styles: {
        column: {
          type: 'BaseWidth',
          label: 'Độ rộng',
          value: 3,
        },
      },
    },
    {
      id: uuidv6(),
      el: 'ElFeaturePost',
      name: 'Feature Post',
      description: 'Danh sách bài viết nổi bật',
      content: {
        title: {
          type: 'InputText',
          label: 'Tiêu đề',
          value: 'Feature Post',
        },
        category: {
          type: 'SelectCategory',
          label: 'Danh mục',
          desc: 'Mặc định không chọn danh mục bài viết sẽ lấy tất cả',
          value_vi: '',
        },
        isFeature: {
          type: 'CheckBox',
          label: 'Bài viết nổi bật',
        },
        isLienHiep: {
          type: 'CheckBox',
          label: 'Chỉ bài viết của liên hiệp',
        },
        isHoiThanhVien: {
          type: 'CheckBox',
          label: 'Chỉ bài viết của các hội thành viên',
        },
        numberPost: {
          type: 'InputNumber',
          label: 'Hiện thị số bài viết',
          value_vi: 3,
          value_en: 3,
        },
      },
      styles: {
        column: {
          type: 'BaseWidth',
          label: 'Độ rộng',
          value: 3,
        },
      },
    },
    {
      id: uuidv6(),
      el: 'ElListPostCategory',
      name: 'Category Post',
      description: 'Hiển thị bài viết theo chuyên mục',
      content: {
        title: {
          type: 'InputText',
          label: 'Tiêu đề',
          value: 'List Post Category',
        },
        category: {
          type: 'SelectCategory',
          label: 'Danh mục',
          desc: 'Mặc định không chọn danh mục bài viết sẽ lấy tất cả',
          value_vi: '',
        },
        numberPost: {
          type: 'InputNumber',
          label: 'Hiện thị số bài viết',
          value_vi: 7,
          value_en: 7,
        },
      },
      styles: {
        column: {
          type: 'BaseWidth',
          label: 'Độ rộng',
          value: 12,
        },
        hasGroupLastest: {
          type: 'CheckBox',
          label: 'Hiện thị nhóm bài viết mới nhất',
          value: false,
        },
        hasLink: {
          type: 'CheckBox',
          label: 'Có đường dẫn đi tới chuyên mục',
          value: false,
        },
        hasButtonViewMore: {
          type: 'CheckBox',
          label: 'Hiện thị button Xem Thêm',
          value: false,
        },
        hasButtonViewFile: {
          type: 'CheckBox',
          label: 'Hiển thị chế độ xem danh sách file đính kèm',
          value: false,
        },
      },
    },
    {
      id: uuidv6(),
      el: 'ElListLink',
      name: 'Liên kết website',
      description: 'Hiển thị danh sách các liên kết website',
      content: {
        title: {
          type: 'InputText',
          label: 'Tiêu đề',
          value: 'List Link',
        },
        numberPost: {
          type: 'InputNumber',
          label: 'Hiện thị số link liên kết',
          value_vi: 8,
          value_en: 8,
        },
        numberColumn: {
          type: 'InputNumber',
          label: 'Hiện thị số cột',
          value_vi: 4,
          value_en: 4,
        },
      },
      styles: {
        column: {
          type: 'BaseWidth',
          label: 'Độ rộng',
          value: 12,
        },
      },
    },
    {
      id: uuidv6(),
      el: 'ElBanner',
      name: 'Banner',
      description: 'Hiện thị nội dung quảng cáo',
      content: {
        title: {
          type: 'InputText',
          label: 'Tiêu đề',
          value: 'Quảng cáo',
        },
        areaAds: {
          type: 'BaseSelect',
          label: 'Vị trí quảng cáo',
          options: [
            {
              value: 'top',
              label: 'Phía trên',
            },
            {
              value: 'bottom',
              label: 'Phía dưới',
            },
            {
              value: 'center',
              label: 'Giữa',
            },
            {
              value: 'left',
              label: 'Bên trái',
            },
            {
              value: 'right',
              label: 'Bên phải',
            },
          ],
          value: '',
        },
      },
      styles: {
        column: {
          type: 'BaseWidth',
          label: 'Độ rộng',
          value: 12,
        },
      },
    },
    {
      id: uuidv6(),
      el: 'ElSliderPostImage',
      name: 'Slider Post Image',
      description: 'Hiển thị slider thư viện ảnh',
      content: {
        title: {
          type: 'InputText',
          label: 'Tiêu đề',
          value: 'List Link',
        },
        numberPost: {
          type: 'InputNumber',
          label: 'Hiện thị số bài viết',
          value_vi: 5,
          value_en: 5,
        },
      },
      styles: {
        column: {
          type: 'BaseWidth',
          label: 'Độ rộng',
          value: 6,
        },
      },
    },
    {
      id: uuidv6(),
      el: 'ElSliderPostVideo',
      name: 'Slider Post Video',
      description: 'Hiển thị slider thư viện video',
      content: {
        title: {
          type: 'InputText',
          label: 'Tiêu đề',
          value: 'List Link',
        },
        numberPost: {
          type: 'InputNumber',
          label: 'Hiện thị số bài viết',
          value_vi: 5,
          value_en: 5,
        },
      },
      styles: {
        column: {
          type: 'BaseWidth',
          label: 'Độ rộng',
          value: 6,
        },
      },
    },
    {
      id: uuidv6(),
      el: 'ElSliderPostAudio',
      name: 'Slider Post Audio',
      description: 'Hiển thị slider thư viện audio',
      content: {
        title: {
          type: 'InputText',
          label: 'Tiêu đề',
          value: 'List Link',
        },
        numberPost: {
          type: 'InputNumber',
          label: 'Hiện thị số bài viết',
          value_vi: 5,
          value_en: 5,
        },
      },
      styles: {
        column: {
          type: 'BaseWidth',
          label: 'Độ rộng',
          value: 12,
        },
      },
    },
    {
      id: uuidv6(),
      el: 'ElMenu',
      name: 'Menu',
      description: 'Hiện thị nội dung danh sách menu',
      content: {
        typeMenu: {
          type: 'SelectMenus',
          label: 'Menu',
          value_vi: '',
          value_en: '',
        },
      },
      styles: {
        column: {
          type: 'BaseWidth',
          label: 'Độ rộng',
          value: 4,
        },
      },
    },
  ])

  // Layout elements (actual placed elements)
  const layoutElements = ref<ListItemsElementType[]>([])

  // Helper function for drag and drop
  const applyDrag = (arr: ListItemsElementType[], dragResult: any) => {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr

    const result = [...arr]
    const mapPayload = JSON.parse(JSON.stringify(payload)) // fix issue Deep copy
    let itemToAdd = { ...mapPayload, id: uuidv6() } // Set unique ID

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null && itemToAdd) {
      // Ensure component is wrapped with markRaw if it exists
      if (itemToAdd.el) {
        itemToAdd.el = itemToAdd.el
      }
      result.splice(addedIndex, 0, itemToAdd)
    }

    return result
  }

  // Actions
  const addSection = () => {
    layoutElements.value.push({
      id: uuidv6(),
      el: 'ElSection',
      name: 'Section',
      content: {
        title: {
          type: 'InputText',
          label: 'Tiêu đề',
          value: '',
          value_vi: '',
        },
        url: {
          type: 'InputText',
          label: 'Đường dẫn',
          value: '',
          value_vi: '',
        },
      },
      styles: {
        hasContainer: {
          type: 'CheckBox',
          label: 'Container',
          value: true,
        },
        'background-color': {
          type: 'InputText',
          label: 'Màu nền',
          value: '',
        },
        'background-image': {
          type: 'InputText',
          label: 'Ảnh nền',
          value: '',
        },
      },
      children: [],
    })
  }

  const onDropLayout = (dropResult: any) => {
    layoutElements.value = applyDrag(layoutElements.value, dropResult)
  }

  const handleDropSection = (value: any) => {
    const index = layoutElements.value.findIndex((item) => item.id === value.sectionId)
    if (index !== -1 && layoutElements.value[index].children) {
      layoutElements.value[index].children = applyDrag(
        layoutElements.value[index].children || [],
        value.data,
      )
    }
  }

  const deleteElement = (elementId: string) => {
    // Delete from top level
    layoutElements.value = layoutElements.value.filter((item) => item.id !== elementId)

    // Delete from children
    layoutElements.value.forEach((section) => {
      if (section.children) {
        section.children = section.children.filter((item) => item.id !== elementId)
      }
    })
  }

  const updateElement = ({ id, content }: { id?: string; content: any }) => {
    // Update element at top level
    const topLevelIndex = layoutElements.value.findIndex((item) => item.id === id)
    if (topLevelIndex !== -1) {
      layoutElements.value[topLevelIndex] = {
        ...layoutElements.value[topLevelIndex],
        content: content.content,
        styles: content.styles,
      }
      return
    }

    // Update element in children
    layoutElements.value.forEach((section) => {
      if (section.children) {
        const childIndex = section.children.findIndex((item) => item.id === id)
        if (childIndex !== -1) {
          console.log('childIndex: ', childIndex)
          section.children[childIndex] = {
            ...section.children[childIndex],
            content: content.content,
            styles: content.styles,
          }
        }
      }
    })
  }

  // Getters
  const getChildPayload1 = (index: number) => {
    return { ...availableElements.value[index] }
  }

  const getChildPayload2 = (index: number) => {
    return layoutElements.value[index]
  }

  const getLayout = () => {
    return JSON.stringify(layoutElements.value)
  }

  const setInitLayout = (value: string | undefined) => {
    if (value) {
      const valueParse = JSON.parse(value)
      layoutElements.value = valueParse
    }
  }

  return {
    availableElements,
    layoutElements,
    addSection,
    onDropLayout,
    handleDropSection,
    deleteElement,
    updateElement,
    getChildPayload1,
    getChildPayload2,
    getLayout,
    setInitLayout,
  }
})
