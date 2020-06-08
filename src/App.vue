<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from './components/header/'

export default {
  name:"app",
  components: {
    Header
  },
  computed: {
    ...mapState({
      token: s => s.auth.token,
      session: s => s.auth.session,
    })
  },
  mounted() {
    const query = Object.assign({}, this.$route.query);
    this.$store.dispatch('loadAuthState');

    if (query.token) {
      this.$store.commit('setToken', query.token);
      delete query.token;
      this.$router.replace({ query });
    }

    if (this.token && !this.session) {
      this.$store.dispatch('getSession');
    }
  },
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Muli&display=swap');
  html {
    font-family: 'Muli', sans-serif;
  }
  a {
    cursor: pointer
  }

  .rank {
    font-family: 'Anton', sans-serif;
    width: 2.25rem;
    height: 2.25rem;
    text-align: center;
    line-height: 2.25rem;
    background: #fff;
    border-radius: 1rem;
  }

  .card {
    background: #ececec;
    margin: 0.5rem;
    border: 1px solid #bfbfbf;

    ol {
      margin: 0.5rem;
      padding: 0;
      list-style: none;

      > li {
        padding: 0.3rem 0;
      }
      > li + li {
        border-top: 1px solid #d2d2d2;
      }
    }

    h2 {
      margin: 0;
      background: #fff;
      padding: 0.5rem;
    }
  }
</style>