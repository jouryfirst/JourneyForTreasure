<template>
  <view class="task-rain-container">
    <view class="text-wrap">
      <view class="text">
        抓到雪花数：
        <text class="score">
          {{ catchNum || 0 }}
        </text>
      </view>
      <view class="text">
        降雪时间还有：
        <text class="score">
          {{ continueTime || 0 }}
        </text>
      </view>
    </view>
    <view
      v-if="countDownVisible"
      class="before-start-wrap"
    >
      <view>准备下雪啦</view>
      <view class="num">
        {{ beforeStartTime }}
      </view>
    </view>
    <view
      ref="starSection"
      class="star-energy-section"
    >
      <view
        v-for="(item, index) in rainParams"
        :key="index"
        class="move_1"
        :style="{
          left: item.left,
          animationDuration: item.durTime,
          webkitAnimationDuration: item.durTime,
        }"
        :data-index="index"
      >
        <view
          class="view-a"
          :style="{ transform: item.transforms }"
          @touchstart="tapSnowflake(item, index)"
        >
          <image
            class="star-stone-rain-img"
            :class="[item.isHide ? 'hide-star-stone' : '']"
            src="../assets/image/snow.png"
          />
        </view>
      </view>
    </view>
    <view
      v-if="endVisible"
      class="show-dialog"
    >
      <view
        class="show-text"
        :class="{ 'success-text': isCatched }"
      >
        {{ isCatched ? "雪花抓够了~~" : "雪花不够！" }}
      </view>
      <view
        v-if="!isCatched"
        class="restart-btn"
        @tap="restart"
      >
        再试一次
      </view>
      <view
        v-if="isCatched"
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
import { SNOW_CONFIG } from "../constant";

export default {
  data() {
    return {
      beforeStartTime: 5, // 开始前倒计时
      countDownTimer: null,
      countDownVisible: true,
      rainParams: [],
      catchNum: 0, // 捕获雪花数
      target: SNOW_CONFIG.target, // 目标数
      continueTime: 0, // 降雪时长
      snowPeriodTimer: null,
      endVisible: false, // 结束文字
      isCatched: false, // 雪花是否足够
    };
  },
  created() {
    this.initSnow();
  },
  methods: {
    initSnow() {
      const { continueTime, snowNum } = SNOW_CONFIG;
      this.rainConfig = {
        continueTime, // 降雪时长
        snowNum, // 一共多少个雪花
      };
      this.catchNum = 0
      this.duration = this.rainConfig.continueTime * 1000;
      this.continueTime = this.rainConfig.continueTime;
      clearInterval(this.countDownTimer);
      this.countDownTimer = setInterval(() => {
        if (this.beforeStartTime <= 0) {
          clearInterval(this.countDownTimer);
          this.beforeSnow();
        }
        this.beforeStartTime--;
      }, 1000);
    },
    // 预备下雪
    beforeSnow() {
      this.countDownVisible = false;
      this.rainParams = []; // 清空
      clearInterval(this.snowPeriodTimer); // 设置红包雨进行多少秒得倒计时
      this.startSnow(); // 开始进行红包雨动画
      this.beginSnowCountdown(); // 开始进行红包雨倒计时
    },

    // 开始倒计时
    beginSnowCountdown() {
      clearInterval(this.snowPeriodTimer);
      this.snowPeriodTimer = setInterval(() => {
        if (this.continueTime <= 0) {
          clearInterval(this.snowPeriodTimer);
          this.snowEnd();
          return;
        }
        this.continueTime--;
      }, 1000);
    },
    // 开启雪花雨动画
    startSnow() {
      const systemInfo = Taro.getSystemInfoSync();
      const { windowWidth, windowHeight } = systemInfo;
      const left = parseInt(Math.random() * (windowWidth - 50) + 0);
      const rotate = parseInt(Math.random() * 90 - 45) + "deg"; // 旋转角度
      const durTime = Math.random() * (2.5 - 1.2 + 1) + 1.2 + "s"; // 时间
      //1.2和1.2这个数值保持一样
      this.rainParams.push({
        left: left + "px",
        transforms: "rotate(" + rotate + ")",
        durTime: durTime,
        isHide: false,
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.startSnow();
      }, Math.round(this.duration / this.rainConfig.snowNum));
    },
    // 点击雪花事件
    tapSnowflake(item, index) {
      this.rainParams[index].isHide = true;
      // 节流
      throttle(() => {
        this.catchNum++;
      }, 400)();
    },
    // 结束下雪时间
    snowEnd() {
      this.rainParams = [];
      this.isCatched = this.catchNum >= this.target;
      clearTimeout(this.timer);
      this.timer = null
      this.endVisible = true;
    },
    restart() {
      this.endVisible = false;
      this.beforeStartTime = 5;
      this.countDownVisible = true;
      this.initSnow();
    },
    goNext() {
      Taro.navigateTo({
        url: "/pages/index/index?sceneIndex=22",
      });
    },
  },
};
</script>

<style lang="scss">
.task-rain-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/image/iceWorld.jpg");
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
  .before-start-wrap {
    position: absolute;
    z-index: 9;
    left: 50%;
    top: 50%;
    width: 90vw;
    text-align: center;
    transform: translate(-50%, -50%);
    font-weight: bolder;
    font-size: 80px;
    color: #ffca28;
    .num {
      padding-top: 2vh;
      text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 8px #fff, 0 0 10px #ffca28,
        0 0 12px #ffca28;
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
.star-energy-section {
  display: block;
  overflow: hidden;
  position: absolute;
  width: 100vw;
  height: 100vh;
  // @include position(absolute, 100%, 100%);
  .star-stone-rain-img {
    width: 92px;
    height: 92px;
    display: block;
    &.hide-star-stone {
      width: 0;
      height: 0;
      animation: hide-star-stone 0.3s alternate;
    }
  }
  .move_1 {
    position: absolute;
    animation: all 3s linear;
    top: -100px;
    z-index: 0;
    &.move_1 {
      animation: aim_move 5s linear 1 forwards;
    }
  }
  .view-a {
    display: block;
  }
}
@keyframes aim_move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(120vh);
  }
}

@keyframes hide-star-stone {
  50% {
    width: 100px;
    height: 100px;
  }
  100% {
    width: 0;
    height: 0;
  }
}
</style>