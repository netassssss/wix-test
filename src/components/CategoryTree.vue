<template>
  <div class="category-container">
    <ul v-for="(node, index) in data"
       :key="index">
      <category-item :name="node.current"
                     :indent="node.level"
                     :isLeaf="!node.to"
                     :hidePlus="!areChildrenVisible(index)"
                     @expand="() => expand(index, node)"
                     @add="() => addNode(index, node)"
                     @deleteNode="() => deleteNode(index)"
                     @edit="() => editNode(node)"
                     v-if="node.visible"/>
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
    expand(index, node) {
      this.$emit('expand', { index, node });
    },
    addNode(index, node) {
      this.$emit('add', { index, node });
    },
    areChildrenVisible(index) {
      return getVisibleState(this.data, index);
    },
    deleteNode(index) {
      this.$emit('deleteNode', { index });
    },
    editNode(node) {
      this.$emit('editNode', { node });
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
