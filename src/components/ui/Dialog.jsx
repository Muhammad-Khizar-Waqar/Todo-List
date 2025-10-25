
export function Dialog({ open, onOpenChange, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40" onClick={() => onOpenChange?.(false)} />
            <div className="relative z-10 w-full max-w-lg mx-4">{children}</div>
        </div>
    );
}

export function DialogContent({ className = '', children }) {
    return (
        <div className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}>
            {children}
        </div>
    );
}

export function DialogHeader({ children }) {
    return <div className="p-4 border-b border-gray-200">{children}</div>;
}

export function DialogTitle({ children }) {
    return <h2 className="text-lg font-semibold">{children}</h2>;
}
