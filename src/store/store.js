import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./slices/todo.slice";

const STORAGE_KEY = "todo_state";

const loadState = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return undefined;
        const parsed = JSON.parse(raw);
        return parsed || undefined;
    } catch (_e) {
        console.error("Get State Failed to load state:", _e);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const toSave = {
            todo: state.todo,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (_e) {
        // ignore
        console.error("Set State Failed to save state:", _e);
    }
};

const persistMiddleware = (storeAPI) => (next) => (action) => {
    const result = next(action);
    saveState(storeAPI.getState());
    return result;
};

const store = configureStore({
    reducer: {
        todo: TodoSlice,
    },
    preloadedState: loadState(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistMiddleware),
});

export default store;