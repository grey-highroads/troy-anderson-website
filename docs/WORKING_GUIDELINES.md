# Working Guidelines

These guidelines are the default rules for project decisions. Exceptions should be deliberate and recorded in the decision log.

## Scope and complexity

- Choose the simplest implementation that fully meets the approved need.
- Do not add a library, service, abstraction, or content type for a hypothetical future requirement.
- Prefer a small number of authored states over configurable systems.
- New ideas go into a backlog until they are explicitly approved for the current scope.
- A feature is not complete merely because it works on the primary developer's machine.

## User experience

- The content is the show; interface chrome stays minimal.
- Motion should clarify selection and composition, not create constant activity.
- No persistent clip labels, metadata cards, or explanatory sidebar on the homepage.
- Keyboard, touch, and pointer interactions must reach the same outcomes.
- Respect `prefers-reduced-motion` with a calm, usable alternative.
- Mobile gets intentional layouts and interaction behavior.

## Content management

- CMS fields should use language the client team already understands.
- Prefer structured objects and focused forms over free-form page construction.
- Editors control content, order, visibility, and links.
- Code controls layout, visual styling, responsive rules, and motion.
- Draft or incomplete content must not appear publicly by accident.
- Media requirements should be explained next to the relevant CMS field.

## Engineering

- Use TypeScript and keep types close to the content or behavior they describe.
- Build components around clear content and interaction boundaries.
- Use native browser and framework features before introducing dependencies.
- Keep motion choreography separate from content retrieval.
- Avoid hardcoding account IDs, domains, datasets, or secrets in application code.
- Environment-specific values belong in documented environment variables.
- Errors should fail clearly and leave the public site in a usable state.

## Performance

- Do not autoplay every video tile.
- Use compact, muted preview loops with appropriate poster images.
- Lazy-load media outside the initial viewport.
- Avoid shipping desktop video assets to mobile when smaller variants are available.
- Test with realistic media and ordinary network conditions, not placeholder rectangles alone.
- Treat visual stability and interaction responsiveness as acceptance criteria.

## Accessibility

- All interactive clips must be keyboard reachable.
- Focus state must remain visible against every approved composition.
- Expanded media requires a clear close action and sensible focus return.
- Provide text alternatives for meaningful images and media.
- Color is not the only indicator of state.
- Verify contrast after the visual design is implemented.

## Source control and review

- Keep the default branch deployable.
- Use short-lived branches for focused changes.
- Keep commits small enough to review and describe the outcome plainly.
- Pull requests should state what changed, how it was verified, and whether scope changed.
- Do not mix unrelated cleanup with feature work.
- Record decisions that affect architecture, ownership, scope, or the client workflow.

## Environments and data

- Local, staging, and production are separate environments.
- Temporary 2520 accounts may host development and staging only.
- Do not connect the live domain to temporary 2520 infrastructure.
- Do not collect real form submissions or store production secrets in temporary environments.
- Production data and billing belong in client-owned accounts before launch.

## Definition of done

A milestone is done when its documented exit criteria are met, the result has been reviewed at the appropriate screen sizes, and any operational instructions are updated. “Mostly complete” work stays in the current milestone.

