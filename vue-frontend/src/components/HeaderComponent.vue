<template>
  <header>
    <div>
      <a href="/">
        <img
          src="@/assets/dogWithOwner.png"
          style="width: 50px; height: 50px"
          alt="logo"
        />
      </a>
    </div>
    <h1>DANGDANG</h1>
    <div class="container">
      <div class="links">
        <span v-if="isAuthenticated && user">
          Welcome <a class="link" href="/profile">{{ user.username }}</a>
        </span>
        <a class="link" href="/">Home</a>
        <a v-if="!isAuthenticated" class="link" href="/login">Login</a>
        <a v-else class="link" @click="logout()">Logout</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    user: Object,
    isAuthenticated: Boolean,
  },
  methods: {
    logout() {
      localStorage.removeItem("IdToken");
      window.location.reload();
    },
  },
};
</script>
<style scoped>
header {
  text-align: center;
  margin-top: 30px;
}

.loginout {
  width: 20px;
  height: 20px;
}

h1 {
  margin-top: 0;
}

.container {
  padding: 10px;
  display: flex;
  justify-content: right;
}

.link {
  color: black;
  font-size: 20px;
  margin: 0px 20px 0px 20px;
  text-decoration: none;
  position: relative;
  cursor: pointer;
}

.link:after {
  bottom: -4px;
  content: "";
  display: block;
  height: 2px;
  left: 0;
  position: absolute;
  background: black;
  opacity: 0.6;
  transition: width 0.3s ease 0s, opacity 0.3s ease 0s;
  width: 0;
}

.link:hover:after {
  width: 100%;
  opacity: 0.9;
}
</style>
