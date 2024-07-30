import { create } from 'zustand';

interface GlobalState {
  primaryColor: string;
}

const useGloabalState = create<GlobalState>()(() => ({
  primaryColor: '#3f8cff',
}));

export default useGloabalState;
