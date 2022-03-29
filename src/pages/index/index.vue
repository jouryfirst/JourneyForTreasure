<template>
  <view class="home-container">
    <ScenePanel
      class="forest-scene"
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
  </view>
</template>

<script>
import ScenePanel from "../../components/ScenePanel.vue";
import Taro from "@tarojs/taro";
import { TALK_TEXT } from "../../constant";
import EasyTyper from "easy-typer-js";
import "./index.scss";

export default {
  components: {
    ScenePanel,
  },
  data() {
    return {
      sceneIndex: 1, // 第几个场景
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
  },
  created () {
    this.$instance = Taro.getCurrentInstance()
  },
  mounted() {
    if (this.$instance.router.params.sceneIndex) {
      this.sceneIndex = Number(this.$instance.router.params.sceneIndex)
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
        this.printText();
      }
    },
    // 场景游戏
    startGame() {
      if (!this.canTap) return;
      const url = {
        11: "/tasks/Fish",
        17: '/tasks/Mouse',
        21: '/tasks/Rain',
        24: '/tasks/Riddle'
      };
      Taro.navigateTo({
        url: url[this.sceneIndex],
      });
    },
  },
};
</script>
