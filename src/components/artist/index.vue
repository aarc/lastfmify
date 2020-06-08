<template>
  <ul class="artist">
    <li v-if="artist['@attr'].rank" class="rank">{{ artist['@attr'].rank }}</li>
    <li class="name">{{ artist.name }}</li>
    <li v-if="artist.playcount" class="plays">{{ artist.playcount }} plays</li>
  </ul>
</template>
<script>
export default {
  name: 'artist',
  props: ['artist'],
  computed: {
    imageUrl() {
      return this.artist.image.find(i => i.size === 'medium')['#text'];
    }
  },
}
</script>
<style lang="scss">
  .artist {
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;

    display: grid;
    column-gap: 0.5rem;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "rank artist plays";

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

    .name {
      grid-area: artist;
      grid-row: 1 / span 2;
    }


    .plays {
      font-size: 0.7rem;
      opacity: 0.5;
      grid-area: plays;
      grid-row: 1 / span 2;
    }
  }
</style>