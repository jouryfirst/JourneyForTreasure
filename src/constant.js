// 场景中的密码
export const SCENE_PASSWORD = 326

// 钓鱼配置
export const FISH_CONFIG = {
  stalemate: 15, // 开始僵持的拉力
  fishFleeForce: 25 // 拉力到25鱼就逃走
}

// 打地鼠配置
export const MOUSE_CONFIG = {
  target: 15, // 目标数
  continueTime: 30, // 时长
}

// 雪花雨配置
export const SNOW_CONFIG = {
  target: 15, // 目标数
  continueTime: 10, // 降雪时长
  snowNum: 30 // 一共多少个雪花
}

export const CLUE_CONFIG = {
  treasurePos: '书房的柜子', // 宝箱藏的位置
  firstNum: '十二白', // 钢琴的第十二个白色键对应的音调数字
  firstClue: '像案又像桌，不能摆吃喝。有黑又有白，一摁就唱歌', // 钢琴
  secondClue: '第二个数字就藏在最左列第二个格子里', // 第二个数字的线索
  boxPos: '床底下的抽屉里' , // 小雪人的爱心盒子位置
}

const princess_amazed_img = require('./assets/image/princess-amazed.png')
const princess_stand_img = require('./assets/image/princess-stand.png')
const princess_happy_img = require('./assets/image/princess-happy.png')
const princess_sad_img = require('./assets/image/princess-sad.png')
const cat_img = require('./assets/image/cat.gif')
const ginseng_img = require('./assets/image/ginseng.gif')
const snowman_img = require('./assets/image/snowman.gif')
const mushroom_img = require('./assets/image/mushroom.gif')

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
    talk: '看到了吗，这是一个宝箱！它需要三个数字才能打开，您在试炼途中可以得到线索与数字。还有左上角的按钮，当你获得线索后可以点击查看。'
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
    roleImg: princess_happy_img,
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
    roleImg: princess_happy_img,
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
    talk: `【小老鼠会在洞里钻来钻去，在露出脑袋的时候可以点击它，点击${MOUSE_CONFIG.target}次就可以赶走它了。要注意，${MOUSE_CONFIG.continueTime}s后小老鼠就钻进洞里睡觉了，再不出来。】`,
    roleImg: ginseng_img,
    textHeight: 52,
    hasChoose: true
  },
  18: {
    isLeft: false,
    talk: `谢谢您英勇的公主，我知道您想要什么，很抱歉我并不知道第二个数字和线索，但是我昨天在冰雪谷听见【小雪人说：${CLUE_CONFIG.secondClue}】。然而我并不知道这是什么意思，不过我认为这句话很重要。`,
    roleImg: ginseng_img,
    textHeight: 58,
  },
  19: {
    isLeft: true,
    talk: `嗯。。。【${CLUE_CONFIG.secondClue}】，暂时还不明白什么意思，我需要去冰雪谷看看~`,
    roleImg: princess_sad_img,
    goNext: true
  },
  // 第三关-雪花雨
  20: {
    isLeft: true,
    talk: '这里就是冰雪谷啦~~',
    roleImg: princess_stand_img,
    bg: 'iceWorld'
  },
  21: {
    isLeft: false,
    talk: `哒哒~~远道而来的公主哟~~我的身子越来越小啦，马上就要下雪啦，你可以帮我采集${SNOW_CONFIG.target}朵雪花嘛~`,
    roleImg: snowman_img,
    textHeight: 52,
    hasChoose: true,
    bg: 'iceWorld'
  },
  22: {
    isLeft: false,
    talk: `哒哒~~谢谢您~~，我昨天做了一个爱心盒子，放在了【${CLUE_CONFIG.boxPos}】。我把它送给您，里面有第二个数字，但是我忘记了放在哪个格子里。`,
    roleImg: snowman_img,
    textHeight: 52,
    bg: 'iceWorld'
  },
  23: {
    isLeft: true,
    talk: '这样就得到第二个数字啦！',
    roleImg: princess_happy_img,
    goNext: true,
    bg: 'iceWorld'
  },
  // 第四关-谜语
  24: {
    isLeft: false,
    talk: '智慧的公主呀，我这里有十二个谜语，公主要一个一个猜，【最后一个谜语的答案就是第三个数字的线索】。注意哦，猜错一个就要重新开始猜谜语。',
    roleImg: mushroom_img,
    textHeight: 52,
    hasChoose: true
  },
  25: {
    isLeft: true,
    talk: '什么圆圆墙上头？啊！我知道第三个数字在哪里啦！',
    roleImg: princess_happy_img
  },
  26: {
    isLeft: true,
    talk: '本公主果然是最棒的！集齐了三个数字！',
    roleImg: princess_happy_img
  },
  27: {
    isLeft: false,
    talk: '唔，公主殿下！祝贺您完成了寻宝之旅并集齐了三个数，告诉我数字是什么？'
  },
  28: {
    isLeft: false,
    talk: '恭喜您！聪明的公主殿下，请记好数字兑换的规则：【第一个数字除以1，第二个数字除以2，第三个数字除以3】，得到的3个数字就是宝箱的密码。',
    textHeight: 52
  },
  29: {
    isLeft: false,
    talk: '公主应该可以打开宝箱了，我的使命完成了，再见了公主殿下。',
    textHeight: 32
  }
}

export const RIDDLE_LISTS = {
  0: {
    riddle: '公主猜错咯，要重新开始啦。'
  },
  1: {
    riddle: '什么尖尖海里游？',
    options: ['水母', '鱿鱼', '海蜇', '海参'],
    answerIndex: 1
  },
  2: {
    riddle: '什么尖尖水上走？',
    options: ['青蛙', '小船', '水车', '荷叶'],
    answerIndex: 1
  },
  3: {
    riddle: '什么尖尖街上卖？',
    options: ['手帕', '镜子', '粽子', '包子'],
    answerIndex: 2
  },
  4: {
    riddle: '什么尖尖墙上头？',
    options: ['钉子', '壁画', '挂钟', '柜子'],
    answerIndex: 0
  },
  5: {
    riddle: '什么弯弯海里游？',
    options: ['鲨鱼', '鱿鱼', '海星', '海参'],
    answerIndex: 3
  },
  6: {
    riddle: '什么弯弯水上走？',
    options: ['青蛙', '蝌蚪', '小船', '水车'],
    answerIndex: 1
  },
  7: {
    riddle: '什么弯弯街上卖？',
    options: ['香蕉', '镜子', '粽子', '包子'],
    answerIndex: 0
  },
  8: {
    riddle: '什么弯弯墙上头？',
    options: ['钉子', '春联', '挂钟', '挂钩'],
    answerIndex: 3
  },
  9: {
    riddle: '什么圆圆海里游？',
    options: ['水母', '鱿鱼', '鲨鱼', '海参'],
    answerIndex: 0
  },
  10: {
    riddle: '什么圆圆水上走？',
    options: ['芦苇', '水牛', '锄头', '水车'],
    answerIndex: 3
  },
  11: {
    riddle: '什么圆圆街上卖？',
    options: ['手帕', '汤圆', '粽子', '馄饨'],
    answerIndex: 1
  },
  12: {
    riddle: '【什么圆圆墙上头？】'
  }
}