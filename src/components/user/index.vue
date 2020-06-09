<template>
  <div v-if="info" class="user-info">
    <div class="user-header">
      <ul class="user-card card">
        <li class='avatar'><img :src="avatarUrl"/></li>
        <li class='username'><a :href="userInfo.url">{{ userInfo.name }}</a></li>
        <li class='scrobbles'>{{ userInfo.playcount }} scrobbles</li>
        <li class='country'>{{ userInfo.country }}</li>
      </ul>
      <Options
        @optionSelect="setUserPeriod"
        :activeOption="userPeriod"
        :options="[
          {
            label: 'All Time',
            value: 'overall'
          },
          {
            label: '7 Days',
            value: '7day'
          },
          {
            label: '1 Month',
            value: '1month'
          },
          {
            label: '3 Months',
            value: '3month'
          },
          {
            label: '6 Months',
            value: '6month'
          },
          {
            label: '12 Months',
            value: '12month'
          }
      ]"/>
    </div>
    <div class="user-charts">
      <ListSlot
        v-bind:attr="top.artists['@attr']"
        v-bind:items="top.artists.artist"
        title="Top Artists"
        :classList="['artist-list']"
        :processing="top.artists.processing"
      >
        <template v-slot:item="{ item }">
          <Artist :artist="item" />
        </template>
      </ListSlot>
      <ListSlot
        v-bind:attr="top.tracks['@attr']"
        v-bind:items="top.tracks.track"
        title="Top Tracks"
        :processing="top.tracks.processing"
        :classList="['track-list']"
      >
        <template v-slot:item="{ item }">
          <Track :track="item" />
        </template>
      </ListSlot>

      <AlbumList :data="top.albums" title="Top Albums" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Artist from './../artist/';
import AlbumList from './../albumList/';
import Track from './../track/';
import ListSlot from './../listSlot/';
import Options from './../options/';

export default {
  name: 'userInfo',
  components: {
    Track, AlbumList, ListSlot, Artist, Options
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      info: 'getUserInfo',
      top: 'getUserTop',
      userPeriod: 'getUserPeriod'
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
  methods: {
    ...mapActions(['setUserPeriod'])
  }
}
</script>
<style lang="scss">
  .user-header {
    display: flex;
    flex-wrap: wrap;
  }

  .user-card {
    flex-grow: 1;
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