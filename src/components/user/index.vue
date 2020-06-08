<template>
  <div v-if="info" class="user-info">
    <ul class="user-card card">
      <li class='avatar'><img :src="avatarUrl"/></li>
      <li class='username'><a :href="userInfo.url">{{ userInfo.name }}</a></li>
      <li class='scrobbles'>{{ userInfo.playcount }} scrobbles</li>
      <li class='country'>{{ userInfo.country }}</li>
    </ul>
    <div class="user-charts">
      <ArtistList :data="top.artists" title="Top Artists" />
      <TrackList :data="top.tracks" title="Top Tracks" />
      <AlbumList :data="top.albums" title="Top Albums" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ArtistList from './../artistList/';
import AlbumList from './../albumList/';
import TrackList from './../trackList/';

export default {
  name: 'userInfo',
  components: {
    ArtistList, TrackList, AlbumList
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      info: 'getUserInfo',
      top: 'getUserTop'
    }),
    userInfo() {
      const userInfo = {};
      ['country', 'name', 'playcount', 'url'].forEach(k => userInfo[k] = this.info[k]);
      return userInfo;
    },
    avatarUrl() {
      return this.info.image.find(i => i.size === 'medium')['#text'];
    }
  },
  mounted() {
    this.$store.dispatch('fetchUserInfo');
    this.$store.dispatch('fetchUserTopAll');
  },
}
</script>
<style lang="scss">
  .user-card {
    margin:0.5rem;
    padding: 0;
    display: grid;
    column-gap: 0.5rem;
    grid-template-columns: auto 1fr;
    grid-template-areas: "avatar user";
    
    li {
      grid-column: user;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .avatar {
      grid-area: avatar;
      grid-row: 1 / span 3;

      img {display: block;}
    }
  }
  .user-charts {
    display: flex;
    align-items: flex-start;
    margin: 0;
    
    .artist-list,
    .track-list {
      flex: 1 2;
    }
    
    .album-list {
      flex: 2 1;
    }

  }
</style>