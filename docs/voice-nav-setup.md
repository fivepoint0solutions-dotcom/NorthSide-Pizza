# Voice nav + geocoding — setup

Code is done. These are the console steps left (your side).

## 1. Supabase columns

Fastest path — run the migration as SQL:

1. Supabase dashboard → **SQL Editor** → **New query**.
2. Paste all of `supabase/migrations/20260906120000_contacts_geo_and_profile_settings.sql`.
3. Click **Run**.
4. **Table Editor** → `contacts` → confirm: `nickname`, `address`, `lat`, `lng`, `geocoded_address`, `geocoded_at`.
5. **Table Editor** → `profiles` → confirm `settings` (jsonb, default with `brain_games`, `mapping`, `camera_id`, …).

Every statement is guarded (`add column if not exists`), so it is safe on an existing table.

## 2. Mapbox token

1. account.mapbox.com → **Tokens** → **Create a token**.
2. Name it `northside-web`, leave the default public scopes.
3. Under **URL restrictions**, add your app domain + `http://localhost:*`.
4. **Create token**, copy the `pk.…` value.
5. Paste into `.env` as `VITE_MAPBOX_TOKEN` (see `.env.example`).

Optional custom style: Mapbox Studio → **New style** → _Navigation Day_ → publish → copy the
style URL into `VITE_MAPBOX_STYLE_URL`. Without it the app uses
`mapbox://styles/mapbox/navigation-day-v1` and strips the clutter at runtime
(`src/lib/nav/bigMapStyle.ts`: POI/transit layers hidden, route line 9–26px, casing 14–34px).

## 3. What each file does

| File                                            | Job                                                                 |
| ----------------------------------------------- | ------------------------------------------------------------------- |
| `src/lib/nav/geocode.ts`                        | Mapbox forward geocode, one call per address                        |
| `src/lib/nav/contacts.ts`                       | Save contact; geocodes **only** when `address !== geocoded_address` |
| `src/lib/nav/match.ts`                          | Transcript → contact, fuzzy on nickname + name                      |
| `src/lib/nav/stt.ts`                            | Browser Web Speech API, one shot                                    |
| `src/lib/nav/navigate.ts`                       | `navigateTo(contact_id)` — the single seam                          |
| `src/lib/nav/directions.ts`                     | Mapbox Directions + turn steps                                      |
| `src/components/nav/BigMapView.tsx`             | Mapbox GL JS, fat route line, big turn card                         |
| `src/components/nav/VoiceNavButton.tsx`         | Mic → match → open map                                              |
| `src/lib/settings/featureFlags.tsx`             | `profiles.settings` toggles, `<FeatureGate flag="…">`               |
| `src/components/settings/CaregiverSettings.tsx` | Caregiver toggle screen (`/caregiver`)                              |

Screens: `/navigate` (voice + map), `/caregiver` (toggles).

## 4. Vapi swap — later, no map changes

The tool schema is already exported as `NAVIGATE_TO_TOOL` in `src/lib/nav/navigate.ts`:

```json
{
  "name": "navigate_to",
  "parameters": {
    "type": "object",
    "properties": { "contact_id": { "type": "string" } },
    "required": ["contact_id"]
  }
}
```

Vapi → assistant → **Tools** → add a function with that schema. On call, hit
`navigateTo(contact_id)`. The fuzzy matcher is the only thing that drops out;
geocoding, routing and the map are untouched.

## 5. Feature toggles

Home-screen buttons read their own flag:

```tsx
<FeatureGate flag="brain_games">
  <BrainGamesButton />
</FeatureGate>
```

Caregiver mode flips them at `/caregiver`; writes go to `profiles.settings` and fall back
to `localStorage` when Supabase isn't configured.
