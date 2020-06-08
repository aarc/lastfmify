<template>
  <div class="auth">
    <h1>Authed</h1>
    <p v-if="token">SUCCESS: redirecting</p>
    <p v-else>ERROR</p>
  </div>
</template>
<script>
export default {
  name: 'AUTH',
  data() {
    return {
      token: null
    }
  },
  mounted() {
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
      localStorage.token = this.token;
    }
    setTimeout(() => {
      this.$router.push('/');
    }, 1000);
  },
}
</script>