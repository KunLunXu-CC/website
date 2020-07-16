import { constants } from 'gg-editor';
import { createFromIconfontCN } from '@ant-design/icons';

export const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_1518433_oa5sw7ezue.js',
});

const { EditorCommand } = constants;

export const FLOW_COMMAND_LIST = [
  {
    title: '撤消',
    name: EditorCommand.Undo,
  },
  {
    title: '重做',
    name: EditorCommand.Redo,
  },
  {
    name: '|',
  },
  {
    title: '复制',
    name: EditorCommand.Copy,
  },
  {
    title: '粘贴',
    name: EditorCommand.Paste,
  },
  {
    title: '删除',
    name: EditorCommand.Remove,
  },
  {
    name: '|',
  },
  {
    title: '放大',
    name: EditorCommand.ZoomIn,
  },
  {
    title: '缩小',
    name: EditorCommand.ZoomOut,
  },
];
