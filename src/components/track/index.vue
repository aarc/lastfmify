<template>
  <ul class="track">
    <li v-if="track['@attr'].rank" class="rank">{{ track['@attr'].rank }}</li>
    <li class="name">{{ track.name }}</li>
    <li class="artist">{{ track.artist.name }}</li>
    <li v-if="track.playcount" class="plays">{{ track.playcount }} plays</li>
  </ul>
</template>
<script>
export default {
  name: 'trackItem',
  props: ['track'],
  computed: {
    imageUrl() {
      return this.track.image.find(i => i.size === 'medium')['#text'];
    }
  },
}
</script>
<style lang="scss">
  .track {
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;

    display: grid;
    column-gap: 0.5rem;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "rank track plays";

    li {
      margin: 0;
      padding: 0;
      font-size: 1rem;
      overflow: hidden;
      white-space: nowrap;
    }

    img {
      height: 1rem;
      margin: 0.1rem;
    }

    .rank {
      grid-area: rank;
      grid-row: 1 / span 2;
    }

    .artist {
      font-size:0.8rem;
    }

    .plays {
      font-size: 0.7rem;
      opacity: 0.5;
      grid-area: plays;
      grid-row: 1 / span 2;
    }
  }
</style>