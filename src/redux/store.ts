import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import bookAPI from "./apis/bookAPI";
import { setupListeners } from "@reduxjs/toolkit/query";
import borrowAPI from "./apis/borrowAPI";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    [bookAPI.reducerPath]: bookAPI.reducer,
    [borrowAPI.reducerPath]: borrowAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookAPI.middleware, borrowAPI.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
