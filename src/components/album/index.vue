<template>
  <div class="album">
    <span v-if="album['@attr'].rank" class="rank">{{ album['@attr'].rank }}</span>
    <img v-if="imageUrl" :src="imageUrl"/>
    <ul class='details'>
      <li class='name'>{{ album.name }}</li>
      <li class='artist'>{{ album.artist.name }}</li>
      <li class='plays' v-if="album.playcount">{{ album.playcount }} plays</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'album',
  props: ['album'],
  computed: {
    imageUrl() {
      return this.album.image.find(i => i.size === 'large')['#text'];
    }
  },
}
</script>
<style lang="scss">
  .album {
    position: relative;
    display: flex;
    margin: 0;
    align-items: center;
    overflow: hidden;
    height: 100%;

    p {
      margin: 0;
      padding: 0;
      font-size: 1rem;
    }

    img {
      width: 100%;
      display: block;
    }

    .rank {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 0rem 0rem 1rem 0rem;
      background: rgba(255,255,255,0.85);
       box-shadow: 1px 1px 7px rgba(0,0,0,0.4);
    }

    img + .details {
      display: none;
    }

    .details {
      flex-direction: column;
      position: absolute;
      padding: 0.5rem;
      margin: 0 1rem 0 0;
      background: rgba(255,255,255,0.85);
      border-radius: 0rem 1rem 1rem 0rem;
      box-shadow: 1px 1px 7px rgba(0,0,0,0.4);

      .artist {
        font-size:0.8rem;
      }

      .plays {
        font-size: 0.7rem;
        text-align: right;
        margin-top: 0.5rem;
      }
    }

    &:hover {
      .details {
        display: flex;
      }
    }
  }
</style>