<template>
  <figure class="effect">
    <img v-if="thumbnail" :src="thumbnail" alt="thumbnail" />
    <figcaption>
      <h2>
        <span>{{ title }}</span>
      </h2>
      <p>{{ text }}</p>
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    title: String,
    thumbnail: String,
    text: {
      type: String,
      required: false,
      default: "More Detail ➔",
    },
  },
};
</script>

<style scoped>
figure {
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

figure img {
  position: relative;
  display: block;
  min-height: 100%;
  max-width: 100%;
  opacity: 0.8;
}

figure figcaption {
  padding: 2em;
  color: #fff;
  text-transform: uppercase;
  font-size: 1.25em;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

figure figcaption::before,
figure figcaption::after {
  pointer-events: none;
}

figure figcaption {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

figure h2 {
  word-spacing: -0.15em;
  font-weight: 300;
}

figure h2 span {
  font-weight: 800;
}

figure h2,
figure p {
  margin: 0;
}

figure p {
  letter-spacing: 1px;
  font-size: 68.5%;
}

figure.effect {
  background: -webkit-linear-gradient(
    top,
    rgba(37, 141, 200, 1) 0%,
    rgba(104, 60, 19, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(37, 141, 200, 1) 0%,
    rgba(104, 60, 19, 1) 100%
  );
}

figure.effect img {
  -webkit-transition: opacity 0.35s;
  transition: opacity 0.35s;
}

figure.effect:hover img {
  opacity: 0.4;
}

figure.effect figcaption::after {
  position: absolute;
  right: 30px;
  bottom: 30px;
  left: 30px;
  height: -webkit-calc(50% - 30px);
  height: calc(50% - 30px);
  border: 7px solid #fff;
  content: "";
  -webkit-transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}

figure.effect:hover figcaption::after {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

figure.effect figcaption {
  text-align: left;
}

figure.effect p {
  position: absolute;
  right: 60px;
  bottom: 60px;
  left: 60px;
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: translate3d(0, -100px, 0);
  transform: translate3d(0, -100px, 0);
}

figure.effect:hover p {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

@media screen and (max-width: 50em) {
  .container figure {
    display: inline-block;
    float: none;
    margin: 10px auto;
    width: 100%;
  }
}

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.content {
  margin: 0 auto;
  max-width: 1000px;
}

.content > h2 {
  clear: both;
  margin: 0;
  padding: 4em 1% 0;
  color: #484b54;
  font-weight: 800;
  font-size: 1.5em;
}
</style>
