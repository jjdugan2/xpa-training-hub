import { create } from "zustand";

export interface TopicListFlybarToggle {
    state: boolean;
}

interface TopicListFlybarToggleStore {
    topicListFlybarToggle: TopicListFlybarToggle
    setTopicListFlybarToggle: (state: boolean) => void;
}

const useTopicListFlybarToggleStore = create<TopicListFlybarToggleStore>(set => ({
    topicListFlybarToggle: {
        state: false
    },
    setTopicListFlybarToggle: (state) => set(store => ({ topicListFlybarToggle: {...store.topicListFlybarToggle, state}})),
}))

export default useTopicListFlybarToggleStore;