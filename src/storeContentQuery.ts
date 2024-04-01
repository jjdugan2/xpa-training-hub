import { create } from "zustand";
import { Modality } from "./entities/Modality";
import { Topic } from "./entities/Topic";
import {
  defaultModalityId,
  defaultSearchText,
  defaultTopicId
} from "./initialSettings";

export interface ContentQuery {
    topic: Topic | null;
    modality: Modality | null;
    searchText: string;
    slug: string;
    video_id: string;
    queryType: string;
    queryFetchCount: number;
  }

interface ContentQueryStore {
    contentQuery: ContentQuery
    setTopic: (topic: { id: number, name: string }, searchText: string) => void;
    setModality: (modality: { id: number, name: string, slug: string }) => void;
    setSearchText: (searchText: string) => void;
    setSlug: (slug: string) => void;
    setVideo_id: (video_id: string) => void;
    setQueryType: (queryType: string) => void;
    setQueryFetchCount: (queryFetchCount: number) => void;
}

const useContentQueryStore = create<ContentQueryStore>(set => ({
    contentQuery: {
        topic: { id: defaultTopicId, name: "" },
        modality: { id: defaultModalityId, name: "", slug: ""},
        searchText: defaultSearchText,
        slug: "",
        video_id: "",
        queryType: "",
        queryFetchCount: 0
    },
    setTopic: (topic, searchText) => set(store => ({ contentQuery: {...store.contentQuery, topic, searchText}})),
    setModality: (modality) => set(store => ({ contentQuery: {...store.contentQuery, modality}})),
    setSearchText: (searchText) => set(store => ({ contentQuery: {...store.contentQuery, searchText}})),
    setSlug: (slug) => set(store => ({ contentQuery: {...store.contentQuery, slug}})),
    setVideo_id: (video_id) => set(store => ({ contentQuery: {...store.contentQuery, video_id}})),
    setQueryType: (queryType) => set(store => ({ contentQuery: {...store.contentQuery, queryType}})),
    setQueryFetchCount: (queryFetchCount) => set(store => ({ contentQuery: {...store.contentQuery, queryFetchCount}})),
}))

export default useContentQueryStore;