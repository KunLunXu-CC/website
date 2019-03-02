const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

exports.title = '文章';
exports.type = 'MongoDB';

exports.fields = {
  name: {
		title: '标题',
		required: true,
		type: String,
  },
  desc: {
    title: '描述（概要）',
		type: String,
  },
  thumb: {
    title: "缩略图",
    type: String
  },
  tags: {
    title: '标签ID',
		type: [ObjectId],
  },
  content: {
    title: '内容',
		type: String,
  },
	status: {
		title: '状态（0 禁用 1 启用 -1 删除）',
		default: 1,
		type: Number,
	},
  creator: {
		title: '创建人（MySQL用户id）',
		type: String,
	},
	creationTime: {
		title: '创建时间',
		type: Date,
		default: Date.now,
	},
	updater: {
		title: '最近更新人（Mysql用户id）',
		type: String,
	},
	updateTime: {
		title: '最近更新时间',
		type: Date,
		default: Date.now,
	},
}
