<template>
  <div :class="isAuthed ? 'logout': 'login'">
    <a
      v-if="isAuthed"
      @click="logOut"
      @keyup.enter="logOut"
      role="button"
      tabindex="0">
      Log out
    </a>
    <a v-else
      :href="'http://www.last.fm/api/auth/?api_key=' + apiKey"
      role="button"
    >
      Login
    </a>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Config from './../../../config.js';
export default {
  name: 'Login',
  data() {
    return {
      apiKey: Config.apiKey
    }
  },
  methods: {
    ...mapActions({
      logOut: 'logOut'
    }),
  },
  computed: {
    ...mapState({
      session: s => s.auth.session,
      sessionUser: s => s.auth.sessionUser,
    }),
    isAuthed() {
      return !(!this.sessionUser || this.sessionUser == 'undefined' || !this.session);
    }
  }
}
</script>
<style lang="scss">
</style>