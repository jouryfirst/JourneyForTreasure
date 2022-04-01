<template>
  <view class="home-container">
    <ScenePanel
      v-if="!inputVisible && !isEnd"
      class="forest-scene"
      :class="{ 'ice-world': iceBg }"
      :is-left="isLeft"
      :role-img="roleImg"
      :text-height="textHeight"
      :has-choose="hasChoose"
      @tapScene="tapScene"
      @startGame="startGame"
    >
      <text
        class="output-text"
        :class="{ 'left-output-text': isLeft }"
      >
        {{ obj.output }}
      </text>
    </ScenePanel>
    <view
      v-if="runVisible"
      class="run-loading"
    >
      <view class="run-text">
        跑呀~跑呀~
      </view>
      <image
        class="run-img"
        src="../../assets/image/run.gif"
      />
    </view>
    <view
      v-if="inputVisible"
      class="input-dialog forest-scene"
    >
      <view class="num-text">
        请输入获得的3个数字
      </view>
      <input
        class="num-input"
        type="number"
        :maxlength="3"
        :focus="true"
        placeholder="输入获得的数字吧"
        @input="inputNum"
      >
      <view
        class="confirm-btn"
        @tap="validateNum"
      >
        验 证
      </view>
    </view>
    <view class="tips-content">
      <view
        class="tips-btn"
        @tap="showTips"
      />
      <view
        v-show="tipsVisible"
        class="tips-dialog"
      >
        <view
          v-show="sceneIndex >= 13"
          class="first-clue clue-tips"
        >
          <view class="title">
            第一个数字的线索
          </view>
          <view class="content">
            数字：{{ clueConfig.firstNum }}； 线索：{{ clueConfig.firstClue }}
          </view>
        </view>
        <view
          v-show="sceneIndex >= 23"
          class="second-clue clue-tips"
        >
          <view class="title">
            第二个数字的线索
          </view>
          <view class="content">
            数字：{{ clueConfig.secondClue }}； 线索：{{ clueConfig.boxPos }}
          </view>
        </view>
        <view
          v-show="sceneIndex >= 25"
          class="third-clue clue-tips"
        >
          <view class="title">
            第三个数字的线索
          </view>
          <view class="content">
            线索：什么圆圆墙上头？
          </view>
        </view>
      </view>
    </view>
    <view
      v-if="isEnd"
      class="end-view"
    />
  </view>
</template>

<script>
import ScenePanel from "../../components/ScenePanel.vue";
import Taro from "@tarojs/taro";
import { SCENE_PASSWORD, TALK_TEXT, CLUE_CONFIG } from "../../constant";
import EasyTyper from "easy-typer-js";
import "./index.scss";

export default {
  components: {
    ScenePanel,
  },
  data() {
    return {
      sceneIndex: 0, // 第几个场景
      canTap: false, // 语句未显示完不可点击
      runVisible: false, // 跑步动画
      obj: {
        output: "",
        isEnd: false,
        speed: 150, // 打字速度，单位ms
        singleBack: false,
        sleep: 10,
        type: "custom",
        backSpeed: 40,
        sentencePause: false,
      },
      inputVisible: false, // 数字输入框
      taskNum: "",
      isEnd: false,
      tipsVisible: false, // 线索框
      clueConfig: CLUE_CONFIG,
    };
  },
  computed: {
    // 人物出现是否在左边
    isLeft() {
      return TALK_TEXT[this.sceneIndex].isLeft;
    },
    roleImg() {
      return TALK_TEXT[this.sceneIndex].roleImg;
    },
    textHeight() {
      return TALK_TEXT[this.sceneIndex].textHeight;
    },
    hasChoose() {
      return TALK_TEXT[this.sceneIndex].hasChoose;
    },
    iceBg() {
      return TALK_TEXT[this.sceneIndex] && TALK_TEXT[this.sceneIndex].bg;
    },
  },
  created() {
    this.$instance = Taro.getCurrentInstance();
  },
  mounted() {
    if (this.$instance.router.params.sceneIndex) {
      this.sceneIndex = Number(this.$instance.router.params.sceneIndex);
    }
    this.printText();
  },
  methods: {
    // 打印剧本文字
    printText() {
      const talk = TALK_TEXT[this.sceneIndex].talk;
      const typed = new EasyTyper(this.obj, talk, () => {
        this.canTap = true;
      });
    },
    // 点击屏幕下一个对话
    tapScene() {
      if (!this.canTap) return;
      this.obj.output = "";
      this.canTap = false;
      if (TALK_TEXT[this.sceneIndex].goNext) {
        this.runVisible = true;
        setTimeout(() => {
          this.runVisible = false;
          this.sceneIndex += 1;
          this.printText();
        }, 1000);
      } else {
        this.sceneIndex += 1;
        if (this.sceneIndex === 28) {
          this.inputVisible = true;
          return;
        } else if (this.sceneIndex === 30) {
          this.isEnd = true;
          return;
        }
        this.printText();
      }
    },
    // 场景游戏
    startGame() {
      if (!this.canTap) return;
      const url = {
        11: "/tasks/Fish",
        17: "/tasks/Mouse",
        21: "/tasks/Rain",
        24: "/tasks/Riddle",
      };
      Taro.navigateTo({
        url: url[this.sceneIndex],
      });
    },
    inputNum(e) {
      this.taskNum = e.detail.value;
    },
    validateNum() {
      if (+this.taskNum === SCENE_PASSWORD) {
        this.inputVisible = false;
        this.printText();
      } else {
        wx.showToast({
          title: "数字不对哦",
          icon: "none",
        });
      }
    },
    showTips() {
      this.tipsVisible = !this.tipsVisible;
    },
  },
};
</script>
