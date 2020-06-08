<template>
  <div class="artist-list card">
    <h2 v-if="title" class="title">{{ title }}</h2>
    <ol>
      <li v-if="!data" class="message">Loading</li>
      <li v-else v-for="(artist, index) in data.artist" :key="`artist-${index}`"><Artist :artist="artist" /></li>
    </ol>
  </div>
</template>
<script>
import Artist from './../artist/';
export default {
  name: 'artistList',
  components: {
    Artist
  },
  props: {
    title: {
      type: String,
      default: 'Artists'
    },
    data: null
  }
}
</script>