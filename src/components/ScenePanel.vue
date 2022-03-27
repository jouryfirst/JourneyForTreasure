<template>
  <view
    class="scene-panel-container"
    @tap="tapScene"
  >
    <view
      class="talk-dialog"
      :class="isLeft ? 'left-talk' : 'right-talk'"
      :style="{ height: textHeight + 'vh' }"
    >
      <slot />
    </view>
    <view
      class="role-wrap"
      :class="isLeft ? 'left-role' : 'right-role'"
    >
      <image
        class="role-img"
        :src="roleImg"
      />
    </view>
    <view
      v-if="hasChoose"
      class="choose-btn"
    >
      <view class="start-btn" @tap="startGame">
        开  始
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    isLeft: {
      type: Boolean,
      default: false,
    },
    roleImg: {
      type: String,
      default: require("../assets/image/guardian.gif"),
    },
    textHeight: {
      type: [String, Number],
      default: 36,
    },
    hasChoose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    tapScene() {
      if (this.hasChoose) {
        return
      }
      this.$emit("tapScene");
    },
    startGame () {
      this.$emit('startGame')
    }
  },
};
</script>

<style lang="scss">
.scene-panel-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  .talk-dialog {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 80vw;
    padding: 40px;
    &.left-talk {
      border-radius: 30% 20% 32% 44%;
      background-color: #fefeee;
      border: 16px solid #ed513c;
    }
    &.right-talk {
      border-radius: 20% 30% 44% 32%;
      background-color: #3073b4;
      border: 16px solid #62a9d2;
      color: #fff;
    }
  }
  .role-wrap {
    position: absolute;
    .role-img {
      width: 366px;
      height: 334px;
    }
    &.left-role {
      left: 1vw;
      bottom: 3vh;
      .role-img {
        width: 404px;
        height: 498px;
      }
    }
    &.right-role {
      right: 1vw;
      bottom: 3vh;
    }
  }
  .choose-btn {
    position: absolute;
    bottom: 3vh;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px 30px;
      border-radius: 50px 50px 30px 30px;
      border: 6px solid #aea71d;
      background-color: #7fe348;
      font-weight: bolder;
  }
}
</style>