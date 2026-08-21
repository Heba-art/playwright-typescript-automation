# Test Plan

## Document Information

| Field | Details |
| --- | --- |
| Project | Playwright TypeScript Automation Framework |
| Application Under Test | [Automation Exercise](https://automationexercise.com/) |
| Test Plan Owner | Heba Al-Rubaye |
| Version | 1.0 |
| Status | Draft |
| Date | 20 August 2026 |
| Repository | [playwright-typescript-automation](https://github.com/Heba-art/playwright-typescript-automation) |

## 1. Purpose

This test plan defines the scope, approach, environments, test data, risks, entry and exit criteria, and deliverables for the Playwright TypeScript Automation Framework.

The project tests the Automation Exercise website through UI, API, hybrid, accessibility, cross-browser, and CI execution.

## 2. Test Objectives

The objectives are to:

- Verify that critical customer journeys work as expected.
- Validate positive and negative UI and API scenarios.
- Confirm that the application behaves consistently across major browser engines.
- Demonstrate reliable test-data setup and cleanup.
- Validate selected pages for automated accessibility violations.
- Build a maintainable framework using professional automation practices.
- Execute tests automatically through GitHub Actions.
- Produce useful reports and debugging evidence.

## 3. Test Basis

Test scenarios are based on:

- [Official UI Test Cases](https://automationexercise.com/test_cases)
- [Official API List](https://automationexercise.com/api_list)
- Website behaviour and business workflows
- Accessibility expectations based on Axe Core automated rules
- Cross-browser and responsive web testing requirements

## 4. Scope

### 4.1 In Scope

The project contains **20 formal automated test cases**:

| Test Layer | Number | Coverage |
| --- | ---: | --- |
| UI | 10 | Registration, login, logout, upload, products, search, cart, checkout, and invoice |
| API | 7 | Positive and negative requests, product search, authentication, and account CRUD |
| Hybrid API + UI | 1 | API setup, UI verification, and API cleanup |
| Accessibility | 2 | Axe scans on the home and products pages |
| **Total** | **20** | Multi-layer automated coverage |

The following execution coverage is also included:

- Chromium
- Firefox
- WebKit
- Selected mobile browser viewports
- Local execution
- GitHub Actions CI execution
- HTML reports, traces, screenshots, and videos
- Test-data creation and cleanup

Cross-browser and mobile executions do not count as additional formal test cases.

### 4.2 Out of Scope

The following are not included:

- Performance, load, or stress testing
- Penetration or advanced security testing
- Database validation
- Native mobile application testing
- Testing all 26 UI scenarios
- Testing all 14 API scenarios individually
- Real payment gateway validation
- Manual accessibility certification
- Production monitoring

## 5. Test Approach

### 5.1 UI Testing

UI tests will use Playwright browser automation.

The framework will apply:

- Page Object Model
- User-facing locators where practical
- Reusable fixtures
- Data-driven testing
- Independent test execution
- Automatic waiting instead of fixed delays
- Assertions for visible behaviour and expected outcomes

### 5.2 API Testing

API tests will use Playwright `APIRequestContext`.

Validation will include:

- HTTP response codes
- Response messages
- JSON response bodies
- Required fields
- Positive and negative requests
- Unsupported request methods
- Account creation, retrieval, update, and deletion

### 5.3 Hybrid Testing

The hybrid test will:

1. Create a unique user through the API.
2. Log in through the UI.
3. Verify the authenticated state.
4. Delete the user through the API.

This approach demonstrates fast test setup, UI validation, and reliable cleanup.

### 5.4 Accessibility Testing

Axe Core will scan selected pages for automatically detectable accessibility violations.

The scans will focus on:

- WCAG 2.0 A and AA
- WCAG 2.1 A and AA
- Serious and critical violations

Automated Axe testing does not replace complete manual accessibility testing.

### 5.5 Cross-Browser and Mobile Testing

The suite will execute against:

- Desktop Chrome through Chromium
- Desktop Firefox
- Desktop Safari behaviour through WebKit
- Selected mobile Chrome and mobile Safari viewports

Browser and viewport coverage are execution configurations, not separate test cases.

## 6. Test Environment

### Local Environment

| Component | Configuration |
| --- | --- |
| Operating System | Windows |
| IDE | Visual Studio Code |
| Runtime | Node.js |
| Package Manager | npm |
| Language | TypeScript |
| Automation Tool | Playwright Test |
| Browsers | Chromium, Firefox, and WebKit |

### CI Environment

| Component | Configuration |
| --- | --- |
| Platform | GitHub Actions |
| Operating System | Ubuntu runner |
| Trigger | Push and pull request |
| Browser Installation | Playwright browser installation with dependencies |
| Reporting | Playwright HTML report and CI artifacts |

## 7. Test Data Management

The framework will:

- Generate unique email addresses for new users.
- Avoid real personal or sensitive information.
- Store reusable non-sensitive data separately from test logic.
- Create required accounts through UI or API setup.
- Delete created accounts after execution.
- Keep tests independent and safe for parallel execution.
- Avoid relying on data created by another test.

Test data must never include passwords, tokens, or secrets committed to GitHub.

## 8. Test Execution Strategy

During development:

- Run the affected test file.
- Use Chromium for fast feedback.
- Use headed or debug mode when investigating failures.

Before pull request completion:

- Run the affected test cases.
- Run cross-browser execution.
- Review reports and failure evidence.

In CI:

- Execute tests through GitHub Actions.
- Retry failed tests only when configured for CI.
- Upload reports and debugging artifacts.
- Prevent accidental committed `test.only` usage.

## 9. Entry Criteria

Testing can begin when:

- The Automation Exercise website is available.
- The selected requirements and scenarios are documented.
- Node.js and npm are installed.
- Playwright and its browsers are installed.
- The base URL is configured.
- The required test data is available or can be generated.
- Formal test cases have defined expected results.
- The relevant project branch is ready.

## 10. Exit Criteria

The project is considered complete when:

- All 20 formal test cases are implemented.
- All critical test cases pass.
- No unresolved critical or high-severity framework defects remain.
- Cross-browser execution is completed.
- GitHub Actions execution passes.
- Data cleanup is verified.
- Accessibility results are documented.
- Reports and debugging artifacts are available.
- README, Test Plan, and Test Cases documentation are current.

## 11. Pass and Fail Criteria

### Pass

A test passes when:

- All steps complete successfully.
- All expected results are met.
- Required UI elements or API responses are verified.
- Test data is cleaned up when applicable.

### Fail

A test fails when:

- The actual result does not match the expected result.
- An unexpected error occurs.
- The test exceeds its timeout.
- Required cleanup fails.
- A critical assertion or accessibility rule fails.

## 12. Defect Management

Defects may be documented using GitHub Issues.

Each defect should include:

- Clear title
- Test case ID
- Environment and browser
- Preconditions
- Steps to reproduce
- Expected result
- Actual result
- Severity and priority
- Screenshot, trace, video, or API response
- Relevant logs

### Severity Levels

| Severity | Description |
| --- | --- |
| Critical | Blocks a critical workflow or the complete test suite |
| High | Major feature fails with no practical workaround |
| Medium | Feature partially fails or has a reasonable workaround |
| Low | Minor visual, usability, or documentation issue |

## 13. Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Public practice website is unavailable or slow | Use appropriate waits, controlled workers, and CI retries |
| Advertisements or external resources delay page loading | Wait for `domcontentloaded` where appropriate |
| Shared test data causes conflicts | Generate unique user data |
| Created accounts remain after failures | Use cleanup fixtures and `finally` logic |
| Parallel tests interfere with each other | Keep data and browser contexts isolated |
| Browser behaviour differs | Run Chromium, Firefox, and WebKit |
| API responses change | Validate documented fields and record unexpected changes |
| Third-party services affect README visuals | Keep meaningful text available as a fallback |
| Automated accessibility checks are incomplete | Clearly document the limits of Axe automation |

## 14. Test Deliverables

The project will produce:

- `README.md`
- `docs/TEST_PLAN.md`
- `docs/TEST_CASES.md`
- Playwright configuration
- Page Object Model classes
- Reusable fixtures and utilities
- Test-data factories
- UI automated tests
- API automated tests
- Hybrid automated test
- Axe accessibility tests
- GitHub Actions workflow
- HTML test reports
- Screenshots, traces, and videos
- GitHub pull requests and commit history

## 15. Roles and Responsibilities

| Role | Responsibility |
| --- | --- |
| Test Automation Engineer — Heba Al-Rubaye | Planning, test design, implementation, execution, analysis, documentation, and maintenance |
| GitHub Actions | Automated CI execution and reporting |
| GitHub Copilot | Selective assistance only for a genuinely complex problem after an independent attempt |

## 16. Test Case Identification

The following ID format will be used:

| Prefix | Meaning |
| --- | --- |
| `TC-UI` | User interface test |
| `TC-API` | API test |
| `TC-HYB` | Hybrid API and UI test |
| `TC-A11Y` | Accessibility test |

Example:

```text
TC-UI-001 — Register User
```

## 17. Approval

| Name | Role | Status |
| --- | --- | --- |
| Heba Al-Rubaye | Project Owner and Test Automation Engineer | Draft review |