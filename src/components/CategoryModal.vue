<template>
  <div class="item-modal" v-if="modalHeader">
    <div class="modal-container">
      <div>{{ modalHeader }}</div>
      <input v-model="inputValue"/>
      <div class="actions-container">
        <button>Save</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalHeader: {
      type: String,
      default: '',
    },
    categoryName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
  watch: {
    categoryName: {
      immediate: true,
      handler(newVal) {
        this.inputValue = newVal;
      },
    },
  },
};
</script>

<style scoped lang="scss">
  .item-modal {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #3f3f3f;
    opacity: 0.4;
    top: 0;
    bottom: 0;
    .modal-container {
      position: absolute;
      width: 50%;
      height: 50%;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1;
      .actions-container {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>
