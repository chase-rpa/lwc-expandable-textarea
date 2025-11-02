# Testing Guide - Expandable Text Area Component

This guide provides detailed testing procedures for verifying the Expandable Text Area component works correctly across all supported contexts: Lightning Record Pages, Flow Screens, and LWR Digital Experience sites.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Test Data Setup](#test-data-setup)
- [Testing Context 1: Lightning Record Pages](#testing-context-1-lightning-record-pages)
- [Testing Context 2: Flow Screens](#testing-context-2-flow-screens)
- [Testing Context 3: LWR Digital Experience Sites](#testing-context-3-lwr-digital-experience-sites)
- [Testing Context 4: Mobile Responsive](#testing-context-4-mobile-responsive)
- [Testing Context 5: Accessibility](#testing-context-5-accessibility)
- [Testing Context 6: Edge Cases and Error Scenarios](#testing-context-6-edge-cases-and-error-scenarios)
- [Performance Testing](#performance-testing)
- [Regression Testing Checklist](#regression-testing-checklist)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
- [Reporting Issues](#reporting-issues)

## Prerequisites

Before beginning testing, ensure you have:

- ✅ Salesforce org with the component deployed (sandbox recommended for initial testing)
- ✅ Test records with text fields containing various content lengths
- ✅ Access to Lightning App Builder for Lightning Record Pages testing
- ✅ Access to Flow Builder for Flow Screens testing
- ✅ (Optional) Access to an LWR Digital Experience site for LWR testing
- ✅ Browser developer tools for debugging (Chrome DevTools recommended)
- ✅ Screen reader software for accessibility testing (NVDA or JAWS recommended)

## Test Data Setup

### Create Test Account Records

Create multiple Account records with varying Description field content:

1. **Empty Account**: Description field left blank
2. **Short Content Account**: Description with ~100 characters
   ```
   This is a short description with minimal content for testing basic display.
   ```

3. **Medium Content Account**: Description with ~500 characters
   ```
   This is a medium-length description that contains enough content to test
   the auto-expansion feature. It includes multiple sentences spanning several
   lines to ensure the component properly calculates height based on actual
   content. This description should wrap across multiple lines in the textarea
   and demonstrate the component's ability to display content without scrolling
   when properly configured with adequate initial height settings.
   ```

4. **Long Content Account**: Description with ~2,000 characters
   ```
   [Create a multi-paragraph description with detailed information, spanning
   approximately 2,000 characters. Include line breaks, detailed information,
   and enough content to test maximum height constraints and scrollbar behavior.]
   ```

5. **Very Long Content Account**: Description with 10,000+ characters
   ```
   [Create extensive content with many paragraphs to test component behavior
   with very large text content and performance with substantial data.]
   ```

### Create Custom Long Text Area Field (Optional)

For testing max-length validation:
1. Create custom field: `Notes__c` (Long Text Area)
2. Set length: 131,072 characters (maximum)
3. Make required: Yes (for required field testing)
4. Add to Account page layout

## Testing Context 1: Lightning Record Pages

### Test 1.1: Basic Display

**Objective**: Verify component displays correctly on a Lightning Record Page

**Steps**:
1. Navigate to Setup → Lightning App Builder
2. Edit an Account record page or create a new one
3. Drag "Expandable Text Area" component onto the page
4. Configure:
   - Field API Name: `Description`
   - Initial Height: `300`
   - Auto-Expand: `false`
5. Save and activate the page
6. Navigate to test Account with long description

**Expected Results**:
- ✅ Component displays on the page without errors
- ✅ Textarea shows at 300px height
- ✅ Content is visible without scrolling (if it fits within 300px)
- ✅ Scrollbar appears if content exceeds 300px
- ✅ Field label displays correctly ("Description")

---

### Test 1.2: Height Configuration

**Objective**: Verify all height configuration properties work correctly

**Test 1.2.1 - Initial Height**:
1. Set Initial Height to: `100`, test visually
2. Set Initial Height to: `200`, test visually
3. Set Initial Height to: `400`, test visually
4. Set Initial Height to: `800`, test visually

**Expected**: Visual height changes match configured values

**Test 1.2.2 - Min Height**:
1. Set Initial Height: `200`, Min Height: `150`
2. Navigate to Account with short content (~50 characters)

**Expected**: Textarea doesn't shrink below 150px even with minimal content

**Test 1.2.3 - Max Height**:
1. Set Initial Height: `200`, Max Height: `400`
2. Navigate to Account with very long content
3. Observe textarea height

**Expected**: 
- Textarea doesn't exceed 400px
- Scrollbar appears when content exceeds 400px
- Content remains accessible via scrolling

**Test 1.2.4 - Max Height = 0 (Unlimited)**:
1. Set Initial Height: `200`, Max Height: `0`
2. Navigate to Account with very long content

**Expected**: Textarea grows to accommodate all content without scrollbar

---

### Test 1.3: Auto-Expand Functionality

**Objective**: Verify auto-expansion works in real-time

**Steps**:
1. Configure component:
   - Initial Height: `200`
   - Min Height: `100`
   - Max Height: `600`
   - Auto-Expand: `true`
2. Navigate to Account with empty or short Description
3. Click into the textarea
4. Type content gradually, adding multiple lines
5. Continue typing past the initial 200px height
6. Continue typing past 600px max height
7. Delete content back down

**Expected Results**:
- ✅ Textarea starts at initial height (200px)
- ✅ Textarea grows in real-time as you type
- ✅ Growth respects max height (stops at 600px)
- ✅ Scrollbar appears when exceeding max height
- ✅ Textarea shrinks as content is deleted
- ✅ Textarea respects min height (doesn't shrink below 100px)
- ✅ No flickering or jumping during resize

---

### Test 1.4: Field Editing and Saving

**Objective**: Verify field saves correctly via Lightning Data Service

**Steps**:
1. Navigate to Account record with component
2. Click into textarea
3. Edit the content (add, modify, or delete text)
4. Click outside the textarea (blur event)
5. Observe for success toast message
6. Refresh the browser page
7. Check if changes persisted

**Expected Results**:
- ✅ Success toast appears: "Record saved"
- ✅ Changes persist after page refresh
- ✅ No console errors

**Test with FLS Restrictions**:
1. Remove edit permission for Description field from user's profile
2. Navigate to Account record
3. Attempt to edit textarea

**Expected**: Textarea appears in read-only mode (gray background, no editing possible)

---

### Test 1.5: Validation

**Objective**: Verify required field and max-length validation

**Test 1.5.1 - Required Field**:
1. Configure component:
   - Field API Name: `Description`
   - Required: `true`
2. Navigate to Account record
3. Clear all content from textarea
4. Click outside textarea (blur)

**Expected**:
- ✅ Red border appears around textarea
- ✅ Error message displays below: "Complete this required field."
- ✅ Field does not save

5. Add content back
6. Click outside textarea

**Expected**:
- ✅ Error clears
- ✅ Success toast appears
- ✅ Field saves successfully

**Test 1.5.2 - Max-Length Validation**:
1. Use custom field with defined max length (e.g., 255 characters)
2. Type or paste content exceeding the max length
3. Click outside textarea

**Expected**:
- ✅ Validation error appears
- ✅ Error message indicates character limit exceeded
- ✅ Field does not save

---

### Test 1.6: Read-Only Mode

**Objective**: Verify read-only mode prevents editing

**Steps**:
1. Configure component:
   - Read-Only: `true`
2. Navigate to Account record
3. Observe textarea appearance
4. Attempt to click into textarea
5. Attempt to type

**Expected Results**:
- ✅ Textarea appears disabled (gray background)
- ✅ Cursor shows "not-allowed" icon on hover
- ✅ Content is visible but not editable
- ✅ No save attempt occurs
- ✅ Content remains selectable for copying

---

### Test 1.7: Custom Label

**Objective**: Verify custom labels display correctly

**Test 1.7.1 - Custom Label**:
1. Configure component:
   - Label: `"Custom Field Label"`
2. Navigate to Account record

**Expected**: Custom label "Custom Field Label" displays instead of "Description"

**Test 1.7.2 - Hidden Label**:
1. Configure component:
   - Show Label: `false`
2. Navigate to Account record
3. Inspect element in DevTools

**Expected**:
- ✅ Label not visible on screen
- ✅ `aria-label` attribute still present for accessibility
- ✅ Screen readers still announce the field

---

## Testing Context 2: Flow Screens

### Test 2.1: Basic Flow Integration

**Objective**: Verify component loads and functions in Flow screens

**Steps**:
1. Open Flow Builder
2. Create new Screen Flow
3. Add "Get Records" element:
   - Object: `Account`
   - Store in variable: `{!Get_Account}`
   - Filter: Id equals `{!recordId}`
4. Add Screen element
5. Drag "Expandable Text Area" onto screen
6. Configure:
   - Record ID: `{!Get_Account.Id}`
   - Object API Name: `Account`
   - Field API Name: `Description`
   - Create text variable: `descriptionVariable`
   - Field Value: `{!descriptionVariable}`
   - Initial Height: `300`
7. Save and activate Flow
8. Run Flow in debug mode with test Account

**Expected Results**:
- ✅ Component loads without errors
- ✅ Account description displays correctly
- ✅ No JavaScript errors in browser console
- ✅ Field is editable

---

### Test 2.2: Flow Screens with Sections

**Objective**: Verify component works inside Section components

**Steps**:
1. Create Screen Flow
2. Add Screen element
3. Add "Section" component to screen
4. Drag "Expandable Text Area" inside the section
5. Configure component with test data
6. Save and run Flow

**Expected Results**:
- ✅ Component renders correctly inside section
- ✅ Height control works properly
- ✅ No console errors (especially no `template.host` errors)
- ✅ Section doesn't interfere with component functionality

---

### Test 2.3: Flow Variable Binding

**Objective**: Verify two-way data binding with Flow variables

**Steps**:
1. Create Screen Flow with Expandable Text Area
2. Configure Field Value as input/output variable: `{!descriptionVariable}`
3. Add "Display Text" component below the textarea
4. Configure Display Text to show: `{!descriptionVariable}`
5. Run Flow in debug mode
6. Type content into the textarea
7. Observe Display Text component

**Expected Results**:
- ✅ Display Text updates in real-time as you type
- ✅ Flow variable syncs via `FlowAttributeChangeEvent`
- ✅ No lag or delay in synchronization

---

### Test 2.4: Flow Validation

**Objective**: Verify validation blocks Flow navigation

**Steps**:
1. Create Screen Flow with Expandable Text Area
2. Configure component with required field
3. Add second screen after the first
4. Run Flow
5. Leave textarea empty
6. Click "Next" button

**Expected Results**:
- ✅ Flow blocks navigation to next screen
- ✅ Validation error displays on component
- ✅ Error message clearly indicates required field

7. Fill in content
8. Click "Next"

**Expected**:
- ✅ Validation passes
- ✅ Flow proceeds to next screen

---

### Test 2.5: Flow Navigation (Previous/Next)

**Objective**: Verify content persists during Flow navigation

**Steps**:
1. Create multi-screen Flow with Expandable Text Area on first screen
2. Run Flow
3. Enter content in textarea
4. Click "Next" to go to second screen
5. Click "Previous" to return to first screen
6. Observe textarea

**Expected Results**:
- ✅ Content persists (not lost)
- ✅ Textarea maintains proper height
- ✅ Component re-initializes gracefully (expected LWC behavior)

**Note**: Component re-initialization on navigation is expected behavior in Flows

---

### Test 2.6: Auto-Expand in Flows

**Objective**: Verify auto-expand works in Flow context

**Steps**:
1. Create Screen Flow with Expandable Text Area
2. Configure:
   - Auto-Expand: `true`
   - Initial Height: `200`
   - Max Height: `500`
3. Run Flow
4. Type long content into textarea

**Expected Results**:
- ✅ Textarea grows in real-time as you type
- ✅ Growth respects max height (500px)
- ✅ Scrollbar appears when exceeding max height
- ✅ Performance remains smooth

---

### Test 2.7: Flow Finish and Save

**Objective**: Verify data saves when Flow finishes

**Steps**:
1. Create Screen Flow with:
   - Get Records (load Account)
   - Screen with Expandable Text Area
   - Update Records (save `{!descriptionVariable}` back to Account)
2. Run Flow with test Account
3. Edit content in textarea
4. Click "Finish"
5. Navigate to the Account record
6. Verify Description field

**Expected Results**:
- ✅ Flow completes successfully
- ✅ Changes saved to database
- ✅ Account record shows updated Description

---

## Testing Context 3: LWR Digital Experience Sites

### Test 3.1: LWR Site Deployment

**Objective**: Verify component loads in LWR site without errors

**Steps**:
1. Deploy component to org
2. **CRITICAL**: Go to Setup → All Sites
3. Select your LWR site
4. Click "Publish" (this is required after component updates)
5. Navigate to site page with component
6. Observe page load

**Expected Results**:
- ✅ Component loads without LWR3008 error
- ✅ Page renders correctly
- ✅ Component displays with proper styling

**Note**: Always republish site after any component updates. LWR sites cache component metadata.

---

### Test 3.2: LWR Site Functionality

**Objective**: Verify all functionality works in LWR context

**Steps**:
1. Test basic display (same as Lightning Record Pages Test 1.1)
2. Test editing and saving
3. Test validation
4. Test height configuration
5. Test auto-expand

**Expected Results**:
- ✅ Same behavior as Lightning Record Pages
- ✅ All features work correctly
- ✅ No LWR-specific issues

**Guest User Testing** (if applicable):
- Verify guest user permissions allow field access
- Test read-only behavior for guest users
- Verify security is properly enforced

---

### Test 3.3: LWR Site Performance

**Objective**: Verify acceptable performance in LWR context

**Steps**:
1. Open browser DevTools
2. Navigate to page with component
3. Check Console tab for errors
4. Check Network tab for load times
5. Use Performance tab to measure render time

**Expected Results**:
- ✅ No JavaScript errors in console
- ✅ Component loads within 2 seconds
- ✅ No excessive network requests

**Test with Slow Network**:
1. Enable network throttling in DevTools (Slow 3G)
2. Reload page

**Expected**: Graceful loading state, no crashes

---

## Testing Context 4: Mobile Responsive

### Test 4.1: Mobile Browser

**Objective**: Verify responsive behavior on mobile devices

**Steps**:
1. Open component in mobile browser (or Chrome DevTools device emulation)
2. Test on various screen sizes:
   - 320px width (iPhone SE)
   - 375px width (iPhone)
   - 768px width (iPad)
3. Test in portrait and landscape orientations
4. Test editing, saving, validation

**Expected Results**:
- ✅ Textarea width adjusts to screen size
- ✅ Height control still works correctly
- ✅ Touch interactions work (tap to focus, swipe to scroll)
- ✅ Virtual keyboard appears on focus
- ✅ Content remains readable
- ✅ No horizontal scrolling required

---

### Test 4.2: Salesforce Mobile App

**Objective**: Verify component works in Salesforce Mobile App

**Steps**:
1. Open Salesforce Mobile App on iOS or Android device
2. Navigate to Lightning record page with component
3. Test editing, validation, saving
4. Test with various content lengths

**Expected Results**:
- ✅ Component renders correctly in mobile app
- ✅ Keyboard appears on focus
- ✅ Editing works smoothly
- ✅ Saves successfully
- ✅ Validation displays correctly

---

## Testing Context 5: Accessibility

### Test 5.1: Keyboard Navigation

**Objective**: Verify full keyboard accessibility

**Steps**:
1. Navigate to page with component using only keyboard
2. Press `Tab` key to navigate to textarea
3. Type content
4. Press `Shift+Tab` to navigate away (triggers blur/save)

**Expected Results**:
- ✅ Focus indicator visible (blue border around textarea)
- ✅ Can reach textarea with Tab key
- ✅ Can type immediately when focused
- ✅ Blur event triggers save when navigating away
- ✅ No keyboard traps

---

### Test 5.2: Screen Reader

**Objective**: Verify screen reader compatibility

**Prerequisites**: NVDA (Windows) or VoiceOver (Mac) enabled

**Steps**:
1. Navigate to page with component using screen reader
2. Tab to the component
3. Listen to announcements
4. Trigger a validation error (clear required field)
5. Listen to error announcement

**Expected Results**:
- ✅ Screen reader announces field label
- ✅ Screen reader announces if field is required
- ✅ Screen reader announces current value
- ✅ Screen reader announces validation errors
- ✅ `aria-invalid` attribute present when error exists
- ✅ `aria-describedby` correctly references error message
- ✅ Error message is announced when validation fails

---

### Test 5.3: High Contrast Mode

**Objective**: Verify usability in high contrast mode

**Steps** (Windows):
1. Enable Windows High Contrast mode: 
   - Windows Settings → Ease of Access → High Contrast
2. Navigate to page with component
3. Test editing, validation, error states

**Expected Results**:
- ✅ Component remains visible and usable
- ✅ Text contrast meets WCAG standards
- ✅ Error states clearly distinguishable
- ✅ Borders and focus indicators visible

---

## Testing Context 6: Edge Cases and Error Scenarios

### Test 6.1: Empty Field

**Objective**: Verify component handles empty/null values

**Steps**:
1. Navigate to Account with null/empty Description
2. Observe component

**Expected Results**:
- ✅ Textarea displays at initial height
- ✅ No errors in console
- ✅ Placeholder behavior works (if configured)

---

### Test 6.2: Very Long Content

**Objective**: Verify performance with large content

**Steps**:
1. Create Account with Description containing 50,000+ characters
2. Navigate to record with component
3. Observe load time and behavior

**Expected Results**:
- ✅ Component loads without performance issues
- ✅ Initial render completes within acceptable time (< 2 seconds)
- ✅ Scrollbar appears if content exceeds max height
- ✅ Editing remains responsive

---

### Test 6.3: Special Characters

**Objective**: Verify handling of special characters

**Steps**:
1. Enter content with:
   - Multiple newlines (`\n`)
   - Tab characters (`\t`)
   - Special characters: `<, >, &, ", '`
   - Emoji: 😀 🎉 🚀
   - Unicode characters: ñ, é, ü, 中文
2. Save and reload

**Expected Results**:
- ✅ Content displays correctly
- ✅ Height calculation accounts for line breaks
- ✅ Special characters don't break component
- ✅ Content persists correctly after save

---

### Test 6.4: Rapid Typing

**Objective**: Verify performance during rapid input

**Steps**:
1. Configure with Auto-Expand enabled
2. Type very quickly (or paste large content repeatedly)
3. Observe height adjustment behavior

**Expected Results**:
- ✅ Height adjusts smoothly without flickering
- ✅ No performance degradation
- ✅ No console errors
- ✅ UI remains responsive

---

### Test 6.5: Field Level Security

**Objective**: Verify FLS enforcement

**Steps**:
1. Remove edit permission for test field from user profile
2. Login as restricted user
3. Navigate to record with component
4. Attempt to edit

**Expected Results**:
- ✅ Component displays in read-only mode automatically
- ✅ No save attempt occurs
- ✅ Content is visible but not editable

---

### Test 6.6: Invalid Configuration

**Objective**: Verify graceful handling of configuration errors

**Test 6.6.1 - Invalid Field API Name**:
1. Configure component with non-existent field: `Invalid_Field__c`
2. Navigate to record

**Expected**:
- ✅ Error message displays
- ✅ Component doesn't crash page
- ✅ Clear indication of what's wrong

**Test 6.6.2 - Missing Record ID in Flow**:
1. Create Flow without providing Record ID
2. Run Flow

**Expected**:
- ✅ Component handles gracefully
- ✅ Helpful error message or read-only state

---

### Test 6.7: Browser Compatibility

**Objective**: Verify cross-browser compatibility

**Browsers to Test**:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Steps**:
1. Test basic functionality in each browser
2. Test height control
3. Test auto-expand
4. Test validation

**Expected Results**:
- ✅ Consistent behavior across all browsers
- ✅ No browser-specific bugs
- ✅ Styling appears correctly

---

## Performance Testing

### Test P.1: Initial Load Time

**Objective**: Measure component initialization time

**Steps**:
1. Open Browser DevTools
2. Go to Performance tab
3. Click Record
4. Navigate to page with component
5. Stop recording
6. Analyze flame graph

**Expected**: 
- Time from component creation to first render < 500ms

---

### Test P.2: Height Calculation Time

**Objective**: Measure `adjustTextareaHeight()` performance

**Steps** (requires temporary code modification for testing):
1. Add to `adjustTextareaHeight()` method:
   ```javascript
   console.time('adjustHeight');
   // ... existing code
   console.timeEnd('adjustHeight');
   ```
2. Deploy and test
3. Type in textarea (triggers height adjustment)
4. Check console for timing

**Expected**: 
- Each height calculation < 50ms

**Remove timing code after testing**

---

### Test P.3: Save Operation Time

**Objective**: Measure save performance

**Steps**:
1. Open Browser DevTools → Network tab
2. Edit field content
3. Blur textarea (triggers save)
4. Observe network request
5. Note time from blur to success toast

**Expected**:
- Total save operation: 200-500ms (network dependent)
- LDS cache hit (when available): < 10ms

---

## Regression Testing Checklist

Use this checklist after any code changes to verify no regressions:

### Basic Functionality
- [ ] Component loads on Lightning Record Page without errors
- [ ] Component loads in Flow Screen without errors
- [ ] Component loads in LWR site without errors (after republish)
- [ ] Field value displays correctly
- [ ] Field saves on blur (record pages)
- [ ] Field syncs with Flow variables (Flow screens)

### Height Control
- [ ] Initial height matches configuration
- [ ] Auto-expand works when enabled
- [ ] Min height constraint respected
- [ ] Max height constraint respected (scrollbar appears)
- [ ] Max height = 0 allows unlimited growth
- [ ] No flickering during resize

### Validation
- [ ] Required field validation works
- [ ] Max-length validation works
- [ ] Error messages display correctly
- [ ] SLDS error styling appears (red border)
- [ ] Validation blocks Flow navigation when invalid

### User Experience
- [ ] Read-only mode prevents editing
- [ ] Custom labels display correctly
- [ ] Show/hide label works
- [ ] Mobile responsive (width adjusts)
- [ ] Keyboard accessible (Tab navigation works)
- [ ] Screen reader compatible (aria attributes present)

### Performance & Stability
- [ ] No console errors
- [ ] No infinite render loops
- [ ] Height calculation fast (< 50ms)
- [ ] Initial render fast (< 500ms)
- [ ] Handles very long content (50,000+ chars)
- [ ] Handles rapid typing smoothly

---

## Troubleshooting Common Issues

### Issue: Component not appearing in Lightning App Builder

**Symptoms**: Component doesn't show in component panel

**Solutions**:
1. Verify component is deployed to org
2. Check `expandableTextArea.js-meta.xml` has `isExposed="true"`
3. Verify `targets` includes `lightning__RecordPage`
4. Clear browser cache and reload App Builder

---

### Issue: LWR3008 error in LWR site

**Symptoms**: 404 error when accessing component in published LWR site

**Solution**:
1. Go to Setup → All Sites
2. Select your LWR site
3. Click "Publish"
4. Wait for publish to complete
5. Refresh site in browser

**Why this happens**: LWR sites cache component metadata. Always republish after component updates.

---

### Issue: Height not adjusting

**Symptoms**: Textarea remains at fixed height, doesn't auto-expand

**Troubleshooting Steps**:
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify `autoExpand` property is set to `true` in configuration
4. Check that `adjustTextareaHeight()` method is being called:
   - Add temporary `console.log()` in method
   - Type in textarea
   - Verify logs appear
5. Inspect textarea element in DevTools:
   - Check computed height style
   - Verify inline styles are being applied

**Common Causes**:
- Auto-Expand disabled in configuration
- JavaScript error preventing method execution
- CSS override with `!important` flag

---

### Issue: Validation not working

**Symptoms**: Required field allows save without content, or max-length not enforced

**Troubleshooting Steps**:
1. Verify field is configured as required in component configuration
2. Check browser console for errors
3. Verify `validateField()` is being called on blur:
   - Add temporary `console.log()` in method
   - Blur textarea
   - Verify log appears
4. Check that `performValidation()` is returning correct result

**Common Causes**:
- Required property not set to `true`
- Validation method error
- Override of validation behavior

---

### Issue: Field not saving

**Symptoms**: Changes made but not persisted to database

**Troubleshooting Steps**:
1. Check if Record ID is present:
   ```javascript
   console.log('Record ID:', this.recordId);
   ```
2. Verify field API name is correct:
   ```javascript
   console.log('Field API Name:', this.fieldApiName);
   ```
3. Check FLS permissions:
   - User profile has edit permission on field
   - Field is editable on page layout
4. Look for error toast messages after blur
5. Check browser console for errors during save attempt
6. Verify LDS wire adapters are working (check Network tab for successful getRecord calls)

**Common Causes**:
- User lacks edit permission (FLS)
- Invalid field API name
- Record ID not available
- Network connectivity issue

---

### Issue: Component re-initializes in Flow

**Symptoms**: State lost when navigating Previous/Next in Flow

**Expected Behavior**: This is normal LWC behavior in Flows. Components re-initialize on navigation.

**Solution**: Use Flow variables to preserve state:
- Bind critical values to Flow variables (input/output)
- Flow preserves variable values across navigation
- Component re-initializes with values from Flow variables

**Not a bug**: This is how LWC components work in Flow screens.

---

## Reporting Issues

When reporting bugs found during testing, please include:

### Required Information
1. **Environment**:
   - Salesforce org type (Production, Sandbox, Developer)
   - Browser and version (e.g., Chrome 120.0)
   - Operating system (e.g., Windows 11, macOS Sonoma)

2. **Component Configuration**:
   - All property values (fieldApiName, initialHeight, autoExpand, etc.)
   - Deployment context (Lightning Record Page, Flow Screen, LWR Site)

3. **Steps to Reproduce**:
   - Detailed step-by-step instructions
   - Include test data used
   - Specify exact clicks, typing, navigation

4. **Expected vs. Actual Behavior**:
   - What you expected to happen
   - What actually happened

5. **Evidence**:
   - Screenshots or screen recordings
   - Browser console errors (copy full error text)
   - Network tab errors (if applicable)

### Where to Report
- **GitHub Issues**: [https://github.com/redpoint-ascent/lwc-expandable-textarea/issues](https://github.com/redpoint-ascent/lwc-expandable-textarea/issues)
- **Email**: [hello@redpoint-ascent.ai](mailto:hello@redpoint-ascent.ai)

### Example Issue Report

```
Title: Height not adjusting in Flow screen with Section component

Environment:
- Org: Sandbox (Spring '24)
- Browser: Chrome 120.0.6099.109
- OS: Windows 11

Configuration:
- Field API Name: Description
- Initial Height: 300
- Auto-Expand: true
- Max Height: 600
- Context: Screen Flow with Section component

Steps to Reproduce:
1. Create Screen Flow in Flow Builder
2. Add Section component to screen
3. Add Expandable Text Area inside Section
4. Configure as above
5. Run Flow in debug mode
6. Type long content into textarea

Expected: Textarea should grow as content is added
Actual: Textarea remains at 300px fixed height

Console Errors:
TypeError: Cannot read property 'style' of null
    at adjustTextareaHeight (expandableTextArea.js:123)

Screenshot: [attached]
```

---

## Conclusion

Thorough testing across all contexts ensures the Expandable Text Area component works reliably for end users. This guide covers:

- ✅ All supported deployment contexts (Lightning, Flow, LWR)
- ✅ Core functionality (height control, validation, saving)
- ✅ Edge cases and error scenarios
- ✅ Performance and accessibility
- ✅ Mobile and cross-browser compatibility

**Recommendation**: Test in sandbox environment before production deployment. Follow the regression testing checklist after any code changes.

For questions or assistance with testing, contact:
- 📧 Email: [hello@redpoint-ascent.ai](mailto:hello@redpoint-ascent.ai)
- 💬 GitHub Discussions: [https://github.com/redpoint-ascent/lwc-expandable-textarea/discussions](https://github.com/redpoint-ascent/lwc-expandable-textarea/discussions)

---

**Maintained by [Redpoint Ascent](https://redpoint-ascent.ai)**  
**Last Updated**: 2025-01-31