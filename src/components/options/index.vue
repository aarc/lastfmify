<template>
  <div class="options card">
    <button
      v-for="(option, index) in options"
      @click="onClick(option.value)"
      type="button"
      :key="`option-${index}`"
      :class="{
        'active': activeOption === option.value
      }"
      :disabled="activeOption === option.value"
    >{{ option.label }}</button>
  </div>
</template>
<script>
export default {
  name: 'Options',
  props: {
    activeOption: {
      type: String,
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    onClick(optionValue) {
      this.$emit('optionSelect', optionValue);
    }
  }
}
</script>
<style lang="scss">
.options {
  display: flex;
  padding: 0.5rem;

  button {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;

    &.active {
      cursor: default;
    }
  }
}
</style>