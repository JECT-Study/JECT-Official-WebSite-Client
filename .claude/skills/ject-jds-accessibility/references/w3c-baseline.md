# W3C accessibility review baseline

## Official sources and their roles

| Source                                                                 | Use in a review                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)    | Required reference for applicable success criteria, levels, exceptions, and supporting techniques. The normative requirements are in [WCAG 2.2](https://www.w3.org/TR/WCAG22/); Quick Reference and Understanding explain their application.                                      |
| [WAI-ARIA APG Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)     | Required reference when a widget has a matching pattern: compare roles, states, keyboard behavior, and focus. [APG is informative](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/), and examples are not production contracts or independent proof of WCAG conformance. |
| [WAI-ARIA Overview](https://www.w3.org/WAI/standards-guidelines/aria/) | Consult for ARIA's purpose and limitations. Prefer native HTML; check the [ARIA specification](https://www.w3.org/TR/wai-aria-1.2/) for role/property requirements when necessary.                                                                                                |
| [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)          | Apply to form controls: labels, instructions, grouping, required state, errors, validation, and feedback.                                                                                                                                                                         |
| [WAI Easy Checks](https://www.w3.org/WAI/test-evaluate/easy-checks/)   | Use for an initial manual review of keyboard access, focus, contrast, forms, and zoom. Follow the relevant linked checks; this is not a complete conformance audit.                                                                                                               |

Also consult [APG keyboard interface guidance](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) for composite widgets and [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) for browser explanations. For disputed behavior, prefer normative W3C text, native platform documentation, and actual browser evidence.

## Criteria to select for component changes

Use WCAG 2.2 A/AA as this harness review target; confirm any task-specific target. A review does not establish product conformance. Treat AAA criteria as enhancements unless explicitly required.

- Semantics and forms: 1.3.1 (relationships), 2.5.3 (visible label in accessible name), 3.3.1–3.3.3 (errors, instructions, suggestions), and 4.1.2 (name, role, value).
- Keyboard and focus: 2.1.1, 2.1.2, 2.4.3, 2.4.7, and 2.4.11. Check complete entry, operation, dismissal, and return paths, including nested overlays and state changes.
- Visual access: 1.4.3 (text contrast), 1.4.4 (200% text resize), 1.4.10 (reflow at 320 CSS px, with exceptions), 1.4.11 (non-text contrast), and 1.4.12 (text spacing). Measure rendered colors, including transparency and themes; a token name or screenshot alone is insufficient.
- Pointer access: [2.5.8 Target Size (Minimum), AA](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) uses 24×24 CSS px with spacing and other exceptions. Evaluate the actual hit area and neighboring targets. Do not make 44×44 mandatory at AA; that is the enhanced AAA criterion 2.5.5.
- Focus appearance: [2.4.13, AAA](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) is distinct from AA focus visibility and minimum non-obscuration. Do not silently elevate it to an AA requirement.
- Dynamic feedback: apply 4.1.3 where a change qualifies as a status message. Confirm announcements with assistive technology rather than adding live regions to every state change.

## Verification and attribution

Trace rendered HTML and shared primitives before reporting missing labels, focus rings, or ARIA. An input with `outline: none` can still have a visible container focus ring. Native text input with a separate dialog button does not automatically require the combobox pattern.

For forms, verify label and description ID references, error identification beyond color, required announcements, valid submitted values, reset, and disabled/read-only behavior. Distinguish component guarantees from validation owned by the consuming form; `aria-required` communicates state but does not enforce browser validation.

Record a keyboard matrix and manually exercise it. Measure contrast, target geometry, zoom, reflow, and clipping in relevant themes/states. For custom or complex widgets, record screen-reader/browser combinations and check names, values, descriptions, and focus announcements. Automated rules and visual regression do not replace these checks.

For each finding, record source/criterion and level, triggering scenario, observed behavior, impact, and evidence. Label the outcome as a confirmed defect, inferred risk, recommendation, or unverified check. Report environmental limits without treating missing evidence as a pass or declaring whole-component/page conformance from a partial review.
