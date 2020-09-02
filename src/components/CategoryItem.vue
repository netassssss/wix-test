<template>
  <div class="category-item-container">
    <div :class="{'cursor-pointer': !isLeaf}"
         :style="{ 'padding-left': `${indent * 30}px` }">
      <li @click="expand">
        <div :class="{
      'category-minus': hidePlus,
      'category-sign': !hidePlus,
      }"
             v-if="!isLeaf"></div>
        <div :class="{'category-filler': !isLeaf}">{{ name }}</div>
      </li>
    </div>
    <button @click="addNode">Add</button>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    isLeaf: {
      type: Boolean,
      default: true,
    },
    indent: {
      type: Number,
      default: 0,
    },
    hidePlus: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    expand() {
      if (!this.isLeaf) this.$emit('expand');
    },
    addNode() {
      this.$emit('add');
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "../styles/colors";
  @mixin sign() {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: $basic_font_color;
    position: relative;
    &::before {
      content: " ";
      position: absolute;
      display: block;
      background-color: #fff;
      width: 6px;
      margin-left: -3px;
      left: 50%;
      top: 5px;
      bottom: 5px;
    }
  }
  .category-item-container {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    li {
      color: $basic_font_color;
      font-size: 16px;
      height: 100%;
      display: flex;
      align-items: center;
      .category-sign {
        @include sign();
        &::after {
          content: " ";
          position: absolute;
          display: block;
          background-color: #fff;
          height: 6px;
          margin-top: -3px;
          top: 50%;
          left: 5px;
          right: 5px;
        }
      }
      .category-minus {
        @include sign();
      }
      .category-filler {
        padding-left: 10px;
      }
    }
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>
