# Changelog

All notable changes to the Expandable Text Area project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features
- Performance monitoring and optimization
- Enhanced mobile experience

## [1.0.2] - 2025-01-XX

### Fixed
- Flow runtime console errors when Flow sets screen properties
- Component initialization errors in Flow Debug mode

### Added
- Exposed `@api availableActions` property for Flow navigation support
- Exposed `@api ariaDescribedBy` property for accessibility
- Exposed `@api screenHelpText` property for Flow screen help text
- Exposed `@api navigateFlow` method for programmatic Flow navigation

## [1.0.1] - 2025-01-31

### Fixed
- Height control not working in Flow screens, especially those with section components
- Textarea not auto-sizing to fit content on initial load
- `initialHeight`, `minHeight`, and `maxHeight` properties not being respected consistently
- CSS custom properties failing to penetrate `lightning-textarea` Shadow DOM boundaries

### Changed
- **BREAKING INTERNAL CHANGE**: Replaced `lightning-textarea` component with native `<textarea class="slds-textarea">` element
- Implemented direct `scrollHeight`-based height calculation for accurate content measurement
- Added manual validation logic with SLDS error styling (`.slds-has-error`, `.slds-form-element__help`)
- Enhanced accessibility with `aria-invalid` and `aria-describedby` attributes for error states
- Improved real-time auto-grow behavior via `handleInput()` event handler

### Technical Details
- **New method**: `adjustTextareaHeight(textarea)` - Core height calculation using `scrollHeight` with min/max constraints
- **New method**: `performValidation(value)` - Manual validation for required fields and max-length constraints
- **Updated method**: `handleInput(event)` - Real-time height adjustment as users type
- **Updated method**: `validateField()` - Orchestrates validation, updates error state, notifies Flow
- **Updated method**: `renderedCallback()` - Sets initial height using `hasInitializedHeight` flag

### Migration Notes
- **Public API unchanged**: All `@api` properties remain the same - no configuration changes needed
- **Backward compatible**: Existing Lightning App Builder and Flow Builder configurations work without modification
- **Non-breaking for users**: Only internal implementation changed, external behavior improved (bug fixes)
- **Developers**: If you extended or modified the component's internal implementation, review the new native textarea approach in the updated documentation

### Tested Contexts
- ✅ Lightning Record Pages with various field types and heights
- ✅ Flow Screens (with and without sections)
- ✅ LWR Digital Experience sites (requires site republish after deployment)
- ✅ Mobile responsive behavior across device sizes
- ✅ Screen reader accessibility (NVDA, JAWS tested)
- ✅ Validation scenarios (required fields, max-length constraints)
- ✅ Performance metrics within target thresholds

### Planned Features
- Character counter with warning thresholds
- Word count display
- Auto-save with configurable debounce
- Field history integration
- Multi-language support
- Dark mode styling optimization
- Custom validation rules via configuration

## [1.0.0] - 2025-01-30

### Added
- Initial release of Expandable Text Area component
- Support for Lightning Record Pages
- Support for Flow Screens
- Support for LWR Digital Experience sites
- Configurable initial, minimum, and maximum height
- Auto-expand functionality based on content
- Read-only mode support
- Custom label override capability
- Field-level security (FLS) respect via Lightning Data Service
- Mobile responsive design
- WCAG 2.1 AA accessibility compliance
- Comprehensive documentation (README, AGENTS, CONTRIBUTING)
- Unit test suite with Jest
- MIT License

### Features
- **Configurable Height**: Set initial, min, and max height in pixels
- **Auto-Expansion**: Optionally grow as users type
- **Universal Field Support**: Works with any text or long text field
- **Platform Integration**: Works on record pages, flows, and LWR sites
- **Lightning Data Service**: No Apex required, automatic security
- **SLDS Styling**: Consistent with Salesforce design system
- **Validation Support**: Required field validation and character limits

### Technical Details
- API Version: 65.0
- Framework: Lightning Web Components
- Data Layer: Lightning Data Service (LDS)
- Styling: Salesforce Lightning Design System (SLDS)
- Testing: Jest + LWC Test Utils

### Documentation
- Comprehensive README with installation and configuration guides
- AGENTS.md for AI coding assistants
- CONTRIBUTING.md with contribution guidelines
- Complete specification document
- Code examples and use cases

### Known Limitations
- Rich text fields display as plain text (HTML visible)
- Requires manual configuration per flow screen (cannot override standard components)
- LWR sites must be republished after component updates

---

## Release Types

### Major (X.0.0)
Breaking changes that require user action to upgrade

### Minor (x.X.0)
New features that are backward compatible

### Patch (x.x.X)
Bug fixes and minor improvements

---

## Upgrade Guide

### From Future Versions

Upgrade guides will be added here as new versions are released.

---

**Maintained by [Redpoint Ascent](https://redpoint-ascent.ai)**

For questions about releases, contact [hello@redpoint-ascent.ai](mailto:hello@redpoint-ascent.ai)

[1.0.2]: https://github.com/redpoint-ascent/lwc-expandable-textarea/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/redpoint-ascent/lwc-expandable-textarea/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/redpoint-ascent/lwc-expandable-textarea/releases/tag/v1.0.0
