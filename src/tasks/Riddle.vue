<template>
  <view class="task-riddle-container">
    <view class="talk-dialog">
      <text class="output-text">
        {{ riddleText }}
      </text>
      <view class="btn-wrap">
        <view
          v-for="(item, index) in answerLists"
          :key="index"
          class="radio-btn"
          :class="{ 'is-correct': isCorrect === index }"
          @tap="chooseBtn(index)"
        >
          {{ item }}
        </view>
      </view>
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
import Taro from "@tarojs/taro";
import { throttle } from "../utils/tools";
import { RIDDLE_LISTS } from "../constant";

export default {
  data() {
    return {
      roleImg: require("../assets/image/mushroom.gif"),
      riddleIndex: 1,
      isCorrect: -1,
    };
  },
  computed: {
    riddleText() {
      return RIDDLE_LISTS[this.riddleIndex].riddle;
    },
    answerLists() {
      return RIDDLE_LISTS[this.riddleIndex].options || [];
    },
    correctAnswer() {
      return RIDDLE_LISTS[this.riddleIndex].answerIndex || 0;
    },
  },
  created() {
    this.riddleIndex = 1;
  },
  methods: {
    chooseBtn(index) {
      throttle(this.judgeAnswer(index), 800);
    },
    judgeAnswer(index) {
      if (this.correctAnswer === index) {
        // 选对了
        this.isCorrect = index;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.isCorrect = -1;
          this.riddleIndex += 1;
          if (this.riddleIndex === 12) {
            this.goNext();
          }
        }, 800);
      } else {
        this.riddleIndex = 0;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.riddleIndex = 1;
        }, 1200);
      }
    },
    goNext() {
      clearTimeout(this.nextTimer);
      this.nextTimer = setTimeout(() => {
        Taro.navigateTo({
          url: "/pages/index/index?sceneIndex=25",
        });
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.task-riddle-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/image/forest.png");
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
    font-weight: bold;
    font-family: "YouYuan";
    text-align: center;
    .output-text {
      font-size: 60px;
    }
    .btn-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .radio-btn {
        width: 30vw;
        height: 8vh;
        margin-top: 4vh;
        border-radius: 50px;
        border: 4px solid #644c09;
        background: linear-gradient(#f9e352, #ec701e);
        line-height: 8vh;
        font-size: 40px;
        color: #6b4e05;
        &.is-correct {
          color: #fff;
          background: linear-gradient(#c6eb5a, #2a7710);
        }
      }
    }
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