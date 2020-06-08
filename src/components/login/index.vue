<template>
  <div :class="isAuthed ? 'logout': 'login'">
    <a
      v-if="isAuthed"
      @click="logOut"
      @keyup.enter="logOut"
      role="button"
      tabindex="0">
      Logout
    </a>
    <a v-else
      :href="'http://www.last.fm/api/auth/?api_key=' + apiKey"
      role="button"
    >
      Login with Last.fm
    </a>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Api from './../../api/';
export default {
  name: 'Login',
  data() {
    return {
      apiKey: Api.apiKey
    }
  },
  methods: {
    ...mapActions({
      logOut: 'logOut'
    }),
  },
  computed: {
    ...mapGetters({
      isAuthed: 'isAuthed'
    })
  }
}
</script>
<style lang="scss">
</style>