<template>
  <div class="home">
    <p v-if="error">{{ error }}</p>
    <UserInfo v-if="!authProblem"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import UserInfo from './../components/user/';

export default {
  name: 'Home',
  components: {
    UserInfo
  },
  computed: {
    ...mapState({
      error: s => s.auth.error,
      session: s => s.auth.session,
      sessionUser: s => s.auth.sessionUser,
    }),
    authProblem() {
      return !this.sessionUser || this.sessionUser == 'undefined' || !this.session;
    }
  }
}
</script>