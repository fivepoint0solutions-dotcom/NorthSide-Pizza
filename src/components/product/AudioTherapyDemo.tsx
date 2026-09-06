import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/site/Icon";

interface Track {
  title: string;
  artist: string;
  addedBy?: string;
}

const PLAYLIST: Track[] = [
  { title: "Dreams (Fleetwood Mac cover)", artist: "Lanie Gardner", addedBy: "Robert" },
  { title: "Cry to Me", artist: "Solomon Burke", addedBy: "Robert" },
  { title: "Stand By Me", artist: "Ben E. King", addedBy: "Robert" },
  { title: "California Dreamin'", artist: "The Mamas & The Papas" },
];

const CALM_SOUNDS = ["Rain on a window", "Ocean waves", "Soft piano", "Evening crickets"];

/**
 * FLAGSHIP FEATURE — Audio Therapy & Music Player.
 *
 * Two things live in one place: a nostalgia playlist built from music a
 * family actually chose (with who added it, because that context is half
 * the point), and a bank of calming, therapeutic audio streams for the
 * harder hours — restlessness, sundowning, trouble settling at night.
 *
 * The transport controls are large on purpose — this is one of the two
 * places in the product built for low dexterity and tremor first.
 */
export function AudioTherapyDemo({ className }: { className?: string }) {
  const [mode, setMode] = useState<"playlist" | "calm">("playlist");
  const [nowPlaying, setNowPlaying] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [calmSound, setCalmSound] = useState<string | null>(CALM_SOUNDS[0] ?? null);

  const track = PLAYLIST[nowPlaying] ?? PLAYLIST[0]!;
  const next = () => setNowPlaying((i) => (i + 1) % PLAYLIST.length);
  const prev = () => setNowPlaying((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length);

  return (
    <div className={cn("flex flex-col bg-background", className)}>
      <header
        className="gradient-motion flex items-center justify-between gap-3 p-5 text-white"
        style={{ backgroundImage: "var(--grad-music)" }}
      >
        <div>
          <p className="text-eyebrow text-white/75">Audio Therapy</p>
          <p className="font-display text-2xl font-bold">Songs picked just for you</p>
        </div>
        <Icon name="music" className="h-8 w-8 text-white/85" />
      </header>

      <div className="flex gap-1 border-b-2 border-border p-3">
        {(["playlist", "calm"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={mode === option}
            onClick={() => setMode(option)}
            className={cn(
              "flex-1 rounded-full px-4 py-2.5 text-base font-semibold transition-refined",
              mode === option ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {option === "playlist" ? "Nostalgia playlist" : "Calming sounds"}
          </button>
        ))}
      </div>

      {mode === "playlist" ? (
        <div className="flex flex-col gap-4 p-5">
          <ul className="flex flex-col gap-2">
            {PLAYLIST.map((item, index) => (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={() => {
                    setNowPlaying(index);
                    setPlaying(true);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-refined",
                    index === nowPlaying
                      ? "border-border-strong bg-secondary"
                      : "border-transparent hover:border-border",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                      index === nowPlaying
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon
                      name={index === nowPlaying && playing ? "pause" : "play"}
                      className="h-4 w-4"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-base font-semibold text-foreground">
                      {item.title}
                    </span>
                    <span className="text-caption block truncate text-muted-foreground">
                      {item.artist}
                      {item.addedBy ? ` · added by ${item.addedBy}` : ""}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Transport — deliberately oversized. */}
          <div
            className="gradient-motion mt-auto flex items-center justify-center gap-3 rounded-3xl border-2 border-border-strong p-4"
            style={{ backgroundImage: "var(--grad-music)" }}
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Previous song"
              className="tap-target rounded-full bg-white/20 text-white"
            >
              <Icon name="skip-back" className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play"}
              className="tap-target h-16 w-16 rounded-full bg-white text-primary shadow-raised"
            >
              <Icon name={playing ? "pause" : "play"} className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next song"
              className="tap-target rounded-full bg-white/20 text-white"
            >
              <Icon name="skip-forward" className="h-6 w-6" />
            </button>
          </div>
          <p className="text-caption text-center text-muted-foreground">
            Now playing: <span className="font-semibold text-foreground">{track.title}</span>
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-5">
          <p className="text-body text-muted-foreground">
            For the harder hours — restlessness, sundowning, or trouble settling at night. Proven
            calming effects, not just background noise.
          </p>
          <ul className="grid grid-cols-2 gap-3">
            {CALM_SOUNDS.map((sound) => (
              <li key={sound}>
                <button
                  type="button"
                  onClick={() => setCalmSound(sound)}
                  aria-pressed={calmSound === sound}
                  className={cn(
                    "tap-target w-full flex-col gap-2 rounded-3xl border-2 p-4 text-center text-base font-semibold transition-refined",
                    calmSound === sound
                      ? "border-border-strong bg-primary/10 text-primary"
                      : "border-border text-muted-foreground",
                  )}
                >
                  {sound}
                </button>
              </li>
            ))}
          </ul>
          {calmSound ? (
            <div
              className="gradient-motion mt-auto flex items-center gap-3 rounded-3xl border-2 border-border-strong p-4 text-white"
              style={{ backgroundImage: "var(--grad-calm)" }}
            >
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="tap-target h-14 w-14 shrink-0 rounded-full bg-white/90 text-primary"
              >
                <Icon name={playing ? "pause" : "play"} className="h-6 w-6" />
              </button>
              <span className="flex flex-col">
                <span className="text-lg font-bold">{calmSound}</span>
                <span className="text-caption text-white/80">
                  Loops gently, no ending to notice
                </span>
              </span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
