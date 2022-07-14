<template>
  <figure class="effect" @click="$emit('click')">
    <img :src="assetUrl" alt="category_thumbnail" />
    <figcaption>
      <h2>{{ headline }}</h2>
      <p>More Detail ➔</p>
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    assetUrl: String,
    headline: String,
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  font-size: 30px;
}

p {
  text-align: center;
  font-size: 20px;
}

figure {
  position: relative;
  overflow: hidden;
  margin: 10px 1%;
  min-width: 320px;
  max-width: 480px;
  max-height: 360px;
  width: 48%;
  background-color: #3085a3;
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

figcaption {
  padding: 2em;
  color: whitesmoke;
  text-transform: uppercase;
  font-size: 1.25em;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

figcaption::before,
figcaption::after {
  pointer-events: none;
}

figcaption,
figcaption > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 280px;
}

figcaption > a {
  z-index: 1000;
  text-indent: 200%;
  white-space: nowrap;
  font-size: 0;
  opacity: 0;
}

h2 {
  word-spacing: -0.15em;
  font-weight: 300;
}

h2 span {
  font-weight: 800;
}

h2,
p {
  margin: 0;
}

p {
  letter-spacing: 1px;
  font-size: 68.5%;
}

.effect {
  background: #9e5406;
}

.effect img {
  opacity: 0.7;
  -webkit-transition: opacity 0.35s;
  transition: opacity 0.35s;
}

.effect:hover img {
  opacity: 0.4;
}

.effect figcaption::before,
.effect figcaption::after {
  position: absolute;
  top: 30px;
  right: 30px;
  bottom: 30px;
  left: 30px;
  content: "";
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transfom 0.35s;
  transition: opacity 0.35s, transform 0.35s;
}

.effect figcaption::before {
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: scale(0, 1);
  transform: scale(0, 1);
}

.effect figcaption::after {
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
  -webkit-transform: scale(1, 0);
  transform: scale(1, 0);
}

.effect h2 {
  padding-top: 30%;
  -webkit-transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
  -webkit-transform: translate3d(0, -20px, 0);
  transform: translate3d(0, -20px, 0);
}

.effect p {
  padding: 20px 2.5em;
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: translate3d(0, 20px, 0);
  transform: translate3d(0, 20px, 0);
}

.effect:hover figcaption::before,
.effect:hover figcaption::after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.effect:hover h2,
.effect:hover p {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>
