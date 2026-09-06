import { useState } from "react";
import { PERMISSIONS } from "@/lib/site/trust";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/site/Icon";

type Tab = "overview" | "share" | "permissions" | "alerts";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "layout-dashboard" },
  { id: "share", label: "Share & connect", icon: "image-plus" },
  { id: "permissions", label: "Permissions", icon: "shield-check" },
  { id: "alerts", label: "Notifications", icon: "bell" },
];

/**
 * The family-facing dashboard.
 *
 * The design brief for this screen was: it must be impossible to mistake for
 * a monitoring product. No location, no vitals, no scores, no timeline of
 * everything they did — a sense of how the week has gone, the things they
 * chose to share, and the controls that make those limits visible.
 */
export function CaregiverDashboard({ className }: { className?: string }) {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className={cn("flex min-h-[30rem] flex-col bg-background lg:flex-row", className)}>
      <nav
        aria-label="Dashboard sections"
        className="flex gap-1 overflow-x-auto border-b border-border p-3 lg:w-56 lg:flex-col lg:border-r lg:border-b-0"
      >
        <p className="text-eyebrow hidden px-3 py-2 text-muted-foreground lg:block">Margaret</p>
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            aria-current={tab === item.id ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-refined",
              tab === item.id
                ? "bg-primary/12 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon name={item.icon} className="h-4.5 w-4.5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex-1 p-5 lg:p-7">
        {tab === "overview" ? <Overview /> : null}
        {tab === "share" ? <ShareTab /> : null}
        {tab === "permissions" ? <PermissionsTab /> : null}
        {tab === "alerts" ? <AlertsTab /> : null}
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-subhead text-foreground">This week with Margaret</h3>
          <p className="text-caption text-muted-foreground">
            A sense of the week — not a record of it.
          </p>
        </div>
        <span className="badge-pill bg-success/15 text-success">
          <Icon name="check" className="h-3.5 w-3.5" />
          Up and about today
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Conversations", value: "12", note: "about usual", icon: "message-circle" },
          { label: "Adventures opened", value: "9", note: "music, memories", icon: "sparkles" },
          { label: "Stories recorded", value: "2", note: "1 shared with you", icon: "mic" },
        ].map((stat) => (
          <div key={stat.label} className="stat-tile flex flex-col gap-1">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Icon name={stat.icon} className="h-4 w-4" />
              <span className="text-caption font-semibold">{stat.label}</span>
            </span>
            <span className="text-display text-[2rem] leading-none text-foreground">
              {stat.value}
            </span>
            <span className="text-caption text-muted-foreground">{stat.note}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card-soft p-5">
          <h4 className="text-title mb-3 text-foreground">Shared with you</h4>
          <ul className="flex flex-col gap-3">
            {[
              {
                icon: "mic",
                title: "“The winter the river froze”",
                meta: "Recorded Tuesday · 4 min",
              },
              {
                icon: "images",
                title: "Three photos from the lake house",
                meta: "Annotated Tuesday",
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[0.9375rem] font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="text-caption text-muted-foreground">{item.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-soft p-5">
          <h4 className="text-title mb-3 text-foreground">Coming up</h4>
          <ul className="flex flex-col gap-3">
            {[
              {
                icon: "calendar-check",
                title: "Sam's birthday",
                meta: "In 11 days · Clare is bringing the cake",
              },
              { icon: "phone-call", title: "Sunday call", meta: "Recurring · Daniel" },
              { icon: "calendar", title: "Optician", meta: "14 March, 10:30 · reminder set" },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[0.9375rem] font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="text-caption text-muted-foreground">{item.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="text-caption flex items-start gap-2 rounded-2xl border border-border bg-surface/60 p-4 text-muted-foreground">
        <Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0" />
        What Margaret says in a private conversation is never shown here. There is no setting that
        would change that.
      </p>
    </div>
  );
}

function ShareTab() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-subhead text-foreground">Send something</h3>
        <p className="text-caption text-muted-foreground">
          It arrives as a gentle prompt in her morning, not a notification pile.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            icon: "image-plus",
            title: "Add photos",
            body: "Drop them in. Sidekick asks her about them over the week.",
          },
          {
            icon: "mic",
            title: "Record a voice message",
            body: "Thirty seconds beats a text she has to squint at.",
          },
          { icon: "music", title: "Add a song", body: "With a note about why you chose it." },
          {
            icon: "puzzle",
            title: "Write a quiz",
            body: "The grandchildren are unreasonably good at this.",
          },
          {
            icon: "calendar-check",
            title: "Add a date",
            body: "Birthdays, appointments, anniversaries.",
          },
          {
            icon: "phone-call",
            title: "Call now",
            body: "Rings her screen with your name and face.",
          },
        ].map((item) => (
          <button
            key={item.title}
            type="button"
            className="card-soft hover-lift flex items-start gap-3 p-4 text-left"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span className="text-[0.9375rem] font-semibold text-foreground">{item.title}</span>
              <span className="text-caption text-muted-foreground">{item.body}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PermissionsTab() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-subhead text-foreground">What you can see</h3>
        <p className="text-caption text-muted-foreground">
          Set by Margaret, visible to her in the same words, and changeable by her at any time.
        </p>
      </div>
      <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border">
        {PERMISSIONS.map((row) => (
          <li key={row.what} className="flex flex-wrap items-start gap-3 bg-card/50 p-4">
            <span className="min-w-0 flex-1">
              <span className="block text-[0.9375rem] font-semibold text-foreground">
                {row.what}
              </span>
              <span className="text-caption block text-muted-foreground">{row.detail}</span>
            </span>
            <PermissionBadge value={row.familyDefault} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function PermissionBadge({ value }: { value: "always" | "with-permission" | "never" }) {
  const map = {
    always: { label: "Shared", className: "bg-success/15 text-success", icon: "check" },
    "with-permission": {
      label: "Her choice",
      className: "bg-accent/20 text-accent-foreground",
      icon: "user-check",
    },
    never: { label: "Never shared", className: "bg-muted text-muted-foreground", icon: "eye-off" },
  } as const;
  const entry = map[value];
  return (
    <span className={cn("badge-pill shrink-0", entry.className)}>
      <Icon name={entry.icon} className="h-3.5 w-3.5" />
      {entry.label}
    </span>
  );
}

function AlertsTab() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-subhead text-foreground">What reaches your phone</h3>
        <p className="text-caption text-muted-foreground">
          Chosen by you, capped by what Margaret has permitted.
        </p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {[
          { title: "A story or memory was shared with me", on: true },
          { title: "A photo I sent was opened", on: true },
          { title: "An upcoming birthday or appointment", on: true },
          { title: "She asked Sidekick to call me and I missed it", on: true },
          { title: "A quiet day — no conversations by evening", on: false },
          { title: "Weekly summary, Sunday evening", on: false },
        ].map((item) => (
          <li
            key={item.title}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/50 p-4"
          >
            <span className="text-[0.9375rem] text-foreground">{item.title}</span>
            <span
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-refined",
                item.on ? "bg-primary" : "bg-muted",
              )}
              aria-hidden="true"
            >
              <span
                className={cn(
                  "absolute h-5 w-5 rounded-full bg-white shadow-subtle transition-refined",
                  item.on ? "left-[1.375rem]" : "left-0.5",
                )}
              />
            </span>
          </li>
        ))}
      </ul>
      <p className="text-caption flex items-start gap-2 rounded-2xl border border-border bg-surface/60 p-4 text-muted-foreground">
        <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
        There is no location alert, no fall detection and no health monitoring. Senior Sidekick is a
        companion, not a medical or safety device.
      </p>
    </div>
  );
}
