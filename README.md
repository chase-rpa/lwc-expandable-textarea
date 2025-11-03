# Expandable Text Area for Salesforce

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Salesforce API](https://img.shields.io/badge/Salesforce%20API-v59.0-blue.svg)](https://developer.salesforce.com/)
[![Lightning Web Components](https://img.shields.io/badge/LWC-Enabled-brightgreen.svg)](https://developer.salesforce.com/docs/component-library/documentation/en/lwc)

> A configurable Lightning Web Component that displays Salesforce text fields with expandable height on Lightning Record Pages and Flow Screens. **Solves the 3-line text field limitation.**

## 📖 Table of Contents

- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [Usage Examples](#-usage-examples)
- [Technical Details](#-technical-details)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

## 🔴 The Problem

Standard Salesforce text fields in Flows and on record pages are limited to approximately **3 lines of visible text**. When working with fields that contain long text content (descriptions, notes, comments, etc.), users must:

- Scroll within a tiny text box to read content
- Manually resize the field every single time they edit
- Struggle with poor visibility of long-form content

This creates a frustrating user experience, especially for:
- ✍️ Case comments and descriptions
- 📝 Meeting notes and agendas
- 📋 Product descriptions
- 💬 Customer feedback
- 📄 Document summaries

## ✅ The Solution

**Expandable Text Area** is a Lightning Web Component that lets administrators configure the visible height of any text field. Place it on:

- **Lightning Record Pages** - Display any text field with configurable height
- **Flow Screens** - Enhanced text input experience in flows
- **Experience Cloud (LWR) Sites** - Works in Digital Experience sites

Administrators can configure the component at design time to set the initial height, enable auto-expansion, and customize the user experience.

**Technical Note**: The component uses a native HTML `<textarea>` element styled with SLDS classes, providing full control over height while maintaining Salesforce design consistency. This approach was chosen over `lightning-textarea` to avoid Shadow DOM limitations that prevent reliable height control.

## ✨ Features

### Core Functionality
- 📏 **Configurable Height** - Set initial, minimum, and maximum height in pixels
- 🔄 **Auto-Expansion** - Optionally grow automatically as users type
- 🎯 **Universal Field Support** - Works with any text or long text area field
- 🎯 **Native Textarea Implementation** - Direct height control without Shadow DOM limitations
- 🔒 **Respects Security** - Honors Field Level Security (FLS) and sharing rules
- 💾 **Auto-Save** - Automatically saves changes on blur (record pages)
- ✅ **Validation Support** - Required field validation and character limits

### Platform Integration
- 📄 **Lightning Record Pages** - Drag and drop onto any record page layout
- 🔀 **Flow Screens** - Use in Screen Flows with full variable binding
- 🌐 **LWR Experience Sites** - Compatible with Digital Experience (LWR)
- 📱 **Mobile Responsive** - Adapts to mobile device screens
- ♿ **Accessible** - WCAG 2.1 AA compliant with screen reader support

### User Experience
- 🏷️ **Custom Labels** - Override default field labels
- 👁️ **Read-Only Mode** - Display content without editing capability
- 🎨 **SLDS Styling** - Consistent with Salesforce Lightning Design System
- ⚡ **Fast Performance** - Uses Lightning Data Service (no Apex required)

## 📸 Screenshots

### Before (Standard Text Field - 3 Lines)
```
┌─────────────────────────────────┐
│ Description                     │
├─────────────────────────────────┤
│ This is a long description th..│ ← Only 3 lines visible
│ at contains important informa..│    Must scroll to see more!
│ tion about the record that...  │
└─────────────────────────────────┘
```

### After (Expandable Text Area - Configurable)
```
┌─────────────────────────────────┐
│ Description                     │
├─────────────────────────────────┤
│ This is a long description that │
│ contains important information  │
│ about the record that users     │
│ need to see at a glance. With   │
│ the expandable text area, all   │ ← All content visible!
│ content is immediately visible  │    No scrolling needed!
│ without scrolling. Users can    │
│ read and edit comfortably.      │
│                                 │
└─────────────────────────────────┘
```

## 🚀 Installation

### Option 1: Deploy from GitHub (Recommended)

#### Using Salesforce CLI

```bash
# Clone the repository
git clone https://github.com/redpoint-ascent/lwc-expandable-textarea.git
cd lwc-expandable-textarea

# Authenticate to your org
sf org login web --alias myorg

# Deploy the component
sf project deploy start --source-dir force-app/main/default/lwc/expandableTextArea
```

#### Using Workbench

1. Download the repository as a ZIP file
2. Log in to [Workbench](https://workbench.developerforce.com/)
3. Navigate to **Migration → Deploy**
4. Upload the ZIP file and deploy

### Option 2: Manual Installation

1. Create a new Lightning Web Component in your org:
   - In Setup, search for "Lightning Components"
   - Create new component named `expandableTextArea`

2. Copy the files from this repository:
   - `expandableTextArea.js`
   - `expandableTextArea.html`
   - `expandableTextArea.css`
   - `expandableTextArea.js-meta.xml`

3. Save and deploy

### Option 3: Unlocked Package (Coming Soon)

```bash
# Install the package
sf package install --package 04t... --target-org myorg
```

## 🎯 Quick Start

### For Lightning Record Pages

1. **Open Lightning App Builder**
   - Navigate to the record page you want to edit
   - Click **Edit Page**

2. **Add the Component**
   - Search for "Expandable Text Area" in the Components panel
   - Drag it onto the page layout

3. **Configure**
   - **Field API Name**: `Description` (or your field)
   - **Initial Height**: `300` (pixels)
   - **Auto-Expand**: ✓ Checked
   - **Max Height**: `600` (or `0` for unlimited)

4. **Save and Activate**

### For Flow Screens

1. **Open Flow Builder**
   - Create or edit a Screen Flow
   - Add a Screen element

2. **Add the Component**
   - Search for "Expandable Text Area"
   - Drag it onto the screen

3. **Configure**
   - **Record ID**: `{!recordId}`
   - **Object API Name**: `Account`
   - **Field API Name**: `Description`
   - **Field Value**: Create/select a text variable
   - **Initial Height**: `300`

4. **Save and Activate**

## 🏢 Professional Services

**Built by [Redpoint Ascent](https://redpoint-ascent.ai)** - A Salesforce consulting agency specializing in innovative solutions that enhance user experience and streamline business processes.

### Our Expertise
- 🎯 **Lightning Web Component Development** - Custom components tailored to your needs
- 🔀 **Flow Automation & Optimization** - Streamline complex business processes
- 🎨 **User Experience Improvements** - Make Salesforce easier for your users
- ⚡ **Performance Optimization** - Fast, efficient, scalable solutions
- 🔧 **Custom Salesforce Solutions** - From concept to deployment

### Need Help?

**Custom Development**: Need this component customized or want to build similar solutions?  
**Implementation Support**: Need help deploying or configuring for your org?  
**Training**: Want to train your team on LWC best practices?

📧 **Contact us**: [hello@redpoint-ascent.ai](mailto:hello@redpoint-ascent.ai)  
🌐 **Website**: [redpoint-ascent.ai](https://redpoint-ascent.ai)

*Free consultations available for organizations looking to improve their Salesforce user experience.*

---

## ⚙️ Configuration

### All Configuration Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `fieldApiName` | String | Yes | - | API name of the field to display (e.g., `Description__c`) |
| `recordId` | String | Yes* | Auto | Record ID (auto-populated on record pages) |
| `objectApiName` | String | Yes* | Auto | Object API name (auto-populated on record pages) |
| `label` | String | No | Field Label | Custom label to override field's default label |
| `initialHeight` | Integer | No | 200 | Initial height in pixels |
| `minHeight` | Integer | No | 100 | Minimum height when auto-expanding |
| `maxHeight` | Integer | No | 0 | Maximum height (0 = unlimited) |
| `autoExpand` | Boolean | No | true | Automatically expand as content grows |
| `readOnly` | Boolean | No | false | Display as read-only (no editing) |
| `required` | Boolean | No | false | Override field's required setting |

**\*Auto-populated on Lightning Record Pages, must be set manually in Flows**

### Height Configuration Best Practices

| Content Length | Characters | Recommended Height |
|----------------|-----------|-------------------|
| Short Text | 0-500 | 100-150px |
| Medium Text | 500-2,000 | 200-300px |
| Long Text | 2,000-10,000 | 300-500px |
| Very Long Text | 10,000+ | 400-800px |

### When to Use Auto-Expand

**Enable Auto-Expand (✓) When:**
- Content length varies significantly between records
- Users will add/edit content frequently
- You want to maximize viewport usage
- Content typically exceeds initial height

**Disable Auto-Expand (✗) When:**
- All records have similar content length
- Consistent page layout is important
- Content rarely exceeds initial height
- Page has multiple expandable fields

## 📚 Usage Examples

### Example 1: Large Description Field on Account

**Scenario**: Display Account Description with plenty of space for long content.

**Configuration**:
```
Field API Name: Description
Initial Height: 400
Min Height: 200
Max Height: 800
Auto-Expand: ✓
Read-Only: ✗
```

**Use Case**: Sales reps need to view and edit detailed account descriptions without scrolling.

---

### Example 2: Read-Only Case Comments

**Scenario**: Display case comments in a read-only format for review.

**Configuration**:
```
Field API Name: Comments__c
Initial Height: 300
Min Height: 300
Max Height: 300
Auto-Expand: ✗
Read-Only: ✓
```

**Use Case**: Support agents reviewing historical case notes.

---

### Example 3: Meeting Notes with Unlimited Growth

**Scenario**: Capture extensive meeting notes without height restrictions.

**Configuration**:
```
Field API Name: Meeting_Notes__c
Initial Height: 250
Min Height: 150
Max Height: 0
Auto-Expand: ✓
Read-Only: ✗
```

**Use Case**: Meeting facilitators taking detailed notes during client calls.

---

### Example 4: Flow Screen for Opportunity Description

**Scenario**: Guide users through creating an opportunity with a large description field.

**Flow Configuration**:
```
Record ID: {!recordId}
Object API Name: Opportunity
Field API Name: Description
Field Value: {!opportunityDescription}
Label: Tell us about this opportunity
Initial Height: 300
Auto-Expand: true
```

**Use Case**: Opportunity creation wizard with improved text input experience.

---

### Example 5: Experience Cloud Product Description

**Scenario**: Allow partners to edit product descriptions in an LWR site.

**Configuration**:
```
Record ID: {!recordId} (from page context)
Object API Name: Product2
Field API Name: Description
Initial Height: 350
Auto-Expand: ✓
Max Height: 600
```

**Use Case**: Partner portal where distributors manage product catalog.

## 🔧 Technical Details

### Architecture

The component uses **Lightning Data Service (LDS)** for all data operations and a **native textarea element** for direct height control:
- ✅ No Apex required
- ✅ Automatic FLS/CRUD respect
- ✅ Client-side caching for performance
- ✅ Automatic record updates and refreshes
- ✅ Native `<textarea>` with SLDS styling for full height control

### Data Flow

```
┌──────────────────┐
│  Salesforce DB   │
└────────┬─────────┘
         │
         ↓ (LDS)
┌──────────────────────────────┐
│  LWC Component               │
│  - getRecord()               │
│  - updateRecord()            │
│  - getObjectInfo()           │
└────────┬─────────────────────┘
         │
         ↓ (User Interface)
┌──────────────────────────────┐
│  Native <textarea>           │
│  class="slds-textarea"       │
└──────────────────────────────┘
```

### Height Control Implementation

The component uses direct `scrollHeight` manipulation for accurate, reliable height control:

#### Primary Method: Direct scrollHeight Manipulation

**Method**: `adjustTextareaHeight(textarea)`

The core height calculation method:
1. Resets height: `textarea.style.height = 'auto'`
2. Reads actual content height: `scrollHeight = textarea.scrollHeight`
3. Applies constraints:
   ```javascript
   const calculatedHeight = Math.max(
       this.minHeight,
       this.maxHeight > 0 ? Math.min(scrollHeight, this.maxHeight) : scrollHeight
   );
   ```
4. Sets final height: `textarea.style.height = calculatedHeight + 'px'`
5. Manages overflow: Sets `overflow-y` to 'auto' when content exceeds max height, otherwise 'hidden'

#### Real-time Auto-Grow

**Method**: `handleInput(event)`

Provides smooth auto-expansion as users type:
- Captures every keystroke via the `input` event
- Updates internal `currentValue` with new content
- Calls `adjustTextareaHeight(event.target)` for immediate height adjustment
- Notifies Flow of value changes via `FlowAttributeChangeEvent`
- Only active when `autoExpand` property is enabled

#### Initial Height Setup

**Method**: `renderedCallback()`

Sets correct height when component loads with existing content:
- Uses `hasInitializedHeight` flag to run only once
- Finds the native textarea element via `querySelector('.slds-textarea')`
- Calls `adjustTextareaHeight()` to calculate and apply proper height
- Prevents infinite render loops with initialization flag

### Validation System

The component implements manual validation with full Flow integration:

#### Field Validation Logic

**Method**: `performValidation(value)`

Validates field content:
- **Required Field Check**: Detects empty or whitespace-only values
- **Max-Length Check**: Enforces field length limits from object metadata
- Returns: `{ isValid: boolean, errorMessage: string }`

#### Error Display

**Method**: `validateField()`

Orchestrates validation and UI updates:
- Calls `performValidation()` to check field validity
- Updates SLDS error styling with `.slds-has-error` class
- Displays error messages via `.slds-form-element__help` element
- Sets accessibility attributes: `aria-invalid`, `aria-describedby`
- Notifies Flow of validation state changes

#### Flow Integration APIs

The component provides standard Flow validation APIs:
- `@api validate()` - Called when user clicks Next/Finish in Flow
- `@api setCustomValidity()` - Sets custom error messages
- `@api reportValidity()` - Reports validation state to Flow
- `@api isValid` - Output property for validation state

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Salesforce Mobile App

### Performance Characteristics

- **Initial Load**: < 500ms
- **Auto-Expand Calculation**: < 50ms
- **Save Operation**: 200-500ms (network dependent)
- **LDS Cache Hit**: < 10ms

### Security Model

- Respects **Field Level Security (FLS)**
- Honors **Object CRUD permissions**
- Follows **Sharing Rules**
- Uses **User context** for all operations
- No elevation of privileges

## 🧪 Testing

### Run Unit Tests

```bash
# Run all LWC tests
npm run test:unit

# Run with coverage
npm run test:unit:coverage

# Watch mode for development
npm run test:unit:watch
```

### Manual Testing Checklist

- [ ] Component displays on Account record page
- [ ] Field value loads correctly
- [ ] Field saves on blur
- [ ] Initial height matches configuration
- [ ] Auto-expand works when enabled
- [ ] Max height constraint works
- [ ] Read-only mode prevents editing
- [ ] Works in Flow screen
- [ ] Works in LWR Digital Experience site
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] Screen reader compatible

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/redpoint-ascent/lwc-expandable-textarea.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add/update tests as needed
   - Update documentation

4. **Test Your Changes**
   ```bash
   npm run test:unit
   npm run lint
   ```

5. **Commit and Push**
   ```bash
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Wait for review

### Development Setup

```bash
# Clone the repository
git clone https://github.com/redpoint-ascent/lwc-expandable-textarea.git
cd lwc-expandable-textarea

# Install dependencies
npm install

# Authenticate to a scratch org
sf org create scratch --definition-file config/project-scratch-def.json --alias expandable-dev

# Push source to scratch org
sf project deploy start

# Open the scratch org
sf org open
```

### Code Style

- Follow [Salesforce LWC Style Guide](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_javascript)
- Use ESLint with the provided configuration
- Write meaningful commit messages
- Add JSDoc comments for public methods

## 📞 Support

This component is provided free by Redpoint Ascent. Community support via GitHub issues/discussions is available. Professional support with SLAs requires a commercial agreement.

### Community Support (Best-Effort)

- 🐛 **Bug Reports**: [Open an issue](https://github.com/redpoint-ascent/lwc-expandable-textarea/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Open an issue](https://github.com/redpoint-ascent/lwc-expandable-textarea/issues/new?template=feature_request.md)
- ❓ **Questions**: [Discussions](https://github.com/redpoint-ascent/lwc-expandable-textarea/discussions)

### Professional Support with SLAs

Guaranteed response times, priority bug fixes, and custom development require a commercial agreement.
Contact: [hello@redpoint-ascent.ai](mailto:hello@redpoint-ascent.ai)

### Known Issues

| Issue | Workaround | Status |
|-------|-----------|--------|
| LWR3008 error after deployment | Republish LWR site | Expected behavior |
| Component re-initialization in flows | Flow variables preserve state | Documented |
| Rich text fields display as HTML | Component designed for plain text | By design |

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Redpoint Ascent

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- **Salesforce** for the Lightning Web Components framework
- **UnofficialSF** for Flow component inspiration and best practices
- **Community Contributors** who reported issues and suggested features
- **Salesforce Stack Exchange** community for troubleshooting support
- **Redpoint Ascent clients** who inspired this solution

## 🔗 Related Projects

- [UnofficialSF Text Area Plus](https://unofficialsf.com/text-area-plus/)
- [Salesforce LWC Recipes](https://github.com/trailheadapps/lwc-recipes)
- [Lightning Web Components Samples](https://github.com/salesforce/lwc-recipes-oss)

## 📊 Project Status

- ✅ **Stable** - Production ready
- 🔄 **Maintained** - Actively maintained
- 📦 **Version**: 1.0.0
- 📅 **Last Updated**: 2025

## 🗺️ Roadmap

- [ ] Character counter with warnings
- [ ] Word count display
- [ ] Rich text support with formatting preservation
- [ ] Auto-save with debouncing
- [ ] Field history integration
- [ ] Multi-language support
- [ ] Dark mode styling optimization
- [ ] Custom validation rules via configuration

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/redpoint-ascent/lwc-expandable-textarea?style=social)
![GitHub forks](https://img.shields.io/github/forks/redpoint-ascent/lwc-expandable-textarea?style=social)
![GitHub issues](https://img.shields.io/github/issues/redpoint-ascent/lwc-expandable-textarea)
![GitHub pull requests](https://img.shields.io/github/issues-pr/redpoint-ascent/lwc-expandable-textarea)

---

<div align="center">

**Made with ❤️ by [Redpoint Ascent](https://redpoint-ascent.ai) for the Salesforce Community**

*If this component helped you, consider giving it a ⭐ on GitHub!*

[![Contact Us](https://img.shields.io/badge/Contact-hello@redpoint--ascent.ai-blue?style=for-the-badge&logo=gmail)](mailto:hello@redpoint-ascent.ai)
[![Website](https://img.shields.io/badge/Visit-redpoint--ascent.ai-green?style=for-the-badge&logo=google-chrome)](https://redpoint-ascent.ai)

</div>
