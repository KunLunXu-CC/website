import apps from '@app';
import { createSlice } from '@reduxjs/toolkit';

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
      return { ...state, docks };
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
