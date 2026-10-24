# my-first-ai-web

**Date:** 2026-10-24

A tiny static page built by an AI agent during **Homework 01, Exercise 1.2** — the exercise
about letting an agent drive the Git and GitHub cycle while the student approves, reviews and
merges.

## Purpose

Prove one complete, authenticated GitHub workflow end to end:

- a real repository on GitHub (public),
- a working page committed and pushed from this clone,
- one feature built on a branch, reviewed through a pull request, merged, and pulled back
  into local `main`.

The page itself is intentionally small. The graded part is the version-control cycle.

## Features

1. **Message button** — clicking *Change message* cycles the visible message.
2. **Reset button** — restores the starting message (added on `feature/reset-button`).
3. **Accessible status region** — the message is announced to screen readers via
   `role="status"` and `aria-live="polite"`.

## How to open

No build step and no dependencies. Either:

- double-click `index.html`, or
- if GitHub Pages is enabled for this repository, open the published URL listed in
  [notes/git-cycle.md](notes/git-cycle.md).

## Controls

| Control | Action |
| --- | --- |
| Change message | Advances to the next message in the built-in list. |
| Reset | Returns to "The message has not changed yet." Disabled while nothing has changed. |

## Limitations

- The message list is hard-coded in `assets/app.js`; there is no backend, no accounts and no
  network calls.
- State is not persisted: refreshing the page returns to the starting message.
- Version 1 has no styling themes and no animation.

## Assets and credits

- HTML, CSS and JavaScript written from scratch by the agent in this session; no third-party
  libraries, fonts or images.
- No synthetic data sets are used; the message strings are sample copy.

## Layout

```
index.html          entry point
assets/styles.css   presentation
assets/app.js       message + reset behaviour
notes/git-cycle.md  evidence for Exercise 1.2 (links, commit IDs, checks)
```
