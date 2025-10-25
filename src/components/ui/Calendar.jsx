// Minimal calendar wrapper using native date input to satisfy props used in EditTodoModal
export function Calendar({ mode = 'single', selected, onSelect, initialFocus }) {
    const value = selected ? new Date(selected).toISOString().slice(0, 10) : '';
    return (
        <input
            type="date"
            value={value}
            onChange={(e) => {
                const v = e.target.value;
                onSelect?.(v ? new Date(v) : undefined);
            }}
            autoFocus={!!initialFocus}
            className="border border-gray-200 rounded-md p-2"
        />
    );
}
