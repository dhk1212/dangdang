<template>
  <header class="head">
    <p class="intro" style="font-weight: bold; color: white">Hi! We are</p>
    <h1 class="title">DANGDANG</h1>
  </header>
  <section class="introduction">
    <h2>Introduction</h2>
    <p>We are DangDang. We love our dogs.</p>
  </section>
  <section class="about-us">
    <h2>What is DangDang?</h2>
    <p>
      The DangDang is all about our animals. Here you can share pictures of your
      dog(s) and useful information.
    </p>
    <p>DangDang is here to support you to make your dog's life happier.</p>
    <p>Help us to do that!</p>
  </section>
</template>

<script>
export default {
  name: "AboutUsComponent",
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 60px;
  font-family: "Cinzel", serif;
  text-transform: uppercase;
  color: #f1c863;
}

.intro,
.title {
  text-align: center;
}

.head {
  padding: 6em;
  background-image: url("../assets/aboutus.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

section {
  margin-left: 600px;
}

h2 {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: left;
  font-size: 30px;
  font-family: "Montserrat", sans-serif;
}

p {
  text-align: left;
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
}

.about-us {
  margin-bottom: 200px;
}
</style>
