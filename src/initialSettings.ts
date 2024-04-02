// API KEYS ARE NOT HERE...

// Homepage settings...

export const defaultWelcomeTitle = "Ready To Survive A Disaster?"; //Leave empty to utilize heading from topic autoselect
export const defaultTopicId = 1;
export const defaultModalityId = 1;
export const defaultSearchText = "";

// Display mode settings...
// Display modes include:
// grid
// list

export const defaultContentDisplayMode = "list";

// Query type settings...
// Query types include:
// useQuery
// useInfiniteQuery
// useInfiniteScroll

export const defaultContentQueryType = "useInfiniteQuery";
export const defaultContentQueryFetchCount = 10; //Only applicable if defaultContentQueryType is "useInfiniteQuery" or "useInfiniteScroll"

export const defaultContentQueryType_modality1 = "useQuery";
export const defaultContentQueryFetchCount_modality1 = 4; //Only applicable if defaultContentQueryType_modality1 is "useInfiniteQuery" or "useInfiniteScroll"

export const defaultContentQueryType_modality2 = "useQuery";
export const defaultContentQueryFetchCount_modality2 = 0; //Only applicable if defaultContentQueryType_modality2 is "useInfiniteQuery" or "useInfiniteScroll"

export const defaultContentQueryType_modality3 = "useQuery";
export const defaultContentQueryFetchCount_modality3 = 0; //Only applicable if defaultContentQueryType_modality3 is "useInfiniteQuery" or "useInfiniteScroll"