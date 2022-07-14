<template>
  <div>
    <span id="spin"></span>
  </div>
</template>

<style scoped>
#spin:after {
  content: "";
  animation: spin 6s linear infinite;
}

@keyframes spin {
  0% {
    content: "woof woof";
  }
  10% {
    content: "멍멍";
  }
  20% {
    content: "wau wau";
  }
  30% {
    content: "hav hav";
  }
  40% {
    content: "guau guau";
  }
  50% {
    content: "гав гав";
  }
  60% {
    content: "bau bau";
  }
  70% {
    content: "汪 汪";
  }
  80% {
    content: "वूफ वूफ";
  }
  90% {
    content: "guk guk";
  }
  100% {
    content: "aw aw";
  }
}
</style>
