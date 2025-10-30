# Contributing to Expandable Text Area

First off, thank you for considering contributing to the Expandable Text Area project! 🎉

This project is maintained by [Redpoint Ascent](https://redpoint-ascent.ai) and built for the Salesforce community. We welcome contributions from developers of all skill levels.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Questions](#questions)

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. By participating, you are expected to uphold this code. Please be respectful, inclusive, and professional in all interactions.

### Our Standards

**Examples of behavior that contributes to a positive environment:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/redpoint-ascent/lwc-expandable-textarea/issues) to avoid duplicates.

When you create a bug report, please include:
- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Salesforce org details**: Edition, API version
- **Browser and version** if UI-related
- **Component configuration** used

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:
- **Clear title and description**
- **Use case**: Why would this be useful?
- **Proposed solution** if you have one
- **Alternative solutions** you've considered
- **Additional context**: screenshots, mockups, etc.

### Pull Requests

We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## 🛠️ Development Setup

### Prerequisites

- Salesforce CLI (`sf`) installed
- Node.js (v18 or higher)
- Git
- A Salesforce Developer Edition org or Scratch Org

### Setup Steps

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/lwc-expandable-textarea.git
cd lwc-expandable-textarea

# 2. Install dependencies
npm install

# 3. Authorize a Salesforce org
sf org login web --alias expandable-dev

# 4. Create a scratch org (optional but recommended)
sf org create scratch --definition-file config/project-scratch-def.json --alias expandable-dev --set-default

# 5. Push source to org
sf project deploy start

# 6. Open the org
sf org open

# 7. Run tests
npm run test:unit
```

### Project Structure

```
lwc-expandable-textarea/
├── force-app/
│   └── main/
│       └── default/
│           └── lwc/
│               └── expandableTextArea/
│                   ├── expandableTextArea.js
│                   ├── expandableTextArea.html
│                   ├── expandableTextArea.css
│                   ├── expandableTextArea.js-meta.xml
│                   └── __tests__/
├── docs/
├── README.md
├── AGENTS.md
├── CONTRIBUTING.md (this file)
└── package.json
```

## 💻 Coding Guidelines

### JavaScript Style

We follow the [Salesforce Lightning Web Components Style Guide](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_javascript).

**Key Points:**
- Use `const` and `let`, never `var`
- Use arrow functions for callbacks
- Use template literals for string concatenation
- Add JSDoc comments for public methods
- Use async/await instead of promises
- Descriptive variable names (no single letters except in loops)

**Example:**

```javascript
// ✅ Good
/**
 * Adjusts the textarea height based on content
 * @param {Event} event - Change event from textarea
 */
adjustHeight(event) {
    const textarea = event.target;
    const newHeight = this.calculateHeight(textarea);
    this.applyHeight(textarea, newHeight);
}

// ❌ Bad
adjustHeight(e) {
    var t = e.target;
    var h = calc(t);
    apply(t, h);
}
```

### HTML/Template Style

```html
<!-- ✅ Good: Use semantic conditional rendering -->
<template if:true={isLoading}>
    <lightning-spinner alternative-text="Loading..."></lightning-spinner>
</template>
<template if:false={isLoading}>
    <lightning-textarea value={fieldValue}></lightning-textarea>
</template>

<!-- ❌ Bad: Don't use display:none -->
<div style="display: none;">
    <lightning-spinner></lightning-spinner>
</div>
```

### CSS Style

- Use SLDS tokens and design patterns
- Use CSS custom properties for themeable values
- Mobile-first responsive design
- Support dark mode where applicable

```css
/* ✅ Good: Use SLDS tokens */
.custom-class {
    color: var(--slds-g-color-neutral-base-50);
    padding: var(--slds-spacing-small);
}

/* ❌ Bad: Hard-coded values */
.custom-class {
    color: #333;
    padding: 8px;
}
```

### Testing

- Write unit tests for all new functionality
- Maintain or improve code coverage
- Use descriptive test names
- Test both happy path and edge cases

```javascript
// ✅ Good test
describe('expandableTextArea component', () => {
    it('should apply configured initial height', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        element.initialHeight = 300;
        document.body.appendChild(element);
        
        return Promise.resolve().then(() => {
            const textarea = element.shadowRoot.querySelector('lightning-textarea');
            // Assert height is applied
        });
    });
});
```

### Documentation

- Update README.md if you change user-facing behavior
- Update AGENTS.md if you change architecture or add features
- Add inline comments for complex logic
- Update JSDoc comments when changing method signatures

## 📤 Submitting Changes

### Branch Naming

Use descriptive branch names:
- `feature/add-character-counter` - for new features
- `fix/auto-expand-issue` - for bug fixes
- `docs/update-readme` - for documentation
- `refactor/simplify-validation` - for refactoring
- `test/add-height-tests` - for test additions

### Commit Messages

Write clear, descriptive commit messages:

```bash
# ✅ Good
git commit -m "feat: Add character counter with configurable display"
git commit -m "fix: Correct auto-expand calculation for large text"
git commit -m "docs: Update configuration examples in README"

# ❌ Bad
git commit -m "updates"
git commit -m "fix stuff"
git commit -m "changes"
```

Use conventional commit format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Pull Request Process

1. **Update documentation** - Update README.md, AGENTS.md, or other docs as needed
2. **Add tests** - Ensure your changes are tested
3. **Run the test suite** - `npm run test:unit` must pass
4. **Run linting** - `npm run lint` must pass
5. **Update CHANGELOG.md** - Add your changes under "Unreleased"
6. **Provide context** - Fill out the pull request template completely

### Pull Request Template

When you create a PR, please include:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Tested on Lightning Record Page
- [ ] Tested in Flow Screen
- [ ] Tested in LWR site (if applicable)

## Screenshots (if applicable)

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
```

## 🐛 Reporting Bugs

When reporting bugs, please use the [bug report template](https://github.com/redpoint-ascent/lwc-expandable-textarea/issues/new?template=bug_report.md) and include:

### Information to Include

1. **Environment:**
   - Salesforce Edition (Developer, Enterprise, etc.)
   - API Version
   - Browser and version
   - Component version

2. **Steps to Reproduce:**
   ```
   1. Go to '...'
   2. Click on '...'
   3. Configure component with '...'
   4. See error
   ```

3. **Expected Behavior:**
   What you expected to happen

4. **Actual Behavior:**
   What actually happened

5. **Screenshots:**
   If applicable, add screenshots to help explain

6. **Additional Context:**
   Any other relevant information

## 💡 Suggesting Enhancements

We love new ideas! Please use the [feature request template](https://github.com/redpoint-ascent/lwc-expandable-textarea/issues/new?template=feature_request.md).

### Good Enhancement Requests Include:

1. **Problem Statement:**
   What problem does this solve?

2. **Proposed Solution:**
   How would you implement this?

3. **Alternatives Considered:**
   What other approaches did you think about?

4. **Use Case:**
   Real-world scenario where this would be helpful

5. **Additional Context:**
   Mockups, examples, references

## ❓ Questions

Have questions? Here's how to get help:

### For General Questions
- 💬 Start a [GitHub Discussion](https://github.com/redpoint-ascent/lwc-expandable-textarea/discussions)
- 📚 Check the [documentation](docs/)
- 🔍 Search [existing issues](https://github.com/redpoint-ascent/lwc-expandable-textarea/issues)

### For Technical Support
- 📧 Email: [hello@redpoint-ascent.ai](mailto:hello@redpoint-ascent.ai)
- 🌐 Visit: [redpoint-ascent.ai](https://redpoint-ascent.ai)

### For Commercial Support
Redpoint Ascent offers commercial support for organizations that need:
- Priority bug fixes
- Custom feature development
- Implementation assistance
- Training and consulting

Contact [hello@redpoint-ascent.ai](mailto:hello@redpoint-ascent.ai) for details.

## 🏆 Recognition

Contributors will be recognized in:
- The project README
- Release notes for versions they contribute to
- Our community appreciation posts

Top contributors may be invited to:
- Join as project maintainers
- Collaborate on future Redpoint Ascent open source projects
- Participate in beta testing new features

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make this project better for everyone in the Salesforce community. Whether you're fixing a typo, reporting a bug, or implementing a major feature - thank you for taking the time to contribute!

---

**Maintained by [Redpoint Ascent](https://redpoint-ascent.ai)**  
*Building better Salesforce experiences through open source*
