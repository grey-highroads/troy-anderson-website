# New builder session prompt

Paste the text below into a new session attached to this repository. This prompt requests orientation only; add the next specific task when ready.

---

Continue the Troy Anderson website from the current repository and latest `main`. Workspace: `/Users/greygarner/Documents/Codex/2026-09-10/referenced-chatgpt-conversation-this-is-an-2`.

First read `AGENTS.md`, `docs/CURRENT_HANDOFF.md`, `README.md`, and `docs/WORKING_GUIDELINES.md`. Read operational/CMS docs linked there for the area you touch. Inspect the current branch, remote synchronization, working-tree changes, and recent commits. Report any discrepancy before implementation. Do not reconstruct the site from older chat history, archived snapshots, or a design draft. Before writing Next.js code, read the relevant installed guides under `node_modules/next/dist/docs/`.

At the October 25 handoff the latest implementation was `c0d82ff`: 14 updated hero preview loops and posters, pushed and deployed successfully, with all 14 observed playing. The prior October 22 work includes structural/typography refinements, aligned Book/About/Contact/Media Sanity fields, editable About video/pull quote/photo credit, Book retailer graphics and button controls, and an unlinked `/press/` page with the restored 17-photo grid. Press is noindex but publicly accessible by URL, not authenticated. Use current HEAD, which also contains the handoff documentation.

Our workflow: propose a coherent punchlist pass, get my approval, implement/check, push to GitHub, and verify the deployed page in a browser. Direct requests authorize their stated scope. Routine scoped pushes are already authorized. Sanity schema changes require a separate Studio deploy and hosted-editor verification. Preserve drafts and existing content.

Prioritize structural/CSS work over unsettled content. Content is ultimately the client's call; push back only for a structural or engineering reason. Keep headlines all caps at their current rebalanced size. Leave homepage content alone unless asked, and leave the Book sample destination until an approved replacement URL arrives. Do not infer that source-punchlist suggestions are approved. Find the existing copy-review spreadsheet by the exact title and file type recorded in the handoff through connected Google Drive; do not create a duplicate or substitute the earlier Google Doc of the same name.

Preserve the pre-existing dirty Superdesign files, `next-env.d.ts`, and the three untracked duplicate-named config/script files listed in the handoff. Do not stage, discard, or clean them up. Do not change accounts/billing/visibility, perform domain cutover, create a new chat, or start speculative roadmap work.

Primary browser review: https://troy-anderson-website.grey-4fe.workers.dev/
Secondary static preview: https://grey-highroads.github.io/troy-anderson-website/
Studio: https://troy-anderson.sanity.studio/

Begin with a brief current-state confirmation and any unresolved context gaps, then wait for my next task. No new implementation pass is selected by this prompt.
