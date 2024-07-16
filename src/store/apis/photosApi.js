import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const photosApi = createApi({
    reducerPath: 'photos',
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
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'AlbumsPhotos', id: album.id }]
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        body: {
                            albumId: album.id,
                            url: faker.image.abstract(150, 150, true)
                        },
                        method: 'POST'
                    };
                }
            }),
            deletePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.id }]
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE'
                    };
                }
            }),
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => {
                    const tags = result.map((photo) => {
                        return { type: 'Photo', id: photo.id };
                    });

                    tags.push({ type: 'AlbumsPhotos', id: album.id });

                    return tags;
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id,
                        },
                        method: 'GET'
                    };
                }
            })
        };
    }
});

export const { 
    useAddPhotoMutation,
    useDeletePhotoMutation,
    useFetchPhotosQuery 
} = photosApi;

export { photosApi };