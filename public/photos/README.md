# Demo photos

Drop real photos in here — `mom.jpg`, `dog.png`, `family.jpg` — then point
`src/lib/site/demoPhotos.ts` at them from the site root:

```ts
export const DEMO_PHOTOS: DemoPhoto[] = [
  { src: "/photos/mom.jpg", label: "Mum" },
  { src: "/photos/dog.png", label: "Biscuit" },
  { src: "/photos/family.jpg", label: "The whole lot of them" },
];
```

Anything in `public/` is served from the site root as-is, so
`public/photos/mom.jpg` is `/photos/mom.jpg` in the browser. Nothing here is
uploaded anywhere — it ships with the site.

These feed the ambient background behind the app demo and the avatars in
caregiver mode. Square-ish crops around 300px look best; they render as
circles at 84–124px.
