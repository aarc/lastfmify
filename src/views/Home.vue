<template>
  <div class="home">
    <p v-if="error">{{ error }}</p>
    <Loading v-if="userProcessing"/>
    <UserInfo v-if="username"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserInfo from './../components/user/';
import Loading from './../components/loading/';

export default {
  name: 'Home',
  components: {
    UserInfo, Loading
  },
  computed: {
    ...mapGetters({
      error: 'getError',
      userProcessing: 'getUserProcessing',
      username: 'getUserName'
    })
  }
}
</script>