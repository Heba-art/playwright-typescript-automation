# Formal Test Cases

> Total: **20 Test Cases**  
> Execution status will be updated only after running the automated tests.

## UI Test Cases

| ID | Module | Title | Priority | Type | Precondition | Steps | Expected Result | Actual Result |
|---|---|---|---|---|---|---|---|---|
| TC-UI-001 | Registration | Register New User | High | Positive | User email is not registered | 1. Open the application<br>2. Select Signup/Login<br>3. Enter name and email<br>4. Complete registration form<br>5. Submit the account | Account is created and confirmation is displayed | ⬜ Not Executed |
| TC-UI-002 | Authentication | Login with Correct Credentials | Critical | Positive | Registered user exists | 1. Open Signup/Login<br>2. Enter valid email<br>3. Enter valid password<br>4. Select Login | User is logged in and username is displayed | ⬜ Not Executed |
| TC-UI-003 | Authentication | Login with Incorrect Credentials | High | Negative | Login page is available | 1. Open Signup/Login<br>2. Enter invalid credentials<br>3. Select Login | Incorrect credentials error is displayed | ⬜ Not Executed |
| TC-UI-004 | Authentication | Logout User | High | Positive | User is logged in | 1. Select Logout<br>2. Review the destination page | User session ends and Login page is displayed | ⬜ Not Executed |
| TC-UI-005 | Registration | Register with Existing Email | High | Negative | Registered email already exists | 1. Open Signup/Login<br>2. Enter name<br>3. Enter an existing email<br>4. Select Signup | Existing-email validation message is displayed | ⬜ Not Executed |
| TC-UI-006 | Contact | Submit Contact Form | Medium | Positive | Contact page is available | 1. Open Contact Us<br>2. Enter contact details<br>3. Upload a file<br>4. Submit the form<br>5. Confirm submission | Success message is displayed | ⬜ Not Executed |
| TC-UI-007 | Products | View Products and Product Details | High | Positive | Product catalogue is available | 1. Open Products<br>2. Verify product list<br>3. Open a product<br>4. Review product information | Product list and selected product details are displayed | ⬜ Not Executed |
| TC-UI-008 | Search | Search Product | High | Positive | Product catalogue is available | 1. Open Products<br>2. Enter `Blue Top` in search field<br>3. Select Search<br>4. Review returned products | Search results are displayed and relate to `Blue Top` | ⬜ Not Executed |
| TC-UI-009 | Cart | Add Multiple Products to Cart | Critical | Positive | Products are available | 1. Open Products<br>2. Add the first product<br>3. Continue shopping<br>4. Add the second product<br>5. Open Cart | Both products appear with correct prices and quantities | ⬜ Not Executed |
| TC-UI-010 | Checkout | Complete Purchase and Download Invoice | Critical | End-to-End | Registered user is logged in and cart contains a product | 1. Open Cart<br>2. Proceed to checkout<br>3. Verify address<br>4. Enter payment details<br>5. Place order<br>6. Download invoice | Order is confirmed and invoice is downloaded | ⬜ Not Executed |

## API Test Cases

| ID | Module | Title | Priority | Type | Precondition | Steps | Expected Result | Actual Result |
|---|---|---|---|---|---|---|---|---|
| TC-API-001 | Products API | Get All Products | High | Positive | API service is available | 1. Send GET request to Products List endpoint<br>2. Inspect response status<br>3. Validate response body | Successful response contains a non-empty products list | ⬜ Not Executed |
| TC-API-002 | Products API | Reject Unsupported POST Request | Medium | Negative | API service is available | 1. Send POST request to Products List endpoint<br>2. Inspect response | API rejects the unsupported request method with the documented response | ⬜ Not Executed |
| TC-API-003 | Brands API | Get All Brands | High | Positive | API service is available | 1. Send GET request to Brands List endpoint<br>2. Inspect response status<br>3. Validate response body | Successful response contains a non-empty brands list | ⬜ Not Executed |
| TC-API-004 | Search API | Search for Existing Product | High | Positive | Product data is available | 1. Send POST request<br>2. Provide `search_product` value<br>3. Validate returned products | Response contains products matching the search term | ⬜ Not Executed |
| TC-API-005 | Search API | Search without Required Parameter | High | Negative | Search API is available | 1. Send POST request without `search_product`<br>2. Inspect response | Bad-request response identifies the missing parameter | ⬜ Not Executed |
| TC-API-006 | Authentication API | Verify Login with Invalid Credentials | High | Negative | Authentication API is available | 1. Send POST request with invalid credentials<br>2. Inspect response | User-not-found response is returned | ⬜ Not Executed |
| TC-API-007 | Account API | Complete User CRUD Lifecycle | Critical | End-to-End API | Unique user data is available | 1. Create user account<br>2. Retrieve account details<br>3. Update account<br>4. Verify updated details<br>5. Delete account | Create, read, update and delete operations complete successfully | ⬜ Not Executed |

## Hybrid Test Case

| ID | Module | Title | Priority | Type | Precondition | Steps | Expected Result | Actual Result |
|---|---|---|---|---|---|---|---|---|
| TC-HYB-001 | Account Lifecycle | Create through API, Login through UI, Delete through API | Critical | Hybrid | Unique user data is available | 1. Create account through API<br>2. Open Login page<br>3. Login through UI<br>4. Verify logged-in user<br>5. Delete account through API | Account works through the UI and is removed successfully through the API | ⬜ Not Executed |

## Accessibility Test Cases

| ID | Module | Title | Priority | Type | Precondition | Steps | Expected Result | Actual Result |
|---|---|---|---|---|---|---|---|---|
| TC-A11Y-001 | Home Page | Axe Accessibility Scan | High | Accessibility | Home page is available and Axe is configured | 1. Open Home page<br>2. Wait for main content<br>3. Run Axe scan<br>4. Review violations | No serious or critical accessibility violations are detected | ⬜ Not Executed |
| TC-A11Y-002 | Products Page | Axe Accessibility Scan | High | Accessibility | Products page is available and Axe is configured | 1. Open Products page<br>2. Wait for product catalogue<br>3. Run Axe scan<br>4. Review violations | No serious or critical accessibility violations are detected | ⬜ Not Executed |

## Actual Result Legend

| Value | Meaning |
|---|---|
| ⬜ Not Executed | Test has not been executed |
| ✅ Pass | Actual result matches the expected result |
| ❌ Fail | Actual result does not match the expected result |
| 🚫 Blocked | Test cannot be executed because of a blocker |