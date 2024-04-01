import { useQuery } from "@tanstack/react-query";
import APIClient, { endpoint_siteContent } from "../services/api-client";
import { Modality } from "../entities/Modality";

const apiClient = new APIClient<Modality>(endpoint_siteContent);

const useModalities = () =>
    useQuery({
        queryKey: ['modalities'],
        queryFn: () =>
            apiClient.getAll({
                params: {
                    verb: 'get',
                    component: 'modalities'
                },
            }),
            staleTime: 24 * 60 * 60 * 1000, //24h
})

export default useModalities;