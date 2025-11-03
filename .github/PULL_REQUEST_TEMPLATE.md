## Description

This PR includes cleanup and documentation improvements for the Expandable Text Area component:

1. **Removed deprecated `showLabel` property** - This property was confusing and conflicted with the standard `hideLabel` property. The component now exclusively uses `hideLabel` which provides clearer, more intuitive behavior.

2. **Enhanced README with visual documentation** - Added comprehensive screenshots and an animated GIF demonstrating the component in action on Lightning Record Pages. Visual examples help users quickly understand the component's value and configuration options.

3. **Updated documentation** - Improved README sections for clarity and accuracy, including updated configuration examples and better organized content.

## Type of Change
- [x] Documentation update
- [x] Refactoring

## Related Issue
Part of ongoing maintenance and documentation improvements.

## Testing
- [x] Manual testing completed
- [x] Tested on Lightning Record Page
- [x] Verified existing unit tests still pass

## Screenshots/Visual Documentation

### README Updates
New sections added:
- **Quick Demo GIF** showing the component's auto-expand functionality
- **Configuration screenshots** showing the App Builder interface
- **Before/After comparison** demonstrating the UX improvement

See [README.md](../README.md#-quick-demo) for the full visual documentation.

## Configuration Tested
- Field API Name: Description
- Initial Height: 200px
- Auto-Expand: true
- Context: Lightning Record Page

## Checklist
- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my own code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] I have updated the documentation (README, AGENTS.md)
- [x] My changes generate no new warnings
- [x] New and existing unit tests pass locally with my changes (`npm run test:unit`)
- [x] I have run the linter and it passes (`npm run lint`)
- [x] I have updated CHANGELOG.md under "Unreleased" section

## Additional Notes

### Breaking Change (Minor)
The removal of the `showLabel` property is technically a breaking change, but it was:
- Recently deprecated (v1.0.1)
- Replaced with the more standard `hideLabel` property
- Documented with migration guidance in the changelog
- Limited usage expected (property was confusing to users)

### Migration Path
Users who were using `showLabel="false"` should update to `hideLabel="true"`. The functionality is equivalent but with clearer naming that aligns with Salesforce platform conventions.