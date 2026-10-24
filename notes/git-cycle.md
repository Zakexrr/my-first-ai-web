# Exercise 1.2 — AI-assisted Git and GitHub cycle

Evidence for **Exercise 1.2** of Homework 01. Everything below was executed by the agent in
this repository; the student completed the GitHub sign-in, reviewed the pull request and
approved the merge.

## 1. Repository facts

| Item | Value |
| --- | --- |
| Repository URL | https://github.com/Zakexrr/my-first-ai-web |
| Visibility | public |
| Local path | `C:\Users\OMEN\Desktop\Himcm\my-first-ai-web` |
| Default / working branch | `main` |
| Remote | `origin  https://github.com/Zakexrr/my-first-ai-web.git` |
| Authenticated integration | GitHub CLI 2.103.2 (`gh auth status` → logged in as `Zakexrr`, scopes `repo`, `read:org`, `gist`) |
| Git version | 2.56.0.windows.3 |

## 2. Commit and pull-request links

| Milestone | ID / link |
| --- | --- |
| Repository initial commit (README created by GitHub) | `0002b10` |
| **First working page** | `37754e0` — https://github.com/Zakexrr/my-first-ai-web/commit/37754e083e72bffee3bbbcd33e2eb29485fde454 |
| **Feature commit** (on `feature/reset-button`) | `1ff76ee` — https://github.com/Zakexrr/my-first-ai-web/commit/1ff76ee78580c7af6fc4204c3d0f30652b2385e3 |
| **Pull request #1** | https://github.com/Zakexrr/my-first-ai-web/pull/1 |
| **Merge commit** | `ffd8a21` — merged 2026-10-24T10:58:58Z |

Resulting history on `main`:

```
*   ffd8a21 Merge pull request #1 from Zakexrr/feature/reset-button
|\
| * 1ff76ee Add reset button to restore the starting message
|/
* 37754e0 Build first working page
* 0002b10 Initial commit
```

## 3. Local-update evidence

The feature was merged on GitHub first, then pulled into local `main` with a fast-forward only.
Before pulling, the two histories were compared and the remote was strictly ahead:

```
$ git log --oneline --left-right HEAD...origin/main
> ffd8a21 Merge pull request #1 from Zakexrr/feature/reset-button
> 1ff76ee Add reset button to restore the starting message

$ git pull --ff-only origin main
Updating 37754e0..ffd8a21
Fast-forward
 assets/app.js     | 18 +++++++++++++++++-
 assets/styles.css | 17 ++++++++++++++++-
 index.html        |  3 ++-
```

After the pull both commit IDs are identical, which is what actually proves local `main`
contains the merged feature (a clean working tree alone would not):

```
$ git rev-parse HEAD          → ffd8a2178d4a4e4c02df8be7e6b3a0932654e37e
$ git rev-parse origin/main   → ffd8a2178d4a4e4c02df8be7e6b3a0932654e37e
```

The merged code is present locally: `index.html` line 20 declares `#reset-button`, and
`assets/app.js` contains `DEFAULT_TEXT`, `resetButton` and the shared `render()` function.

## 4. Prompt execution check record

**Prompt sent (step 4 of the reference cycle):**

> From an up-to-date `main` branch, create `feature/reset-button`. Add a Reset button that
> restores the starting message, check it and show the diff. Once I approve the changed files,
> commit and push this feature branch. Keep `main` unchanged until the PR is merged.

**What the agent reported, and how it was checked:**

| Agent claim | Independently verified by |
| --- | --- |
| "Created `feature/reset-button` from latest `main`" | `git branch --show-current` → `feature/reset-button`; `git log -1 main` still `37754e0` |
| "Only three files changed" | `git diff --stat` → `index.html`, `assets/app.js`, `assets/styles.css` (+35/−3); `git ls-files --others` empty |
| "Pushed the feature branch" | `git push -u origin feature/reset-button` then `git ls-remote` shows the branch at `1ff76ee` |
| "Opened PR #1" | `gh pr view 1` → `state: OPEN`, `mergeable: MERGEABLE`, PR URL as above |
| "Merged and pulled into local main" | `git rev-parse HEAD` equals `git rev-parse origin/main` (section 3) |

## 5. commit, push and pull

- **commit** records the staged changes as a new permanent snapshot in the local repository
  history, together with a message and author.
- **push** uploads the local commits that the remote branch does not have yet, which is how the
  branch on GitHub becomes identical to the local one.
- **pull** downloads the remote commits and integrates them into the current local branch; with
  `--ff-only` it only succeeds when that can be done as a fast-forward, so it never rewrites
  or merges divergent history.

## 6. Environment notes (honest record)

The machine had no Git and no GitHub CLI installed, so the agent installed portable
Git 2.56.0 and GitHub CLI 2.103.2 under `_tools/` (no administrator rights, nothing added to
the system `PATH`). Two real problems were hit and fixed rather than worked around silently:

1. **TLS backend.** Git's default Windows backend (`schannel`) failed with
   `SEC_E_NO_CREDENTIALS`, so `http.sslBackend` was set to `openssl`.
2. **Credential helper.** The `!gh auth git-credential` helper needs `/bin/sh`, which cannot
   start in this restricted shell, and a system-wide `credential.helper = helper-selector`
   intercepted requests first. Authentication was therefore supplied through a per-command
   HTTP `Authorization` header instead of the helper protocol.

The student performed the GitHub sign-in personally through the browser device flow; no
password, token or one-time code was ever typed into a chat prompt. The student also reviewed
the pull request and authorised the merge.
