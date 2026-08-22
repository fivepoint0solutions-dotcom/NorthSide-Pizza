import type { QuickAction } from "@/lib/ai";
import { QUICK_ACTIONS } from "@/lib/modes";
import { cn } from "@/lib/utils";

type QuickActionBarProps = {
  actions?: QuickAction[];
  onAction: (action: QuickAction) => void;
  disabled?: boolean;
  className?: string;
};

/** The row of "give me 3 approaches / make this simpler" style collaborator prompts. */
export function QuickActionBar({ actions, onAction, disabled, className }: QuickActionBarProps) {
  const items = actions ? QUICK_ACTIONS.filter((a) => actions.includes(a.id)) : QUICK_ACTIONS;

  return (
    <div className={cn("-mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 py-1", className)}>
      {items.map((action) => (
        <button
          key={action.id}
          type="button"
          className="chip"
          disabled={disabled}
          onClick={() => onAction(action.id)}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

export default QuickActionBar;
