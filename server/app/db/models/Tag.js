const mongoose = require('mongoose');
const { STATUS } = require('../../../config/conts');
const ObjectId = mongoose.Schema.Types.ObjectId;
// const Mixed = mongoose.Schema.Types.Mixed;

exports.title = '标签';
exports.type = 'MongoDB';

exports.fields = {
	name: {
		title: '标签名称',
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
	status: {
		title: '状态',
		default: STATUS.ENABLE,
		type: Number,
	},
	creator: {
		title: '创建人',
		type: String
	},
	creationTime: {
		title: '创建时间',
		type: Date,
		default: Date.now,
	},
	updater: {
		title: '最近更新人',
		type: String,
	},
	updateTime: {
		title: '最近更新时间',
		type: Date,
		default: Date.now,
	},
};
