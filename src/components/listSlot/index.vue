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