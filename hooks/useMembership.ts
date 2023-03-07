import useSWR, { SWRConfiguration } from 'swr';
import {ISession, ISubscription } from '../interfaces';

export const useMembership = (url: string, config: SWRConfiguration = {}) => {

    const { data, error } = useSWR<ISession[] | ISubscription[]>(`/api/${url}`, config)

    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error,
    }
};  