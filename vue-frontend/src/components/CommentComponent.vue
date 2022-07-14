<template>
  <div class="comment-box">
    <input class="comment-input" type="text" placeholder="comments..." />
    <button class="comment-button">OK</button>
  </div>
</template>

<script>
export default {
  name: "CommentComponent",
};
</script>

<style scoped>
.comment-box {
  width: 30%;
  position: relative;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 10px;
}

.comment-input {
  width: 100%;
  padding: 15px 45px 15px 15px;
  background: whitesmoke;
  color: #6c6c6c;
  border-radius: 6px;
  border: none;
  transition: all 4s;
}

.comment-button {
  background-color: transparent;
  font-size: 18px;
  padding: 6px 9px;
  margin-left: -45px;
  border: none;
  color: #6c6c6c;
  transition: all 0.4s;
  z-index: 10;
}

.comment-button:hover {
  cursor: pointer;
  color: black;
}
</style>
