import React, { useState, cloneElement } from 'react';

export function Popover({ children }) {
  const [open, setOpen] = useState(false);

  let trigger = null;
  let content = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type && child.type.displayName === 'PopoverTrigger') trigger = child;
    if (child.type && child.type.displayName === 'PopoverContent') content = child;
  });

  const triggerEl = trigger?.props?.asChild
    ? cloneElement(trigger.props.children, {
        onClick: (e) => {
          trigger.props.children.props?.onClick?.(e);
          setOpen((v) => !v);
        },
      })
    : (
        <button type="button" onClick={() => setOpen((v) => !v)}>{trigger?.props?.children}</button>
      );

  return (
    <div className="relative inline-block">
      {triggerEl}
      {open && (
        <div className="absolute z-50 mt-2">{content?.props?.children}</div>
      )}
    </div>
  );
}

export function PopoverTrigger(_props) {
  return null;
}
PopoverTrigger.displayName = 'PopoverTrigger';

export function PopoverContent({ className = '', align = 'start', children }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-md shadow-md p-2 ${className}`}>{children}</div>
  );
}
PopoverContent.displayName = 'PopoverContent';
