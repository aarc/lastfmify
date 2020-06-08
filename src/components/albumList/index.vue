<template>
  <div class="album-list card">
    <h2 v-if="title" class="title">{{ title }}</h2>
    <ol>
      <li v-if="!data" class="message">Loading</li>
      <li v-else v-for="(album, index) in data.album" :key="`album-${index}`"><Album :album="album" /></li>
    </ol>
  </div>
</template>
<script>
import Album from './../album/';
export default {
  name: 'AlbumList',
  components: {
    Album
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