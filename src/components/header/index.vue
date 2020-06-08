<template>
  <header>
    <Login/>
    <UserSearch/>
  </header>
</template>
<script>
import Login from "./../login/";
import UserSearch from "./../userSearch/";
export default {
  name: 'Header',
  components: {
    UserSearch, Login
  }
}
</script>
<style lang="scss">
  header {
    display: flex;
    padding: 0.5rem;

    .user-search {
      flex-grow: 2;
    }

    .login {
      order: -1;
    }

    .logout {
      order: 99;
    }
  }
</style>