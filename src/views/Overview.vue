<template>
  <div class="overview-container">
    <category-tree
      :data="nodes"
      @add="add"
      @deleteNode="deleteNode"
      @expand="expand"/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import {
  init, expand, add, deleteNodes,
} from '../store/actions';
import CategoryTree from '../components/CategoryTree.vue';

/* eslint no-debugger: 0 */
export default {
  components: {
    CategoryTree,
  },
  mounted() {
    this.$store.dispatch(init);
  },
  computed: {
    ...mapGetters({
      nodes: 'getNodes',
    }),
  },
  methods: {
    expand({ index, item }) {
      this.$store.dispatch(expand, { index, item });
    },
    add({ index, item }) {
      this.$store.dispatch(add, { index, item });
    },
    deleteNode({ index }) {
      this.$store.dispatch(deleteNodes, { index });
    },
  },
};
</script>
