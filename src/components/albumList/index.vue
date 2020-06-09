<template>
  <fragment>
    <ListSlot
      :classList="['album-list']"
      v-bind:attr="data['@attr']"
      v-bind:items="data.album"
      title="Top Album"
    >
      <template v-slot:item="{ item }">
        <Album :album="item" />
      </template>
    </ListSlot>
  </fragment>
</template>
<script>
import { Fragment } from 'vue-fragment'
import ListSlot from './../listSlot/';
import Album from './../album/';

export default {
  name: 'AlbumList',
  components: {
    Album, ListSlot, Fragment
  },
  props: {
    title: {
      type: String,
      default: 'Albums'
    },
    data: null
  }
}
</script>
<style lang="scss">
  .album-list ol {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    flex-basis: auto;
    li {
      list-style: none;
      flex-basis: 20%;
      padding: 0;


      & + li {
        border: 0;
      }
    }
  }
</style>