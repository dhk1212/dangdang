<template>
  <section class="login">
    <div class="login-box">
      <div class="left">
        <div class="top-link"><a href="/">return home</a></div>
        <div class="contact">
          <h3>Register</h3>
          <input v-model="firstName" type="text" placeholder="first name" />
          <input v-model="lastName" type="text" placeholder="last name" />
          <input v-model="username" type="text" placeholder="username" />
          <input v-model="email" type="text" placeholder="email" />
          <input v-model="password" type="password" placeholder="password" />
          <input type="password" placeholder="repeat password" />
          <button class="submit" @click="createLogin()">Register</button>
        </div>
      </div>
      <div class="right">
        <div class="right-text">
          <h2>DANGDANG</h2>
          <h4>We love our dogs</h4>
        </div>
        <div class="right-inductor"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { Api } from "../../Api";

export default {
  name: "RegisterView",
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async createLogin() {
      await Api.createLogin(
        this.firstName,
        this.lastName,
        this.username,
        this.email,
        this.password
      );
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
h3,
.register {
  text-align: center;
}

button {
  cursor: pointer;
}

.login {
  height: 1000px;
  width: 100%;
  background: #e6e1ec;
  position: relative;
}

.login-box {
  width: 1050px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: whitesmoke;
  border-radius: 10px;
  box-shadow: 1px 4px 22px -8px #0004;
  display: flex;
  overflow: hidden;
}

.login-box .left {
  width: 41%;
  height: 100%;
  padding: 25px 25px;
}

.login-box .right {
  width: 59%;
  height: 100%;
}

.left .top-link a {
  color: black;
  font-weight: 400;
}

.left .top-link {
  height: 20px;
}

.left .contact {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 73%;
  margin-top: auto;
}

.left h4 {
  text-align: center;
  margin-bottom: 40px;
}

.left input {
  border: none;
  width: 80%;
  margin: 15px 0px;
  border-bottom: 1px solid #4f30677d;
  padding: 7px 9px;
  overflow: hidden;
  background: transparent;
  font-weight: 600;
  font-size: 14px;
}

.left {
  background: linear-gradient(-46deg, #dcd7e0, #fff);
}

.submit {
  border: none;
  padding: 15px 70px;
  border-radius: 8px;
  display: block;
  margin: 20px auto auto;
  background: #c87487;
  color: whitesmoke;
  font-weight: bold;
  box-shadow: 1px 4px 22px -8px #0004;
}

.right {
  background: linear-gradient(
      212deg,
      rgba(0, 132, 218, 0.33) 0%,
      rgba(165, 219, 255, 0.33) 100%
    ),
    url("../../assets/loginAgi.jpg");
  color: whitesmoke;
  position: relative;
}

.right .right-text {
  height: 100%;
  position: relative;
  transform: translate(0%, 45%);
}

.right-text h2 {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 50px;
  font-weight: 500;
}

.right-text h4 {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 19px;
  font-weight: 400;
}

.right .right-inductor {
  position: absolute;
  width: 70px;
  height: 7px;
  background: #fff0;
  left: 50%;
  bottom: 70px;
  transform: translate(-50%, 0%);
}

.top-link img {
  width: 28px;
  padding-right: 7px;
  margin-top: -3px;
}
</style>
