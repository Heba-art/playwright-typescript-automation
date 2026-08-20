# Formal Test Cases

## Document Information

| Field | Details |
| --- | --- |
| Project | Playwright TypeScript Automation Framework |
| Application | [Automation Exercise](https://automationexercise.com/) |
| Author | Heba Al-Rubaye |
| Version | 1.0 |
| Status | Draft |
| Date | 20 August 2026 |
| Related Document | [Test Plan](./TEST_PLAN.md) |

## Test Case Sources

- [Official UI Test Cases](https://automationexercise.com/test_cases)
- [Official API List](https://automationexercise.com/api_list)

## Test Case Summary

| ID | Type | Title | Priority | Status |
| --- | --- | --- | --- | --- |
| TC-UI-001 | UI | Register User | Critical | Planned |
| TC-UI-002 | UI | Login with correct credentials | Critical | Planned |
| TC-UI-003 | UI Negative | Login with incorrect credentials | High | Planned |
| TC-UI-004 | UI | Logout User | High | Planned |
| TC-UI-005 | UI Negative | Register with existing email | High | Planned |
| TC-UI-006 | UI | Submit Contact Us form with file upload | Medium | Planned |
| TC-UI-007 | UI | Verify products list and product details | High | Planned |
| TC-UI-008 | UI | Search Product | High | Planned |
| TC-UI-009 | UI | Add multiple products to Cart | Critical | Planned |
| TC-UI-010 | UI E2E | Complete purchase and download invoice | Critical | Planned |
| TC-API-001 | API | Get all products | High | Planned |
| TC-API-002 | API Negative | Reject unsupported POST to products list | Medium | Planned |
| TC-API-003 | API | Get all brands | Medium | Planned |
| TC-API-004 | API | Search product with valid parameter | High | Planned |
| TC-API-005 | API Negative | Search without required parameter | High | Planned |
| TC-API-006 | API Negative | Verify login with invalid credentials | High | Planned |
| TC-API-007 | API CRUD | Create, retrieve, update, and delete account | Critical | Planned |
| TC-HYB-001 | API + UI | Create through API, login through UI, delete through API | Critical | Planned |
| TC-A11Y-001 | Accessibility | Axe scan on Home page | High | Planned |
| TC-A11Y-002 | Accessibility | Axe scan on Products page | High | Planned |

## Common Test Data

| Data | Value or Strategy |
| --- | --- |
| Base URL | `https://automationexercise.com` |
| Unique email | Generated using timestamp or UUID |
| Valid password | Stored as non-sensitive test data |
| Invalid email | Dynamically generated unregistered email |
| Invalid password | Deliberately incorrect test password |
| Search product | `Blue Top` |
| Upload file | `test-data/contact-upload.txt` |
| Payment details | Fictional test-only card information |
| Browser coverage | Chromium, Firefox, and WebKit |

---

# UI Test Cases

## TC-UI-001 — Register User

| Field | Details |
| --- | --- |
| Source | Official Test Case 1 |
| Priority | Critical |
| Preconditions | Generated email is not already registered |
| Test Data | Unique name, email, password, date of birth, and address |
| Cleanup | Delete the created account |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Navigate to the home page | Home page loads successfully |
| 2 | Select `Signup / Login` | `New User Signup!` is visible |
| 3 | Enter a name and unique email, then select `Signup` | `Enter Account Information` is visible |
| 4 | Complete required account and address fields | All entered information is accepted |
| 5 | Select newsletter and special-offer checkboxes | Both options are selected |
| 6 | Select `Create Account` | `Account Created!` is visible |
| 7 | Select `Continue` | `Logged in as <username>` is visible |
| 8 | Select `Delete Account` | `Account Deleted!` is visible |

---

## TC-UI-002 — Login with Correct Credentials

| Field | Details |
| --- | --- |
| Source | Official Test Case 2 |
| Priority | Critical |
| Preconditions | Active test account exists |
| Test Data | Valid email and password |
| Cleanup | Delete account through API after execution |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Navigate to the home page | Home page loads successfully |
| 2 | Select `Signup / Login` | `Login to your account` is visible |
| 3 | Enter valid email and password | Credentials are accepted |
| 4 | Select `Login` | User is authenticated |
| 5 | Check the navigation header | `Logged in as <username>` is visible |

---

## TC-UI-003 — Login with Incorrect Credentials

| Field | Details |
| --- | --- |
| Source | Official Test Case 3 |
| Priority | High |
| Preconditions | User is logged out |
| Test Data | Unregistered email and incorrect password |
| Cleanup | None |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Navigate to the home page | Home page loads successfully |
| 2 | Select `Signup / Login` | Login form is visible |
| 3 | Enter invalid email and password | Values appear in the fields |
| 4 | Select `Login` | Login is rejected |
| 5 | Check the error message | `Your email or password is incorrect!` is visible |
| 6 | Check the navigation header | No authenticated username is displayed |

---

## TC-UI-004 — Logout User

| Field | Details |
| --- | --- |
| Source | Official Test Case 4 |
| Priority | High |
| Preconditions | Active test account exists |
| Test Data | Valid email and password |
| Cleanup | Delete account through API |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Open the login page | Login form is visible |
| 2 | Enter valid credentials and select `Login` | User is authenticated |
| 3 | Verify `Logged in as <username>` | Authenticated state is confirmed |
| 4 | Select `Logout` | User is logged out |
| 5 | Check the current page | User is returned to the login page |
| 6 | Check the login form | `Login to your account` is visible |

---

## TC-UI-005 — Register User with Existing Email

| Field | Details |
| --- | --- |
| Source | Official Test Case 5 |
| Priority | High |
| Preconditions | An account already exists |
| Test Data | Existing email and a test name |
| Cleanup | Delete the existing account through API |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Navigate to the home page | Home page loads successfully |
| 2 | Select `Signup / Login` | `New User Signup!` is visible |
| 3 | Enter a name and an already registered email | Values appear in the fields |
| 4 | Select `Signup` | Registration is rejected |
| 5 | Check the error message | `Email Address already exist!` is visible |
| 6 | Verify navigation does not continue | Account information page is not opened |

---

## TC-UI-006 — Submit Contact Us Form with File Upload

| Field | Details |
| --- | --- |
| Source | Official Test Case 6 |
| Priority | Medium |
| Preconditions | Upload test file exists |
| Test Data | Name, email, subject, message, and text file |
| Cleanup | Remove local download or temporary artifact if created |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Navigate to the home page | Home page loads successfully |
| 2 | Select `Contact us` | `Get In Touch` is visible |
| 3 | Enter name, email, subject, and message | Form fields contain the entered values |
| 4 | Upload `contact-upload.txt` | Selected filename is attached |
| 5 | Select `Submit` | Confirmation dialog appears |
| 6 | Accept the dialog | Form submission continues |
| 7 | Check the success message | Submission success message is visible |
| 8 | Select `Home` | User returns to the home page |

---

## TC-UI-007 — Verify Products List and Product Details

| Field | Details |
| --- | --- |
| Source | Official Test Case 8 |
| Priority | High |
| Preconditions | Product catalogue is available |
| Test Data | First available product |
| Cleanup | None |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Navigate to the home page | Home page loads successfully |
| 2 | Select `Products` | `All Products` page is displayed |
| 3 | Check the product list | At least one product is visible |
| 4 | Select `View Product` for the first product | Product details page opens |
| 5 | Verify product name | Product name is visible |
| 6 | Verify category and price | Category and price are visible |
| 7 | Verify availability, condition, and brand | All required product details are visible |

---

## TC-UI-008 — Search Product

| Field | Details |
| --- | --- |
| Source | Official Test Case 9 |
| Priority | High |
| Preconditions | Product catalogue is available |
| Test Data | Search term: `Blue Top` |
| Cleanup | None |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Open the Products page | `All Products` is visible |
| 2 | Enter `Blue Top` in the search field | Search term appears in the field |
| 3 | Select the search button | `Searched Products` is visible |
| 4 | Review the returned products | At least one matching product is displayed |
| 5 | Verify the product names | Displayed results relate to the search term |

---

## TC-UI-009 — Add Multiple Products to Cart

| Field | Details |
| --- | --- |
| Source | Official Test Case 12 |
| Priority | Critical |
| Preconditions | At least two products are available |
| Test Data | First and second products |
| Cleanup | Remove products or use isolated browser context |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Open the Products page | Product list is visible |
| 2 | Add the first product to the cart | Confirmation modal appears |
| 3 | Select `Continue Shopping` | Products page remains available |
| 4 | Add the second product to the cart | Confirmation modal appears |
| 5 | Select `View Cart` | Cart page opens |
| 6 | Verify both selected products | Both products are listed |
| 7 | Verify prices and quantities | Correct price and quantity are displayed |
| 8 | Verify each total | Total equals price multiplied by quantity |

---

## TC-UI-010 — Complete Purchase and Download Invoice

| Field | Details |
| --- | --- |
| Source | Official Test Case 24 |
| Priority | Critical |
| Preconditions | Product catalogue and checkout are available |
| Test Data | Unique account, address, order comment, and fictional card details |
| Cleanup | Delete account and downloaded invoice |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Add a product to the cart | Product is added successfully |
| 2 | Open the Cart page | Product is visible in the cart |
| 3 | Select `Proceed To Checkout` | Registration or login prompt appears |
| 4 | Register a new user with unique data | Account is created |
| 5 | Return to Cart and proceed to checkout | Checkout page opens |
| 6 | Verify delivery and billing addresses | Addresses match registration data |
| 7 | Verify the order summary | Correct product, quantity, and total are displayed |
| 8 | Enter an order comment and select `Place Order` | Payment form opens |
| 9 | Enter fictional payment information | Payment fields accept the test data |
| 10 | Select `Pay and Confirm Order` | Order confirmation is displayed |
| 11 | Select `Download Invoice` | Invoice download begins |
| 12 | Verify the downloaded file | Invoice exists and is not empty |
| 13 | Select `Continue` | User leaves the confirmation page |
| 14 | Delete the test account | `Account Deleted!` is visible |

---

# API Test Cases

## TC-API-001 — Get All Products

| Field | Details |
| --- | --- |
| Source | Official API 1 |
| Priority | High |
| Method | GET |
| Endpoint | `/api/productsList` |
| Cleanup | None |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Send GET request to `/api/productsList` | Response is returned |
| 2 | Validate the documented response code | `responseCode` is `200` |
| 3 | Validate the products collection | Products array exists and is not empty |
| 4 | Validate a product object | ID, name, price, brand, and category are present |

---

## TC-API-002 — Reject Unsupported POST to Products List

| Field | Details |
| --- | --- |
| Source | Official API 2 |
| Priority | Medium |
| Method | POST |
| Endpoint | `/api/productsList` |
| Cleanup | None |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Send POST request to `/api/productsList` | Response is returned |
| 2 | Validate the documented response code | `responseCode` is `405` |
| 3 | Validate the message | `This request method is not supported.` is returned |
| 4 | Verify no product is created | Products data is unchanged |

---

## TC-API-003 — Get All Brands

| Field | Details |
| --- | --- |
| Source | Official API 3 |
| Priority | Medium |
| Method | GET |
| Endpoint | `/api/brandsList` |
| Cleanup | None |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Send GET request to `/api/brandsList` | Response is returned |
| 2 | Validate the documented response code | `responseCode` is `200` |
| 3 | Validate the brands collection | Brands array exists and is not empty |
| 4 | Validate a brand object | Brand ID and name are present |

---

## TC-API-004 — Search Product with Valid Parameter

| Field | Details |
| --- | --- |
| Source | Official API 5 |
| Priority | High |
| Method | POST |
| Endpoint | `/api/searchProduct` |
| Test Data | `search_product=top` |
| Cleanup | None |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Send POST request with `search_product=top` | Response is returned |
| 2 | Validate the documented response code | `responseCode` is `200` |
| 3 | Validate the products collection | At least one result is returned |
| 4 | Validate returned product names | Results relate to the search term |

---

## TC-API-005 — Search without Required Parameter

| Field | Details |
| --- | --- |
| Source | Official API 6 |
| Priority | High |
| Method | POST |
| Endpoint | `/api/searchProduct` |
| Test Data | Request without `search_product` |
| Cleanup | None |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Send POST request without `search_product` | Response is returned |
| 2 | Validate the documented response code | `responseCode` is `400` |
| 3 | Validate the message | Missing parameter message is returned |
| 4 | Verify no search results are returned | Request is rejected safely |

---

## TC-API-006 — Verify Login with Invalid Credentials

| Field | Details |
| --- | --- |
| Source | Official API 10 |
| Priority | High |
| Method | POST |
| Endpoint | `/api/verifyLogin` |
| Test Data | Unregistered email and incorrect password |
| Cleanup | None |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Send POST request with invalid credentials | Response is returned |
| 2 | Validate the documented response code | `responseCode` is `404` |
| 3 | Validate the response message | `User not found!` is returned |
| 4 | Verify no user data is returned | Invalid authentication reveals no account details |

---

## TC-API-007 — User Account CRUD Lifecycle

| Field | Details |
| --- | --- |
| Source | Official APIs 11–14 |
| Priority | Critical |
| Methods | POST, GET, PUT, DELETE |
| Test Data | Complete unique user payload |
| Cleanup | Delete account in cleanup logic if the test fails |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | POST complete user data to `/api/createAccount` | `responseCode` is `201` and user is created |
| 2 | GET user details using the created email | `responseCode` is `200` |
| 3 | Verify returned user details | Email and profile data match the created user |
| 4 | PUT updated user data to `/api/updateAccount` | `responseCode` is `200` and update succeeds |
| 5 | GET the user details again | Updated values are returned |
| 6 | DELETE the account through `/api/deleteAccount` | `responseCode` is `200` |
| 7 | Verify the deletion message | `Account deleted!` is returned |

---

# Hybrid Test Case

## TC-HYB-001 — Create through API, Login through UI, Delete through API

| Field | Details |
| --- | --- |
| Type | Hybrid API and UI |
| Priority | Critical |
| Preconditions | API and UI are available |
| Test Data | Unique user payload |
| Cleanup | API account deletion in guaranteed cleanup |
| Automation Status | Planned |

### Steps

| # | Layer | Action | Expected Result |
| ---: | --- | --- | --- |
| 1 | API | Create a unique user through `/api/createAccount` | User is created successfully |
| 2 | UI | Open the Signup/Login page | Login form is visible |
| 3 | UI | Enter the API-created credentials | Credentials are accepted |
| 4 | UI | Select `Login` | User is authenticated |
| 5 | UI | Verify `Logged in as <username>` | API-created account works through UI |
| 6 | API | Delete the account through `/api/deleteAccount` | Account is deleted successfully |
| 7 | API | Request user details after deletion | Deleted account is no longer available |

---

# Accessibility Test Cases

## TC-A11Y-001 — Axe Scan on Home Page

| Field | Details |
| --- | --- |
| Type | Accessibility |
| Priority | High |
| Page | `/` |
| Standards | WCAG 2.0 A/AA and WCAG 2.1 A/AA |
| Tool | Axe Core |
| Cleanup | None |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Navigate to the home page | Main content loads successfully |
| 2 | Run an Axe accessibility scan | Scan completes without technical error |
| 3 | Filter serious and critical violations | No undocumented serious or critical violation exists |
| 4 | Record any detected violations | Rule, impact, target, and help URL are available |
| 5 | Attach results to the report | Accessibility evidence is available |

---

## TC-A11Y-002 — Axe Scan on Products Page

| Field | Details |
| --- | --- |
| Type | Accessibility |
| Priority | High |
| Page | `/products` |
| Standards | WCAG 2.0 A/AA and WCAG 2.1 A/AA |
| Tool | Axe Core |
| Cleanup | None |
| Automation Status | Planned |

### Steps

| # | Action | Expected Result |
| ---: | --- | --- |
| 1 | Navigate to the Products page | Product content loads successfully |
| 2 | Verify the products heading | `All Products` is visible |
| 3 | Run an Axe accessibility scan | Scan completes without technical error |
| 4 | Filter serious and critical violations | No undocumented serious or critical violation exists |
| 5 | Record any detected violations | Rule, impact, target, and help URL are available |
| 6 | Attach results to the report | Accessibility evidence is available |

---

## Execution Status Legend

| Status | Meaning |
| --- | --- |
| Planned | Test case is documented but not automated |
| In Progress | Automation implementation has started |
| Automated | Test has been implemented |
| Passed | Latest execution passed |
| Failed | Latest execution failed |
| Blocked | Execution cannot continue because of an external issue |