<template>
  <form class='user-search' @submit='onSubmit'>
    <input type="text" name="username" v-model="username" placeholder="username"/>
    <button type="submit">Fetch</button>
  </form>
</template>
<script>
export default {
  name: 'UserSearch',
  data() {
    return {
      username: ''
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$store.dispatch('fetchNewUser', this.username);
    }
  }
}
</script>
<style lang="scss">
.user-search {
  input {
    padding: 0.25rem 0.5rem;
  }

  button {
    padding: 0.25rem 0.5rem;
  }
}
</style>