<template>
  <div class="container">
    <img src="@/assets/plus.png" alt="thumbnail" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  position: relative;
  float: left;
  overflow: hidden;
  margin: 10px 1%;
  min-width: 320px;
  max-width: 480px;
  max-height: 360px;
  width: 48%;
  background: #3085a3;
  text-align: center;
  cursor: pointer;
}
img {
  position: relative;
  display: block;
  min-height: 100%;
  max-width: 100%;
  opacity: 0.8;
}
</style>
