import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    filters: {
        status: "all",
        searchQuery: "",
        sortBy: "date-desc",
    },
};

const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.unshift(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            const { id, changes } = action.payload;
            const idx = state.todos.findIndex((t) => t.id === id);
            if (idx !== -1) {
                state.todos[idx] = { ...state.todos[idx], ...changes };
            }
        },
        toggleTodo: (state, action) => {
            const id = action.payload;
            const t = state.todos.find((x) => x.id === id);
            if (t) {
                t.completed = !t.completed;
            }
        },
        setStatus: (state, action) => {
            state.filters.status = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.filters.searchQuery = action.payload;
        },
        setSortBy: (state, action) => {
            state.filters.sortBy = action.payload;
        },
    },
});

export const { addTodo, removeTodo, updateTodo, toggleTodo, setStatus, setSearchQuery, setSortBy } = TodoSlice.actions;
export default TodoSlice.reducer;

