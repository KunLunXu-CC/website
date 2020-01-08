import { FITNESS_PLACE, FITNESS_TYPE } from './consts';

export default [
  // 有氧 100001 开始
  {
    desc: '跑步',
    value: 100001,
    place: void 0,
    type: FITNESS_TYPE.AEROBIC.VALUE,
  },
  {
    desc: '坡度走',
    value: 100002,
    place: void 0,
    type: FITNESS_TYPE.AEROBIC.VALUE,
  },

  // 无氧-背 210001 开始
  {
    value: 210001,
    desc: '背测试',
    place: FITNESS_PLACE.BACK.VALUE,
    type: FITNESS_TYPE.ANAEROBIC.VALUE,
  },

  // 无氧-胸 220001 开始
  {
    value: 220001,
    desc: '胸测试',
    place: FITNESS_PLACE.CHEST.VALUE,
    type: FITNESS_TYPE.ANAEROBIC.VALUE,
  },

  // 无氧-肩 230001 开始
  {
    value: 230001,
    desc: '肩测试',
    type: FITNESS_TYPE.ANAEROBIC.VALUE,
    place: FITNESS_PLACE.SHOULDER.VALUE,
  },

  // 无氧-肱二头 240001 开始
  {
    value: 240001,
    desc: '肱二头测试',
    type: FITNESS_TYPE.ANAEROBIC.VALUE,
    place: FITNESS_PLACE.TWO_HUMERUS.VALUE,
  },

  // 无氧-肱三头 250001 开始
  {
    value: 250001,
    desc: '肱三头测试',
    type: FITNESS_TYPE.ANAEROBIC.VALUE,
    place: FITNESS_PLACE.THREE_HUMERUS.VALUE,
  },

  // 无氧-腹 260001 开始
  {
    value: 260001,
    desc: '腹测试',
    type: FITNESS_TYPE.ANAEROBIC.VALUE,
    place: FITNESS_PLACE.ABDOMEN.VALUE,
  },

  // 无氧-腿 270001 开始
  {
    value: 270001,
    desc: '腿测试',
    place: FITNESS_PLACE.LEG.VALUE,
    type: FITNESS_TYPE.ANAEROBIC.VALUE,
  },

  // 无氧-小臂 280001 开始
  {
    value: 280001,
    desc: '小臂测试',
    type: FITNESS_TYPE.ANAEROBIC.VALUE,
    place: FITNESS_PLACE.SMALL_ARM.VALUE,
  },
];
