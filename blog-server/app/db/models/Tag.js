const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
// const Mixed = mongoose.Schema.Types.Mixed;

exports.title = '标签';
exports.type = 'MongoDB';

exports.fields = {
	name: {
		title: '名字',
		required: true,
		type: String,
	},
	parent: {
		title: '父级标签ID',
		type: ObjectId
	},
	color: {
		title: '标签色值',
		type: String,
		default: '#5BCCFF',
	},
	icon: {
		title: '标签图标',
		type: String
	},
	creator: {
		title: '创建人（MySQL用户id）',
		type: String
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
	status: {
		title: '状态（0 禁用 1 启用 -1 删除）',
		default: 1,
		type: Number,
	},
};