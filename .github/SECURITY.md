# Security Policy

## Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **[hello@redpoint-ascent.ai](mailto:hello@redpoint-ascent.ai)**

### What to Include

Please include the following information in your report:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 5 business days
- **Resolution Target**: Within 30 days for critical issues

### Security Best Practices

This component follows Salesforce security best practices:

- ✅ Uses Lightning Data Service (automatic FLS/CRUD enforcement)
- ✅ No custom Apex (reduces attack surface)
- ✅ No bypass of platform security
- ✅ Client-side only operations
- ✅ SLDS-compliant styling
- ✅ No external dependencies

### Scope

**In Scope:**
- Code injection vulnerabilities
- XSS vulnerabilities
- Data leakage issues
- Authentication/authorization bypasses
- Denial of service vulnerabilities

**Out of Scope:**
- Salesforce platform vulnerabilities
- Browser-specific issues
- Issues in dependencies (report to dependency maintainers)
- Social engineering attacks

## Security Updates

Security updates will be:
- Released as patch versions (e.g., 1.0.x)
- Documented in CHANGELOG.md
- Announced via GitHub Security Advisories
- Communicated to known users via email (if applicable)

## Disclosure Policy

We follow responsible disclosure practices:

1. Security researcher reports vulnerability privately
2. We confirm receipt and begin investigation
3. We develop and test a fix
4. We release the fix and publish a security advisory
5. We credit the researcher (unless they prefer to remain anonymous)

## Contact

**Security Contact:** [hello@redpoint-ascent.ai](mailto:hello@redpoint-ascent.ai)

**PGP Key:** Available upon request

---

**Maintained by [Redpoint Ascent](https://redpoint-ascent.ai)**  
*Committed to secure Salesforce development*