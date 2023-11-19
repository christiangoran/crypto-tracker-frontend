# Crypto Tracker Project Testing Documentation

## Table of Contents

- [Manual Testing](#manual-testing)
  - [Base Setup](#base-setup)
  - [User Account Management](#user-account-management)
  - [Landing Page Display](#landing-page-display)
  - [Cryptocurrency Details](#cryptocurrency-details)
  - [User Interaction](#user-interaction)
  - [Community Engagement](#community-engagement)
  - [User Profile Management](#user-profile-management)
  - [User Feedback](#user-feedback)
- [Device Testing](#device-testing)
- [Bugs & Solutions](#bugs-and-solutions)

---

### Base Setup <a name="base-setup"></a>

#### User Story 1.1: Create base.html Page

**Goal:** Ensure a consistent layout across different pages.

**Acceptance Criteria:**

- The base layout is consistent across different pages.

**Testing Steps:**

1. Open the website.
2. Navigate through various pages to check for layout consistency.

**Outcome:** Pass

---

#### User Story 1.2: Create Static Resources

**Goal:** Ensure that images, CSS, and JavaScript work on the website.

**Acceptance Criteria:**

- All static resources load without errors.

**Testing Steps:**

1. Open the website.
2. Inspect the loading of images, CSS, and JavaScript.

**Outcome:** Pass

---

#### User Story 1.3: Navigation Menu

**Goal:** Provide easy navigation through the site.

**Acceptance Criteria:**

- The navigation menu is functional and present on all pages.

**Testing Steps:**

1. Open the website.
2. Verify the presence and functionality of the navigation menu on various pages.

**Outcome:** Pass

---

#### User Story 1.4: Footer Visibility

**Goal:** Ensure the footer is visible and social media links are functional.

**Acceptance Criteria:**

- Footer is visible on all pages.
- Social media links are clickable and open in a new tab.

**Testing Steps:**

1. Open the website.
2. Scroll to the footer and click on social media links.

**Outcome:** Pass

---

### User Account Management <a name="user-account-management"></a>

#### User Story 2.1: Sign Up for a New Account

**Goal:** Enable new visitors to sign up for new accounts.

**Acceptance Criteria:**

- "Sign Up" button is present on the navbar.
- Users are redirected to login page after successful registration

**Testing Steps:**

1. Open the website.
2. Locate and click on the "Sign Up" button.
3. Fill out the registration form and submit.

**Outcome:** Pass

---

#### User Story 2.2: User Login

**Goal:** Allow returning users to log in to their accounts.

**Acceptance Criteria:**

- "Log In" button is present on the main page.
- Users are redirected to the landing page upon successful login.

**Testing Steps:**

1. Open the website.
2. Click on the "Log In" button and enter credentials.

**Outcome:** Pass

---

#### User Story 2.3: Authentication Status Indicator

**Goal:** Visually indicate user authentication status.

**Acceptance Criteria:**

- Username is visible on the navbar after login.

**Testing Steps:**

1. Log in to the website.
2. Check for the visibility of the username on the navbar.

**Outcome:** Pass

---

### Landing Page Display <a name="landing-page-display"></a>

#### User Story 3.1: Display Top 10 Cryptocurrencies

**Goal:** Quickly inform visitors about the most valuable currencies.

**Acceptance Criteria:**

- Top 10 cryptocurrencies are displayed on the homepage.

**Testing Steps:**

1. Open the website.
2. Observe the listing of top cryptocurrencies.

**Outcome:** Pass

---

#### User Story 3.2: Explore Beyond Top 10

**Goal:** Allow users to discover more information about various cryptocurrencies.

**Acceptance Criteria:**

- "Read more" button is functional and redirects appropriately.

**Testing Steps:**

1. Locate and click on the "Read more" button.
2. Confirm redirection to the "cryptocurrencies" subpage.

**Outcome:** Pass

---

#### User Story 3.3: Additional Information for Sign Up

**Goal:** Attract users to sign up by providing additional page functions.

**Acceptance Criteria:**

- Additional features are presented in various parts of the website

**Testing Steps:**

1. Scroll through the website to find additional information.

**Outcome:** Pass

---

### Cryptocurrency Details <a name="cryptocurrency-details"></a>

#### User Story 4.1: Cryptocurrency Detailed Information

**Goal:** Provide detailed data to inform user decisions.

**Acceptance Criteria:**

- Detailed information is available upon clicking a cryptocurrency name or symbol.

**Testing Steps:**

1. Click on a cryptocurrency from the list.
2. Check for detailed information and data accuracy.

**Outcome:** Pass

---

### User Interaction <a name="user-interaction"></a>

#### User Story 5.1: "Like" Cryptocurrencies

**Goal:** Personalize user experience with a "like" feature.

**Acceptance Criteria:**

- "Like" button is functional and visually indicates a liked cryptocurrency and add it to the dashboard.

**Testing Steps:**

1. "Like" various cryptocurrencies and check for visual confirmation.

**Outcome:** Pass

---

#### User Story 5.2: "Dislike" Cryptocurrencies

**Goal:** Allow users to remove currencies from their dashboard.

**Acceptance Criteria:**

- "Dislike" functionality is present and removes currencies from favorites.

**Testing Steps:**

1. Dislike previously liked cryptocurrencies and check for removal.

**Outcome:** Pass

---

### Community Engagement <a name="community-engagement"></a>

#### User Story 6.1: Post Comments

**Goal:** Enable users to share their thoughts within the community.

**Acceptance Criteria:**

- Comments can be posted and are visible on cryptocurrency pages as well as in the Forum page.

**Testing Steps:**

1. Post comments on various cryptocurrency pages.
2. Check for the visibility and accuracy of posted comments.

**Outcome:** Pass

---

#### User Story 6.2: Read Comments

**Goal:** Provide community perspectives to all users.

**Acceptance Criteria:**

- All comments are visible on cryptocurrency detail pages.

**Testing Steps:**

1. Navigate to different cryptocurrency pages to read comments.

**Outcome:** Pass

---

#### User Story 6.3: Edit Comments

**Goal:** Allow users to update their insights.

**Acceptance Criteria:**

- "Edit" functionality is available and operational for user comments.

**Testing Steps:**

1. Edit own comments and check for updates.

**Outcome:** Pass

---

#### User Story 6.4: Delete Comments

**Goal:** Empower users to manage their shared content.

**Acceptance Criteria:**

- "Delete" functionality is available with confirmation for comment deletion.

**Testing Steps:**

1. Attempt to delete own comments and confirm action.

**Outcome:** Pass

---

#### User Story 6.5: Admin Comment Management

**Goal:** Maintain community discussion quality.

**Acceptance Criteria:**

- Admin users can edit and delete any comments.

**Testing Steps:**

1. As an admin, edit and delete user comments.

**Outcome:** Planned for future feature update

---

### User Profile Management <a name="user-profile-management"></a>

#### User Story 7.1: Update Profile Details

**Goal:** Allow users to write relevant personal information.

**Acceptance Criteria:**

- Profile customization options are available and functional.

**Testing Steps:**

1. Update profile details and check for changes.

**Outcome:** Pass

---

#### User Story 7.2: Personalized User Dashboard

**Goal:** Provide a tailored experience for tracking interests.

**Acceptance Criteria:**

- The user dashboard reflects liked cryptocurrencies and their price development.

**Testing Steps:**

1. Review the personalized dashboard for accuracy and personalization.

**Outcome:** Pass

---

### User Feedback <a name="user-feedback"></a>

#### User Story 8.1: Registration Email Feedback

**Goal:** Inform users about account creation issues.

**Acceptance Criteria:**

- Clear feedback is provided for email issues during registration.

**Testing Steps:**

1. Attempt to register with an existing email and observe feedback.

**Outcome:** Pass

---

#### User Story 8.2: Login Credential Feedback

**Goal:** Communicate login issues to users.

**Acceptance Criteria:**

- Incorrect credential usage results in informative feedback.

**Testing Steps:**

1. Enter incorrect login credentials and check for error messages.

**Outcome:** Pass

---

#### User Story 8.3: Comment Posting Feedback

**Goal:** Notify users of comment posting failures.

**Acceptance Criteria:**

- Clear error messages are displayed for failed comment submissions.

**Testing Steps:**

1. Test comment posting under various conditions and observe feedback.

**Outcome:** Pass

---

#### User Story 8.4: Empty Comment Alert

**Goal:** Prevent empty comments from being submitted.

**Acceptance Criteria:**

- Empty comment submissions prompt the user to provide content.

**Testing Steps:**

1. Attempt to submit an empty comment and check for alerts.

**Outcome:** Pass

## Device Testing

The application is designed to be fully responsive across all devices, ensuring accessibility and a consistent experience for all users.

**Tested devices:**

    - iPhone 11
    - iPhone 13
    - iPhone 6/7/8
    - Ipad
    - Samsung Galaxy S8
    - MacBook pro 16'' M2

## Bugs and Solutions

1. **Bug: Image Upload in UserProfilePage**

- Description: The UserProfilePage component had an issue with handling image uploads. The profile image was not updating correctly when a new image was selected.
  - Solution: We modified the handleChangeImage function to correctly update the profile_image state with the new file object. This ensured that the new image was properly sent to the backend on form submission, allowing the profile image to update correctly.

2. **Bug: Pagination Implementation in Currencies**

- Description: The pagination functionality in the Currencies component was not working as expected. The component did not correctly handle page changes, leading to incorrect or incomplete data being displayed.
  - Solution: We revised the pagination logic, ensuring that the getCurrencies function was correctly called with the updated page number. The setCurrentPage function was used to update the state whenever a new page number was selected, triggering a re-fetch of the data with the correct pagination parameters.

3. **Bug: Responsive Layout Issues**

- Description: The application had some responsive design issues, where certain components were not displaying correctly on smaller screens.
  -Solution: We utilized CSS media queries and Bootstrap's responsive design classes to adjust the layout and styling of components based on the screen size. This ensured a consistent and user-friendly experience across various devices.
