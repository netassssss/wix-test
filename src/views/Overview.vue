<template>
  <div class="overview-container">
    <category-tree
      :data="nodes"
      @add="add"
      @deleteNode="deleteNode"
      @expand="expand"
      @editNode="editNode"/>
    <category-modal
      :modal-header="modalHeader"
      :category-name="categoryName"
      @close="closeModal"/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import {
  init, expand, add, deleteNodes,
} from '../store/actions';
import CategoryTree from '../components/CategoryTree.vue';
import CategoryModal from '../components/CategoryModal.vue';

/* eslint no-debugger: 0 */
export default {
  components: {
    CategoryTree,
    CategoryModal,
  },
  mounted() {
    this.$store.dispatch(init);
  },
  computed: {
    ...mapGetters({
      nodes: 'getNodes',
    }),
  },
  data() {
    return {
      modalHeader: '',
      categoryName: '',
    };
  },
  methods: {
    expand({ index, node }) {
      this.$store.dispatch(expand, { index, node });
    },
    add({ index, node }) {
      this.$store.dispatch(add, { index, node });
    },
    deleteNode({ index }) {
      this.$store.dispatch(deleteNodes, { index });
    },
    editNode({ node }) {
      this.categoryName = node.current;
      this.modalHeader = 'Edit Sub Category';
    },
    closeModal() {
      this.modalHeader = '';
      this.categoryName = '';
    },
  },
};
</script>
<style lang="scss" scoped>
  .overview-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
