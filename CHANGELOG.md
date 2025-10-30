# Changelog

All notable changes to the Expandable Text Area project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- API Version: 59.0
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
