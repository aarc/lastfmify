<template>
  <div class="list card" v-bind:class="classList">
    <h2 v-if="title" class="title">{{ title }}</h2>
    <ol v-if="items">
      <li
        v-for="item in items"
        v-bind:key="item.id"
      >
        <slot name="item" v-bind:item="item">
          {{ item }}
        </slot>
      </li>
      <Loading v-if="processing" />
    </ol>
    <Loading v-else />
  </div>
</template>
<script>
import Loading from './../loading/';

export default {
  name: 'listSlot',
  components: {
    Loading
  },
  props: {
    attr: {},
    processing: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'List'
    },
    items: null,
    classList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>
<style lang="scss">
  .list {
    ol {
      position: relative;

      .loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.85);
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
</style>