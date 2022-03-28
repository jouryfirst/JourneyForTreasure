<template>
  <view class="task-riddle-container">
    <view class="talk-dialog">
      <text class="output-text">
        {{ riddleText }}
      </text>
    </view>
    <view class="role-wrap">
      <image
        class="role-img"
        :src="roleImg"
      />
    </view>
  </view>
</template>

<script>
import { RIDDLE_LISTS } from '../constant'
export default {
  data() {
    return {
      roleImg: require("../assets/image/mushroom.gif"),
      riddleIndex: 1,
      riddleText: '什么尖尖海里游？'
    };
  },
};
</script>

<style lang="scss">
.task-riddle-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/image/forest.png');
    background-size: cover;
  .talk-dialog {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 80vw;
    padding: 40px;
    border-radius: 20% 30% 44% 32%;
    background-color: #3073b4;
    border: 16px solid #62a9d2;
    color: #fff;
  }
  .role-wrap {
    position: absolute;
    right: 1vw;
    bottom: 3vh;
    .role-img {
      width: 366px;
      height: 334px;
    }
  }
}
</style>