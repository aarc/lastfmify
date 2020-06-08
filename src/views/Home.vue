<template>
  <div class="home">
    <p v-if="error">{{ error }}</p>
    <UserInfo v-if="username"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserInfo from './../components/user/';

export default {
  name: 'Home',
  components: {
    UserInfo
  },
  computed: {
    ...mapGetters({
      error: 'getError',
      username: 'getUserName'
    })
  }
}
</script>