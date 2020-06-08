<template>
  <div class="track-list card">
    <h2 v-if="title" class="title">{{ title }}</h2>
    <ol>
      <li v-if="!data" class="message">Loading</li>
      <li v-else v-for="(track, index) in data.track" :key="`track-${index}`"><Track :track="track" /></li>
    </ol>
  </div>
</template>
<script>
import Track from './../track/';
export default {
  name: 'TrackList',
  components: {
    Track
  },
  props: {
    title: {
      type: String,
      default: 'Tracks'
    },
    data: null
  }
}
</script>