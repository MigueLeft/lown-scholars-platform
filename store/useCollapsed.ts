import { create } from 'zustand';

interface CollapsedState {
    collapsed: boolean;
    setCollapsed: () => void;
}

const useCollapsed = create<CollapsedState>((set) => ({
    collapsed: false,
    setCollapsed: () => set((state) => ({ collapsed: !state.collapsed }))
}));

export default useCollapsed;
