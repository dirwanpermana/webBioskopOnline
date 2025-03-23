// file redux utk state management filter dan simpan data checkout

import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '@/redux/features/filter/filterSlice'
import ticketReducer from '@/redux/features/ticket/ticketSlice'
// ...

const store = configureStore({
  reducer: {
    filter: filterReducer,
    ticket: ticketReducer,
//     posts: postsReducer,
//     comments: commentsReducer,
//     users: usersReducer,Q
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;