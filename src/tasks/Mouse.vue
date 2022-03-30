<template>
  <view class="task-mouse-container">
    <view class="text-wrap">
      <view class="text">
        打中次数数：
        <text class="score">
          {{ clickNum || 0 }}
        </text>
      </view>
      <view class="text">
        剩余时间还有：
        <text class="score">
          {{ continueTime || 0 }}
        </text>
      </view>
    </view>
    <view class="mouse-content">
      <view
        v-for="(item, index) in holeLists"
        :key="index"
        class="hole-wrap"
      >
        <view class="hole" />
        <view class="mouse-wrap">
          <image
            v-show="!item.isHide"
            class="mouse-img"
            src="../assets/image/mouse.gif"
            :style="{ top: item.top + 'vh' }"
            @tap="tapMouse(index)"
          />
        </view>
      </view>
    </view>
    <view
      v-if="isEnd"
      class="show-dialog"
    >
      <view
        class="show-text"
        :class="{ 'success-text': !isFail }"
      >
        {{ !isFail ? "赶走小老鼠了~~" : "小老鼠回洞睡觉了！" }}
      </view>
      <view
        v-if="isFail"
        class="restart-btn"
        @tap="restart"
      >
        再试一次
      </view>
      <view
        v-if="!isFail"
        class="restart-btn"
        @tap="goNext"
      >
        继续前进
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { throttle } from "../utils/tools";
import { MOUSE_CONFIG } from "../constant";
export default {
  data() {
    return {
      holeLists: [
        {
          isHide: true,
          top: 10,
        },
        {
          isHide: true,
          top: 0,
        },
        {
          isHide: true,
          top: 20,
        },
        {
          isHide: true,
          top: 20,
        },
        {
          isHide: true,
          top: 20,
        },
        {
          isHide: true,
          top: 20,
        },
        {
          isHide: true,
          top: 20,
        },
        {
          isHide: true,
          top: 20,
        },
        {
          isHide: true,
          top: 20,
        },
      ],
      isEnd: false,
      isFail: false,
      target: MOUSE_CONFIG.target,
      clickNum: 0,
      continueTime: MOUSE_CONFIG.continueTime,
    };
  },
  created() {
    this.initMouse();
    this.beginCountdown();
  },
  methods: {
    initMouse() {
      const randomNum = Math.floor(Math.random() * 9); // 0-8
      this.outHole(randomNum);
    },
    // 开始倒计时
    beginCountdown() {
      clearInterval(this.mousePeriodTimer);
      this.mousePeriodTimer = setInterval(() => {
        if (this.continueTime <= 0) {
          clearInterval(this.mousePeriodTimer);
          this.end();
          return;
        }
        this.continueTime--;
      }, 1000);
    },
    // 出洞
    outHole(holeIndex) {
      const currentHole = this.holeLists[holeIndex];
      currentHole.isHide = false;
      clearInterval(this.outTimer);
      this.outTimer = setInterval(() => {
        if (currentHole.top <= 5) {
          clearInterval(this.outTimer);
          this.stayHole(holeIndex);
        }
        currentHole.top -= 5;
      }, 100);
    },
    // 停留
    stayHole(holeIndex) {
      clearTimeout(this.stayTimer);
      this.stayTimer = setTimeout(() => {
        this.inHole(holeIndex);
      }, 200);
    },
    // 进洞
    inHole(holeIndex) {
      const currentHole = this.holeLists[holeIndex];
      clearInterval(this.inTimer);
      this.inTimer = setInterval(() => {
        if (currentHole.top >= 20) {
          clearInterval(this.inTimer);
          currentHole.isHide = true;
          this.initMouse();
        }
        currentHole.top += 5;
      }, 100);
    },
    tapMouse(index) {
      if (this.isEnd) return;
      clearInterval(this.outTimer);
      console.log("tap");
      this.inHole(index);
      throttle(() => {
        this.clickNum++;
        if (this.clickNum >= this.target) {
          this.end();
        }
      }, 100)();
    },
    end() {
      this.isEnd = true;
      // 重置
      this.holeLists.forEach(item => {
        item.isHide = true
        item.top = 20
      })
      // 清空所有定时器，wx有时会有bug
      clearInterval(this.outTimer);
      clearInterval(this.inTimer);
      clearTimeout(this.stayTimer);
      clearInterval(this.mousePeriodTimer);
      if (this.clickNum < this.target) {
        this.isFail = true;
      }
    },
    restart() {
      this.isEnd = false;
      this.continueTime = MOUSE_CONFIG.continueTime;
      this.isFail = false;
      this.initMouse();
      this.beginCountdown();
    },
    goNext() {
      Taro.navigateTo({
        url: "/pages/index/index?sceneIndex=18",
      });
    },
  },
};
</script>

<style lang="scss">
.task-mouse-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/image/mouseBg.png");
  background-size: cover;
  .text-wrap {
    position: absolute;
    z-index: 9;
    width: 96vw;
    padding: 1.2vw 1vw;
    display: flex;
    justify-content: space-between;
    .score {
      color: #f4572f;
      font-weight: bold;
    }
  }
  .mouse-content {
    display: flex;
    flex-wrap: wrap;
    .hole-wrap {
      position: relative;
      width: 33vw;
      height: 23vh;
      .hole {
        position: absolute;
        width: 30vw;
        height: 8vh;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        background-color: #000;
        border-radius: 50%;
      }
      .mouse-wrap {
        position: absolute;
        width: 30vw;
        height: 20vh;
        overflow: hidden;
        .mouse-img {
          position: absolute;
          width: 30vw;
          height: 20vh;
          top: 20vh;
        }
      }
    }
  }
  .show-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60vw;
    height: 20vh;
    transform: translate(-50%, -50%);
    border: 13px solid #c68425;
    border-radius: 70px 70px 40px 40px;
    background-color: #f8e570;
    padding: 20px;
    color: #000;
    font-weight: bolder;
    text-align: center;
    .show-text {
      font-size: 50px;
      &.success-text {
        font-size: 66px;
        color: #f4572f;
        text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 8px #fff, 0 0 10px #a8416c,
          0 0 12px #a8416c;
      }
    }
    .restart-btn {
      position: absolute;
      bottom: 4vh;
      left: 50%;
      transform: translateX(-50%);
      padding: 20px 30px;
      border-radius: 50px 50px 30px 30px;
      border: 6px solid #aea71d;
      background-color: #7fe348;
    }
  }
}
</style>