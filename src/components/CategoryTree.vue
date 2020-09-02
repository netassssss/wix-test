<template>
  <div class="category-container">
    <ul v-for="(item, index) in data"
       :key="index">
      <category-item :name="item.current"
                     :indent="item.level"
                     :isLeaf="!item.to"
                     :hidePlus="!areChildrenVisible(index)"
                     @expand="() => expand(index, item)"
                     @add="() => addNode(index, item)"
                     @deleteNode="() => deleteNode(index)"
                     v-if="item.visible"/>
    </ul>
  </div>
</template>

<script>

/* eslint no-debugger: 0 */
import CategoryItem from './CategoryItem.vue';
import { getVisibleState } from '../utils/treeHelper';

export default {
  components: {
    CategoryItem,
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    expand(index, item) {
      this.$emit('expand', { index, item });
    },
    addNode(index, item) {
      this.$emit('add', { index, item });
    },
    areChildrenVisible(index) {
      return getVisibleState(this.data, index);
    },
    deleteNode(index) {
      this.$emit('deleteNode', { index });
    },
  },
};
</script>

<style scoped lang="scss">
  .category-container {
    width: 100%;
    height: 100%;
    ul {
      list-style: none;
      width: 100%;
    }
  }
</style>
