import { create } from "zustand";
import { defaultContentDisplayMode } from "./initialSettings";

export interface ContentDisplayMode {
    name: string;
}

interface ContentDisplayModeStore {
    contentDisplayMode: ContentDisplayMode
    setContentDisplayMode: (name: string) => void;
}

const useContentDisplayModeStore = create<ContentDisplayModeStore>(set => ({
    contentDisplayMode: {
        name: defaultContentDisplayMode
    },
    setContentDisplayMode: (name) => set(store => ({ contentDisplayMode: {...store.contentDisplayMode, name}})),
}))

export default useContentDisplayModeStore;