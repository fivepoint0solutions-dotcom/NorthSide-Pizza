import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/site/Icon";

/**
 * "Use your own photos" — hands the ambient background a set of images the
 * visitor picked from their own device, so the demo can be seen with the
 * faces it would actually carry.
 *
 * The files never leave the browser: `URL.createObjectURL` makes a local
 * handle per file, and the handles are revoked as soon as they're replaced
 * or the component unmounts, which is what stops them leaking for the rest
 * of the session.
 */
export function PhotoPicker({ onChange }: { onChange: (photos: string[] | undefined) => void }) {
  const inputId = useId();
  const [count, setCount] = useState(0);
  // Kept in a ref as well as passed up, so cleanup can revoke the exact set
  // that's going out of use without re-running on every parent render.
  const urls = useRef<string[]>([]);

  const release = () => {
    urls.current.forEach((url) => URL.revokeObjectURL(url));
    urls.current = [];
  };

  useEffect(() => release, []);

  const handlePick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (files.length === 0) return;

    release();
    // Six is all the drift layer shows at once; more would only be queued.
    urls.current = files.slice(0, 6).map((file) => URL.createObjectURL(file));
    setCount(urls.current.length);
    onChange(urls.current);
  };

  const handleReset = () => {
    release();
    setCount(0);
    onChange(undefined);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={inputId}
          className="tap-target cursor-pointer gap-2 rounded-full border-2 border-border-strong px-5 py-2.5 text-sm font-semibold transition-refined hover:border-interactive hover:text-interactive"
        >
          <Icon name="image-plus" className="h-4.5 w-4.5" />
          Use your own photos
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePick}
          className="sr-only"
        />
        {count > 0 ? (
          <button
            type="button"
            onClick={handleReset}
            className="tap-target gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-muted-foreground underline-offset-4 hover:underline"
          >
            Put the samples back
          </button>
        ) : null}
      </div>
      <p className="text-caption text-muted-foreground">
        {count > 0
          ? `${count} of your photos are drifting behind the screen now.`
          : "They stay on your device — nothing is uploaded, and they're gone when you close the tab."}
      </p>
    </div>
  );
}

export default PhotoPicker;
