<template>
  <button v-if="!link" class="base-btn">
    <slot></slot>
  </button>
  <router-link v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  to: {
    type: String,
    required: false,
    default: false,
  },
};
</script>

<style lang="scss" scoped>
.base-btn {
  border: 3px solid black;
  outline: 0 solid transparent;
  background-color: $primary-color;
  border-radius: 10px;
  color: white;
  font-weight: bolder;

  &:hover {
    cursor: pointer;
  }
}
</style>