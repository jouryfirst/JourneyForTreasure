// 场景中的密码
const SCENE_PASSWORD = ''

// 钓鱼配置
export const FISH_CONFIG = {
  stalemate: 15, // 开始僵持的拉力
  fishFleeForce: 25 // 拉力到25鱼就逃走
}

// 雪花雨配置
export const SNOW_CONFIG = {
  target: 15, // 目标数
  continueTime: 10, // 降雪时长
  snowNum: 30 // 一共多少个雪花
}

const CLUE_CONFIG = {
  treasurePos: '书房的柜子', // 宝箱藏的位置
  firstNum: '十二白', // 钢琴的第十二个白色键对应的音调数字
  firstClue: '像桌不是桌，不能摆吃喝。有黑又有白，一摁就唱歌' // 钢琴
}

const princess_amazed_img = require('./assets/image/princess-amazed.gif')
const princess_stand_img = require('./assets/image/princess-stand.gif')
const cat_img = require('./assets/image/cat.gif')


// 剧本
export const TALK_TEXT = {
  0: {
    isLeft: false,
    talk: '啊!美丽的公主殿下！欢迎来到魔法之森参加寻宝之旅。我是魔法之森的守护者，接下来就由我来指引您的方向。'
  },
  1: {
    isLeft: true,
    talk: '魔法之森？',
    roleImg: princess_amazed_img
  },
  2: {
    isLeft: false,
    talk: '是的，这里就是王国最神秘的试炼地，在这里可以磨炼您的魔法与智慧！'
  },
  3: {
    isLeft: true,
    talk: '那寻宝之旅又是什么？',
    roleImg: princess_stand_img
  },
  4: {
    isLeft: false,
    talk: `殿下，请您打开【${CLUE_CONFIG.treasurePos}】。`
  },
  5: {
    isLeft: false,
    talk: '看到了吗，这是一个宝箱！它需要三个数字才能打开，您在试炼途中可以得到线索与数字。'
  },
  6: {
    isLeft: false,
    talk: '【注意：试炼中得到的数字并不是宝箱的密码，通关后还要找我兑换最终的数字转换规则】'
  },
  7: {
    isLeft: false,
    talk: '殿下准备好出发了吗？'
  },
  8: {
    isLeft: true,
    talk: '准备好了！',
    roleImg: princess_stand_img,
    goNext: true
  },
  9: {
    isLeft: true,
    talk: '呀!遇到了妖怪！',
    roleImg: princess_amazed_img
  },
  10: {
    isLeft: false,
    talk: '喵？！妖怪？愚蠢的人类，本喵乃是伟大的猫仙人，为了惩罚你对本仙人的轻慢，你必须钓上来一条趴趴鱼才能得到第一条线索。',
    roleImg: cat_img
  },
  11: {
    isLeft: false,
    talk: '【长按屏幕可以用力拉起鱼线，离开屏幕则放松拉力，切记：鱼本身有抵抗鱼线的力量，请不要使用蛮力，当你拉不动鱼线且发现鱼线轻微晃动时及时松力，否则趴趴鱼将会挣脱鱼线。】',
    roleImg: cat_img,
    textHeight: 52,
    hasChoose: true
  },
  12: {
    isLeft: false,
    talk: `喵。看在你钓上来了本仙人最爱吃的趴趴鱼的份上。本仙人就大发慈悲地告诉你第一个数字的线索，第一个数字就是【${CLUE_CONFIG.firstNum}】，线索是【${CLUE_CONFIG.firstClue}】。`,
    roleImg: cat_img,
    textHeight: 52,
  },
  13: {
    isLeft: true,
    talk: '这样就得到第一个数字啦！',
    roleImg: princess_stand_img,
    goNext: true
  },
  14: {
    isLeft: false,
    talk: '英勇的公主殿下，',
    roleImg: cat_img,
    textHeight: 52,
    hasChoose: true
  },
}