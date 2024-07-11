import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints(builder) {
        return {
            addAlbum: builder.mutation({
                // arg is whatever you passed to your hook as argument
                // in our case, arg is a user object
                invalidatesTags: (result, error, arg) => {
                    return [{ type: 'Album', id: arg.id }]
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        },
                        method: 'POST'
                    };
                }
            }),
            fetchAlbums: builder.query({
                // arg is whatever you passed to your hook as argument
                // in our case, arg is a user object
                providesTags: (result, error, arg) => {
                    return [{ type: 'Album', id: arg.id }]
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET'
                    };
                }
            })
        };
    }
});

export const { 
    useAddAlbumMutation, 
    useFetchAlbumsQuery 
} = albumsApi;

export { albumsApi };