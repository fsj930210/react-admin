import { create } from 'zustand';

interface GlobalState {
  primaryColor: string;
}

const useGloabalState = create<GlobalState>()(() => ({
  primaryColor: '#00b96b',
}));

export default useGloabalState;
