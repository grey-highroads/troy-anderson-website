# Infrastructure and Handoff

## Ownership policy

The client will own all production accounts, billing relationships, domains, source code, content, and deployment configuration.

To avoid blocking early work, 2520 Consulting may use existing accounts for local development, technical proofs, and staging. Those resources are temporary and must not become the production system by default.

## Environment model

| Environment | Purpose | Ownership | Real data | Live domain |
| --- | --- | --- | --- | --- |
| Local | Daily implementation | 2520 Consulting | No | No |
| Staging | Review and technical proof | Temporarily 2520 Consulting | Representative or approved test content | No |
| Production | Public website | Client | Yes | Yes |

## Safe temporary setup

Development can begin with:

- A private repository in the 2520 GitHub organization
- A Cloudflare staging project using a temporary preview hostname
- A Sanity development project or dataset
- Test-only form credentials
- Representative content cleared for staging use

Temporary infrastructure must not:

- Own or control the client's registered domain
- Become the only copy of production content
- Receive real contact submissions without explicit approval
- Contain client production secrets or personal billing details
- Require a rewrite to deploy in a different account

## Portability requirements

- Keep account-specific identifiers in environment variables.
- Maintain an up-to-date `.env.example` containing names and explanations, never values.
- Keep deployment configuration in the repository wherever practical.
- Document every external service and the reason it exists.
- Avoid dependencies on personal user accounts when an organization or project account is available.
- Make the production build reproducible from the repository and documented environment values.

## Migration timing

Client account setup should begin after the technical proof is approved and finish before client beta. Do not postpone infrastructure migration until launch day.

Recommended checkpoints:

1. **Prototype approved:** send the client a short account checklist.
2. **Application foundation complete:** create client organizations and invite 2520.
3. **Before client beta:** establish the client-owned production deployment and CMS.
4. **Before DNS cutover:** verify billing, permissions, secrets, backups, forms, analytics, privacy disclosures, consent behavior, and security headers.
5. **After launch:** remove temporary dependencies and confirm client access.

## Resource handoff matrix

| Resource | Temporary development state | Production target | Completion test |
| --- | --- | --- | --- |
| GitHub | Private 2520 repository | Client-owned organization/repository | Client administrator can manage access and the default branch deploys |
| Cloudflare | 2520 staging project | Client-owned production project | Production deploy succeeds and client controls billing/settings |
| Sanity | Development project or dataset | Client-owned project/organization | Andrew can edit and publish approved content |
| Domain and DNS | Remain untouched | Existing client-controlled registrar/DNS | Site resolves correctly and email records remain valid |
| Forms | Test credentials | Client-owned delivery credentials | Test submission reaches the approved recipient |
| Analytics | None or test property | Client-owned property | Client can view verified production traffic |
| Secrets | Local/staging values | Client production environment | No production secret depends on a personal account |
| Privacy and consent | No banner before tracker inventory | Client-approved notice and consent configuration | Published disclosures and consent behavior match the production data flows |

## Cutover procedure

1. Freeze release-candidate code and record the deployed revision.
2. Confirm the client can access every production service.
3. Populate production environment variables from client-owned credentials.
4. Deploy to the client's Cloudflare project.
5. Validate production content, media, forms, metadata, and analytics on the temporary production hostname.
6. Review current DNS records, especially mail-related records, before changing anything.
7. Point the web records to the verified production deployment.
8. Run launch smoke tests on the live domain.
9. Deliver operating instructions and complete CMS training.
10. Agree on a short rollback and temporary-resource retention window.

## Final handoff checklist

- [ ] Client administrator access is confirmed for every production service.
- [ ] Client billing is active where required.
- [ ] Repository ownership and branch permissions are confirmed.
- [ ] Production deployment can be reproduced from the repository.
- [ ] CMS editing and publishing are tested by Andrew or another designated editor.
- [ ] Domain and DNS ownership remain with the client.
- [ ] Existing email delivery is verified after DNS changes.
- [ ] Forms and notifications use client-owned credentials.
- [ ] Analytics belongs to the client.
- [ ] The published privacy notice matches production forms, analytics, embeds, processors, retention, and contact details.
- [ ] Consent controls are present only where required by the production cookie and storage inventory, and non-essential tools respect the selected choice.
- [ ] Production response headers, dependencies, browser bundles, and repository history have passed the release security review.
- [ ] Secrets and recovery methods are documented securely outside the repository.
- [ ] Temporary credentials are rotated or revoked, and production credential owners and expiration dates are recorded securely.
- [ ] 2520 and Jonathan access is removed or reduced according to the support agreement.
- [ ] Temporary staging resources are archived after the agreed retention period.
