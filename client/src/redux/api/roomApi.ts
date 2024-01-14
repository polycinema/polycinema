import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const roomApi = createApi({
    reducerPath: "room",
    tagTypes: ["Room"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: async (...arg) => {
            return fetch(...arg);
        },
    }),
    endpoints: (build) => ({
        getAllRooms: build.query({
            query: () => `/admin/rooms`,
            providesTags: ["Room"],
        }),
        getRoomById: build.query({
            query: (id: string | number | undefined) => `/admin/rooms/${id}`,
            providesTags: ["Room"],
        }),
        addRoom: build.mutation({
            query: (room) => ({
                url: `/admin/rooms`,
                method: "POST",
                body: room,
            }),
            invalidatesTags: ["Room"],
        }),
        updateRoom: build.mutation({
            query: (room) => ({
                url: `/admin/rooms/${room.id}`,
                method: "PATCH",
                body: room,
            }),
            invalidatesTags: ["Room"],
        }),
        
        SoftDeleteRoom: build.mutation({
            query: (room_id) => ({
                url: `/change-level-room`,
                method: "POST",
                body: room_id,
            }),
            invalidatesTags: ["Room"],
        }),
        getRoomSoft: build.query({
            query: () => `/room-in-trash`,
            providesTags: ["Room"],
        }),
    }),
});

export const {
    useAddRoomMutation,
    useGetAllRoomsQuery,
    useGetRoomByIdQuery,
    useUpdateRoomMutation,
    useSoftDeleteRoomMutation,
    useGetRoomSoftQuery
} = roomApi;
export const roomReducer = roomApi.reducer;
export default roomApi;