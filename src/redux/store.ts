import { configureStore } from '@reduxjs/toolkit'
import UiReducer from "./UI";
export const store = configureStore({
  reducer: {
    UI: UiReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch