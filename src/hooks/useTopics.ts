import { useQuery } from "@tanstack/react-query";
import APIClient, { endpoint_siteContent } from "../services/api-client";
import { Topic } from "../entities/Topic";

const apiClient = new APIClient<Topic>(endpoint_siteContent);

const useTopics = () =>
    useQuery({
        queryKey: ['topics'],
        queryFn: () =>
            apiClient.getAll({
                params: {
                    verb: 'get',
                    component: 'topics_main'
                },
            }),
            staleTime: 24 * 60 * 60 * 1000, //24h
})

export default useTopics;