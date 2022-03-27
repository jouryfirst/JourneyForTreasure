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
  firstClue: '像桌不是桌，不能摆吃喝。有黑又有白，一摁就唱歌', // 钢琴
  secondClue: '第二个数字就藏在第二行第三个格子里', // 第二个数字的线索
  boxPos: '烘焙箱里' , // 小雪人的爱心盒子位置
}

const princess_amazed_img = require('./assets/image/princess-amazed.gif')
const princess_stand_img = require('./assets/image/princess-stand.gif')
const cat_img = require('./assets/image/cat.gif')
const ginseng_img = require('./assets/image/ginseng.gif')
const snowman_img = require('./assets/image/snowman.gif')
const mushroom_1 = require('./assets/image/scene_4_1.gif')

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
  // 第一关-钓鱼
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
  // 第二关-打地鼠
  14: {
    isLeft: true,
    talk: '咦，人参老爷爷，您怎么背着小人参在外面溜达呀！外面好危险。',
    roleImg: princess_amazed_img
  },
  15: {
    isLeft: false,
    talk: '英勇的公主殿下，森林里的小老鼠最近一直在地下钻来钻去，吵得我的宝贝们不安宁，如果公主殿下可以帮我们解决小老鼠的话，我们就可以回到我们的家了。',
    roleImg: ginseng_img,
    textHeight: 52,
  },
  16: {
    isLeft: true,
    talk: '交给本公主吧！',
    roleImg: princess_stand_img
  },
  17: {
    isLeft: false,
    talk: '【】',
    roleImg: ginseng_img,
    textHeight: 52,
    hasChoose: true
  },
  18: {
    isLeft: false,
    talk: `谢谢您英勇的公主，我知道您想要什么，但是我并不知道第二个数字和线索，但是我昨天在冰雪谷听见【小雪人说：${CLUE_CONFIG.secondClue}】。然而我并不知道这是什么意思，不过我认为这句话很重要。`,
    roleImg: ginseng_img,
    textHeight: 52,
  },
  19: {
    isLeft: true,
    talk: '嗯。。。【${CLUE_CONFIG.secondClue}】，暂时还不明白什么意思，我需要去冰雪谷看看~',
    roleImg: princess_stand_img,
    goNext: true
  },
  // 第三关-雪花雨
  20: {
    isLeft: true,
    talk: '额。。。这里。。好冷。。',
    roleImg: princess_stand_img
  },
  21: {
    isLeft: false,
    talk: `哒哒~~远道而来的公主哟~~我的身子越来越小啦，马上就要下雪啦，你可以帮我采集${SNOW_CONFIG.snowNum}朵雪花嘛~`,
    roleImg: snowman_img,
    textHeight: 52,
    hasChoose: true
  },
  22: {
    isLeft: false,
    talk: `哒哒~~谢谢您~~，我昨天做了一个爱心盒子，放在了【${CLUE_CONFIG.boxPos}】。我把它送给您，里面有第二个数字，但是我忘记了放在哪个格子里。`,
    roleImg: snowman_img,
    textHeight: 52,
  },
  23: {
    isLeft: true,
    talk: '这样就得到第二个数字啦！',
    roleImg: princess_stand_img,
    goNext: true
  },
  // 第四关-谜语
  24: {
    isLeft: true,
    talk: '咦，你们围在这里在做什么？',
    roleImg: princess_amazed_img
  },
  25: {
    isLeft: false,
    talk: '我们在玩猜谜游戏~我们有四个谜语，公主要一个一个猜，最后一个谜语的答案就是第三个数字的线索~',
    roleImg: mushroom_1,
    textHeight: 52,
    hasChoose: true
  },
}