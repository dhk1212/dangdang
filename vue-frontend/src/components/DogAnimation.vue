<template>
  <div class="box">
    <div class="head">
      <div class="ear ear-left"></div>
      <div class="ear ear-right"></div>
      <div class="face face-left">
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
      </div>

      <div class="face face-mid"></div>

      <div class="face face-right">
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
      </div>

      <div class="eye eye-left"></div>
      <div class="eye eye-right"></div>
      <div class="nose">
        <div class="dot"></div>
      </div>

      <div class="mouth"></div>
      <div class="tongue"></div>
    </div>

    <div class="bubble">
      <DogInDifferentLanguages />
    </div>
  </div>
</template>

<script>
import DogInDifferentLanguages from "../components/DoginDifferentLanguages.vue";

export default {
  components: {
    DogInDifferentLanguages,
  },
};
</script>

<style scoped>
.box {
  position: relative;
  display: block;
  margin: auto;
  width: 400px;
  height: 280px;
  border: 2px solid transparent;
}

.head {
  position: absolute;
  top: 16.5%;
  left: 25%;
  width: 50%;
  height: 67%;
  border-radius: 50%;
}

.ear {
  position: absolute;
  background: #8c7873;
  border-radius: 50%;
  z-index: 1;
}

.ear-left,
.ear-right {
  width: 43%;
  height: 63%;
  top: -10%;
  left: -2%;
  border-radius: 60%/85% 85% 15% 15%;
  transform: rotate(35deg);
}

.ear-right {
  left: auto;
  transform: rotate(-35deg);
  right: -2%;
}

.face {
  position: absolute;
  background: #efe2dd;
  border-radius: 50%;
  z-index: 3;
}

.face-left {
  width: 50%;
  height: 72%;
  top: 16%;
  left: 6%;
}

.face-left .dot {
  position: absolute;
  border-radius: 50%;
  background: #27354a;
  width: 3%;
  height: 3%;
}

.face-left .dot-1 {
  top: 78%;
  left: 66%;
}

.face-left .dot-2 {
  top: 83%;
  left: 60%;
}

.face-left .dot-3 {
  top: 83%;
  left: 70%;
}

.face-mid {
  width: 68%;
  height: 72%;
  top: -7%;
  left: 17%;
  border-radius: 20%/70%;
}

.face-right {
  width: 50%;
  height: 72%;
  top: 15%;
  right: 4%;
}

.face-right .dot {
  position: absolute;
  border-radius: 50%;
  background: #27354a;
  width: 3%;
  height: 3%;
}

.face-right .dot-1 {
  top: 78%;
  right: 66%;
}

.face-right .dot-2 {
  top: 83%;
  right: 60%;
}

.face-right .dot-3 {
  top: 83%;
  right: 70%;
}

.eye {
  position: absolute;
  background-color: #27354a;
  height: 14.5%;
  width: 9.5%;
  z-index: 4;
  border-radius: 50%;
}

.eye-left {
  top: 20%;
  left: 55%;
}

.eye-right {
  top: 20%;
  right: 55%;
}

.nose {
  position: absolute;
  left: 41%;
  top: 55%;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 30px solid #27354a;
  z-index: 5;
}

.mouth {
  position: absolute;
  border-bottom: 50px solid #efe2dd;
  left: 33%;
  top: 35%;
  z-index: 1;
  width: 36%;
  height: 33.5%;
  border-radius: 70px;
}

.tongue {
  position: absolute;
  border-bottom: 50px solid #fc559a;
  border-radius: 74px;
  left: 43%;
  top: 13%;
  width: 16%;
  height: 49.5%;
  z-index: 1;
  animation: tongue 1s infinite;
}

@keyframes tongue {
  0% {
    top: 15%;
  }
  50% {
    top: 17%;
  }
  100% {
    top: 11%;
  }
}

.bubble {
  position: relative;
  display: inline-block;
  padding: 20px;
  background-color: lightblue;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}

.bubble:before {
  content: "";
  position: absolute;
  padding: 7px 15px;
  bottom: -14px;
  right: -2px;
  background-color: lightblue;
  border-bottom-left-radius: 30px 20px;
}

.bubble:after {
  content: "";
  position: absolute;
  padding: 7px 15px;
  bottom: -14px;
  right: -12px;
  background-color: whitesmoke;
  border-bottom-left-radius: 30px 20px;
}
</style>
