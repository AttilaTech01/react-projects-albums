import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        // DEV ONLY - fake lag time
        // Since RTQ uses the browser fetch function, we can overwrite it
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            addAlbum: builder.mutation({
                // arg is whatever you passed to your hook as argument
                // in our case, arg is a user object
                invalidatesTags: (result, error, arg) => {
                    return [{ type: 'UsersAlbums', id: arg.id }]
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
            deleteAlbum: builder.mutation({
                // arg is whatever you passed to your hook as argument
                // in our case, arg is an album object
                invalidatesTags: (result, error, arg) => {
                    return [{ type: 'Album', id: arg.id }]
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE'
                    };
                }
            }),
            fetchAlbums: builder.query({
                // arg is whatever you passed to your hook as argument
                // in our case, arg is a user object
                providesTags: (result, error, arg) => {
                    const tags = result.map((album) => {
                        return { type: 'Album', id: album.id };
                    });

                    tags.push({ type: 'UsersAlbums', id: arg.id });

                    return tags;
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
    useDeleteAlbumMutation,
    useFetchAlbumsQuery 
} = albumsApi;

export { albumsApi };