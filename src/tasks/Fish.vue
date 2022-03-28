<template>
  <view class="task-fish-container">
    <canvas
      id="testCanvas"
      type="2d"
      canvas-id="testCanvas"
      @longtap="shrinkLine"
      @touchend="extendLine"
    />
    <view
      v-if="showFail || isCatched"
      class="show-dialog"
    >
      <view
        class="show-text"
        :class="{ 'success-text': isCatched }"
      >
        {{ showFail ? "鱼儿脱钩了~~" : "钓到鱼啦！" }}
      </view>
      <view
        v-if="showFail"
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
import { FISH_CONFIG } from "../constant";

export default {
  name: "",
  data() {
    return {
      ctx: null,
      shrinkTimer: null, // 收绳子定时器
      extendTimer: null, // 放绳子定时器
      fishImg: null,
      fishReverseImg: null,
      lineForce: 0, // 绳子拉力
      stalemate: FISH_CONFIG.stalemate, // 开始僵持的拉力
      fishFleeForce: FISH_CONFIG.fishFleeForce, //拉力到该值鱼就逃走
      isUnhook: false, // 是否脱钩
      isCatched: false, // 是否钓上
      initX: 200,
      initY: 300,
      fishX: 200,
      fishY: 300,
      fishOffsetX: 20, // 绳子与鱼的偏移量
      fishOffsetY: 35, // 绳子与鱼的偏移量
      showFail: false,
    };
  },
  computed: {
    lineX() {
      return this.fishX + this.fishOffsetX;
    },
    lineY() {
      return this.fishY + this.fishOffsetY;
    },
  },
  methods: {
    clearCanvas() {
      this.ctx.clearRect(-100, -100, 1000, 1000);
      // canvas 2D必须这样才能清空画布
      this.ctx.beginPath();
    },
    clearShrinkTimer() {
      // wx小程序有时会发现无法清除定时器，需赋值null
      clearInterval(this.shrinkTimer);
      this.shrinkTimer = null;
    },
    clearExtendTimer() {
      clearInterval(this.extendTimer);
      this.extendTimer = null;
    },
    // 收线
    shrinkLine() {
      this.clearExtendTimer();
      if (this.isUnhook || this.isCatched) return;
      // 定时器bug https://developers.weixin.qq.com/community/develop/doc/00004485db0170052d6abc12f54400
      clearInterval(this.shrinkTimer)
      this.shrinkTimer = setInterval(() => {
        if (this.lineY <= 47) {
          // 钓到鱼了
          this.isCatched = true;
          this.clearShrinkTimer();
        }
        this.clearCanvas();
        this.lineForce++; // 拉力增加
        // 收线阶段
        if (this.lineForce < this.stalemate) {
          this.fishX -= 3;
          this.fishY -= 5;
          this.ctx.moveTo(10, 0);
          this.ctx.lineTo(this.lineX, this.lineY);
          this.ctx.drawImage(this.fishImg, this.fishX, this.fishY, 69, 47);
          this.ctx.stroke();
        } else if (
          this.lineForce >= this.stalemate &&
          this.lineForce < this.fishFleeForce
        ) {
          // 僵持阶段
          this.ctx.moveTo(10, 0);
          this.fishX = this.fishX + (Math.random() * 2 - 1);
          this.ctx.lineTo(this.lineX, this.lineY);
          this.ctx.drawImage(this.fishImg, this.fishX, this.fishY, 69, 47);
          this.ctx.stroke();
        } else {
          // 脱钩
          this.unhook();
        }
      }, 100);
    },
    // 放线
    extendLine() {
      this.clearShrinkTimer();
      if (this.isUnhook || this.isCatched) return;
      this.lineForce = 0;
      clearInterval(this.extendTimer)
      this.extendTimer = setInterval(() => {
        if (this.lineY >= 400) {
          this.clearExtendTimer();
        }
        this.clearCanvas();
        this.fishX += 3;
        this.fishY += 5;
        this.ctx.moveTo(10, 0);
        this.ctx.lineTo(this.lineX, this.lineY);
        this.ctx.drawImage(
          this.fishReverseImg,
          this.fishX - 20,
          this.fishY,
          69,
          47
        );
        this.ctx.stroke();
      }, 100);
    },
    // 脱钩
    unhook() {
      this.isUnhook = true;
      this.lineForce = 0;
      clearInterval(this.unhookTimer)
      this.unhookTimer = setInterval(() => {
        if (this.fishY >= this.initY) {
          clearInterval(this.unhookTimer);
          this.showFail = true;
        }
        this.clearCanvas();
        this.fishX += 10;
        this.fishY += 10;
        this.ctx.drawImage(this.fishReverseImg, this.fishX, this.fishY, 69, 47);
      }, 100);
      this.clearExtendTimer();
      this.clearShrinkTimer();
    },
    // 重试
    restart() {
      this.showFail = false;
      this.isUnhook = false;
      this.fishX = this.initX;
      this.fishY = this.initY;
      this.clearCanvas();
      this.ctx.moveTo(10, 0);
      this.ctx.lineTo(this.lineX, this.lineY);
      this.ctx.stroke();
      this.ctx.drawImage(this.fishImg, this.initX, this.initY, 69, 47);
    },
    goNext() {
      Taro.navigateTo({
        url: "/pages/index/index?sceneIndex=12",
      });
    },
  },
  onReady() {
    const query = wx.createSelectorQuery();
    const that = this;
    query
      .select("#testCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const systemInfo = Taro.getSystemInfoSync();
        const { windowWidth, windowHeight } = systemInfo;
        canvas.width = windowWidth;
        canvas.height = windowHeight;
        that.ctx = canvas.getContext("2d");
        that.ctx.moveTo(10, 0);
        that.ctx.lineTo(that.lineX, that.lineY);
        that.ctx.stroke();
        that.fishImg = canvas.createImage();
        that.fishImg.src = require("../assets/image/fish.png");
        that.fishReverseImg = canvas.createImage();
        that.fishReverseImg.src = require("../assets/image/fishReverse.png");
        that.fishImg.onload = () => {
          that.ctx.drawImage(that.fishImg, that.initX, that.initY, 69, 47);
        };
      });
  },
};
</script>

<style lang="scss">
.task-fish-container {
  height: 100vh;
  width: 100vw;
  position: relative;

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
#testCanvas {
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/image/river.png");
  background-size: cover;
}
</style>
