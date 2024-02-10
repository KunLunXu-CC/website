// import apps from '@app';
import { urlParams } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

interface APP {
  code: string,
  name: string,
}

export interface AppStore {
  docks: {
    code: string,
    name: string,
  }[]
  opens: {
    code: string,
    name: string,
    isMin: boolean,
    isMax: boolean,
  }[]
}

const initialState: AppStore = {
  docks: [],
  opens: [],
};

const apps = {} as any

export default createSlice({
  initialState,
  name: 'app',
  reducers: {
    init: (state, { payload: user }) => {
      const { auth } = user.role;
      const docks = auth.map((v: any) => {
        const { code, name } = apps[v.code] || {};
        return { code, name };
      }).filter((v: any) => v.code && v.name);

      // 默认开启的「应用」
      const appCodeOfUrl = urlParams('app');
      const defaultOpen = docks.find((v: APP) => v.code === appCodeOfUrl);
      const opens = defaultOpen
        ? [{ ...defaultOpen,  isMin: false, isMax: false }]
        : [];

      return { ...state, opens, docks };
    },

    open: (state, { payload: app }) => {
      const current = state.opens.find((v) => (v.code === app.code));

      const opens = current
        ? state.opens.map((v) => ({
          ...v,
          isMin: v.code === app.code ? !v.isMin : v.isMin,
        }))
        : [...state.opens, { ...app, isMin: false, isMax: false }];

      return { ...state, opens };
    },

    close: (state, { payload: app }) => ({
      ...state,
      opens: state.opens.filter((v) => v.code !== app.code),
    }),

    minimize: (state, { payload: app }) => ({
      ...state,
      opens: state.opens.map((v) => ({
        ...v,
        isMin: v.code === app.code ? !v.isMin : v.isMin,
      })),
    }),

    maximize: (state, { payload: app }) => ({
      ...state,
      opens: state.opens.map((v) => ({
        ...v,
        isMax: v.code === app.code ? !v.isMax : v.isMax,
      })),
    }),

    stick: (state, { payload: app }) => ({
      ...state,
      opens: [
        ...state.opens.filter((v) => v.code !== app.code),
        app,
      ],
    }),
  },
});
