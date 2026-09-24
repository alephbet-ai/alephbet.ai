import { getSvgPath } from "figma-squircle";

// Builds a CSS `mask` value that gives any element Apple-style squircle
// corners, computed once at build time — no client JS, no resize work.
//
// A squircle corner's shape depends only on its radius and smoothing, not
// on the element's size: with smoothing s the curve spans (1 + s) * radius
// along each edge. So we draw one squircle exactly two corners wide, cut it
// into four quadrant SVGs (one per corner) via viewBox, pin those to the
// element's corners, and fill the rest with two solid cross-shaped strips.
export function squircleMask(radius: number, smoothing = 1): string {
  const tile = (1 + smoothing) * radius;
  const size = tile * 2;
  const path = getSvgPath({
    width: size,
    height: size,
    cornerRadius: radius,
    cornerSmoothing: smoothing,
  });

  const corner = (x: number, y: number) =>
    `url("data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${tile} ${tile}"><path d="${path}"/></svg>`,
    )}")`;
  const px = `${tile}px`;
  const solid = "linear-gradient(#000 0 0)";

  return [
    `${corner(0, 0)} top left / ${px} ${px} no-repeat`,
    `${corner(tile, 0)} top right / ${px} ${px} no-repeat`,
    `${corner(0, tile)} bottom left / ${px} ${px} no-repeat`,
    `${corner(tile, tile)} bottom right / ${px} ${px} no-repeat`,
    `${solid} center / calc(100% - ${size}px) 100% no-repeat`,
    `${solid} center / 100% calc(100% - ${size}px) no-repeat`,
  ].join(", ");
}
