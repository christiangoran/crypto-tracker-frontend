# CryptoTracker Frontend

![CryptoTracker Screenshot](path/to/screenshot.png)

CryptoTracker is an innovative web application designed to monitor and analyze the cryptocurrency market. This project is the culmination of efforts to utilize React and modern web development practices to provide real-time data and interactive features for both novice and seasoned cryptocurrency enthusiasts.

---

## Table of Contents

- [Overview](#overview)
- [User Experience (UX)](#user-experience-ux)
  - [Strategy](#strategy)
  - [Scope](#scope)
  - [Structure](#structure)
  - [Skeleton](#skeleton)
  - [Surface](#surface)
    - [Design](#design)
    - [Interaction Design](#interaction-design)
- [Agile Methodology](#agile-methodology)
- [Features](#features)
  - [Implemented Features](#implemented-features)
  - [Future Enhancements](#future-enhancements)
- [Responsive Design](#responsive-design)
- [Technologies Used](#technologies-used)
- [Validation](#validation)
  - [CSS](#css)
  - [Html](#html)
  - [Lighthouse](#lighthouse)
  - [ESLint](#eslint-validation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)
  - [Content and Media](#content-and-media)
  - [Acknowledgements](#acknowledgements)

---

## Overview

CryptoTracker provides a centralized platform for tracking cryptocurrency performance. The application is built with React.js for seamless user interaction and state management, integrated with backend services for up-to-date cryptocurrency data.

_Live Demo: [CryptoTracker Live](#)_

## UX

This site was created according to the Five Planes Of Website Design.

### Strategy

**User Stories:**

| EPIC                              | ID  | User Story                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Project Inception**             |     |                                                                                                                                                                                                                                                                                                                                                                             |
| _Base Setup_                      | 1.1 | As a developer, I need to create the base setup and structure so that other pages can reuse the layout. Acceptance Criteria: The base layout should be consistent across different pages.                                                                                                                                                                                   |
|                                   | 1.2 | As a developer, I need to create static resources so that images, CSS, and JavaScript work on the website. Acceptance Criteria: All static resources must load without errors.                                                                                                                                                                                              |
|                                   | 1.3 | As a site user, I can see a navigation menu so that I can easily navigate through the site. Acceptance Criteria: The navigation menu must be functional and present on all pages.                                                                                                                                                                                           |
|                                   | 1.4 | As a site user, I can see the footer throughout the entire site. Acceptance Criteria: Footer is visible throughout the entire site, and social media links are clickable and open in a new tab.                                                                                                                                                                             |
| **User Account Management**       |     |                                                                                                                                                                                                                                                                                                                                                                             |
| _Registration and Authentication_ | 2.1 | As a new visitor, I want to sign up for a new account so that I can access registered user features. Acceptance Criteria: A "Sign Up" button is present on the navbar. Upon successful registration, the user is logged in automatically.                                                                                                                                   |
|                                   | 2.2 | As a returning user, I want to log in to my account so that I can access my personalized settings and community features. Acceptance Criteria: A "Log In" button is present on the main page. Upon successful login, the user is redirected to their personalized dashboard.                                                                                                |
|                                   | 2.3 | As a user, my username is visible on the navbar as a clear indication of my authentication status. Acceptance Criteria: Upon successful login, the username of the authenticated user is visible on the right side of the navbar.                                                                                                                                           |
| **Landing Page Display**          |     |                                                                                                                                                                                                                                                                                                                                                                             |
| _Crypto Market Overview_          | 3.1 | As a visitor, I want to see the top 10 cryptocurrencies on the landing page so that I can quickly understand the most valuable currencies. Acceptance Criteria: The landing page displays a list of the top 10 cryptocurrencies sorted by market cap in descending order.                                                                                                   |
|                                   | 3.2 | As a user, I want to click on a "read more" button to view more information about a range of cryptocurrencies so that I can explore beyond the top 10. Acceptance Criteria: A "read more" button is visible below the top 10 list. Clicking the button redirects to the "cryptocurrencies" subpage.                                                                         |
|                                   | 3.3 | As a user, I want to see additional information about the functions of the page to make it more attractive to sign up for all features. Acceptance Criteria: Additional information section further down on the landing page.                                                                                                                                               |
| **Cryptocurrency Details**        |     |                                                                                                                                                                                                                                                                                                                                                                             |
| _Crypto Information_              | 4.1 | As a user, I want to click on a cryptocurrency to see detailed price data, charts, and information about the currency so that I can make informed decisions. Acceptance Criteria: Clicking on a cryptocurrency name or symbol takes the user to a detailed page for that specific currency.                                                                                 |
| **User Interaction**              |     |                                                                                                                                                                                                                                                                                                                                                                             |
| _User Preferences_                | 5.1 | As a registered user, I want to "like" cryptocurrencies of my choice so that I can personalize my experience and keep track of specific currencies. Acceptance Criteria: A "like" button or icon is present next to each cryptocurrency. Clicking the "like" button highlights it, indicating the cryptocurrency has been added to the user's favorites.                    |
|                                   | 5.2 | As a registered user, I want to "dislike" cryptocurrencies of my choice so that I can personalize my experience and remove specific currencies from my dashboard. Acceptance Criteria: Clicking the highlighted "like" button removes the highlight, indicating the cryptocurrency has been removed from the user's favorites.                                              |
| **Community Engagement**          |     |                                                                                                                                                                                                                                                                                                                                                                             |
| _User Comments_                   | 6.1 | As a registered user, I want to post comments on each specific cryptocurrency's page so that I can share my insights and opinions with the community. Acceptance Criteria: A comment input field or form is present on each cryptocurrency's detailed page. After submitting a comment, it appears in the comment section.                                                  |
|                                   | 6.2 | As a user (registered or not), I want to read comments on a cryptocurrency's page so that I can understand the community's perspective on that cryptocurrency. Acceptance Criteria: All comments related to a cryptocurrency are displayed in a designated comment section on its detailed page.                                                                            |
| _Comment Management_              | 6.3 | As a registered user, I want to edit my comments on a cryptocurrency's page so that I can correct or update my insights. Acceptance Criteria: Next to my comments, there's an "edit" button or icon. Clicking the "edit" option allows me to modify the content of my comment.                                                                                              |
|                                   | 6.4 | As a registered user, I want to delete my comments on a cryptocurrency's page so that I can remove opinions or information I no longer want to share. Acceptance Criteria: Next to my comments, there's a "delete" button or icon. Clicking the "delete" option prompts a confirmation message to ensure accidental deletions are minimized.                                |
|                                   | 6.5 | As an admin user, I want to read, edit, and delete any user's comments on a cryptocurrency's page so that I can moderate and maintain the quality of community discussions. Acceptance Criteria: As an admin, I have the ability to edit and delete any comment. Regular users do not have these admin privileges and can only edit or delete their own comments.           |
| **User Profile Management**       |     |                                                                                                                                                                                                                                                                                                                                                                             |
| _Profile Customization_           | 7.1 | As a registered user, I want to update my profile details (name, info, profile picture) so that I can share more relevant information about myself with the community. Acceptance Criteria: A "Profile" section is accessible from the user's dashboard. The user can update their name, bio, and upload a profile picture.                                                 |
|                                   | 7.2 | As a registered user, I want a personal landing page showing my liked cryptocurrencies and the median price development of my portfolio so that I can easily monitor my interests. Acceptance Criteria: The user's dashboard displays a list of their liked cryptocurrencies and a chart or graph showing the median price development of these cryptocurrencies over time. |
| **User Feedback**                 |     |                                                                                                                                                                                                                                                                                                                                                                             |
| _Registration Feedback_           | 8.1 | As a user, I want to receive feedback when I try to register with an email that's already in use so that I know I might already have an account. Acceptance Criteria: When attempting to register with an existing email, a clear and concise error message is displayed.                                                                                                   |
| _Login Feedback_                  | 8.2 | As a user, I want to be informed if my login credentials are incorrect so that I can re-enter them or reset my password. Acceptance Criteria: If the entered password doesn't match the associated email, an error message is displayed.                                                                                                                                    |
| _Comment Posting Feedback_        | 8.3 | As a user, I want feedback when my comment fails to post so that I can try again or report the issue. Acceptance Criteria: If there's an error while posting a comment, a clear error message is displayed.                                                                                                                                                                 |
| _Empty Comment Alert_             | 8.4 | As a user, I want to be alerted if I try to submit an empty comment so that I can provide content before posting. Acceptance Criteria: If the comment field is empty upon submission, an error message is displayed prompting the user to enter content.                                                                                                                    |

## Project Goal and Objectives

### Project Goal:

The goal of the CryptoTracker project is to develop a highly intuitive and user-friendly web application dedicated to cryptocurrency enthusiasts. The application aims to provide a seamless and engaging user experience, offering insightful and real-time data on various cryptocurrencies. By focusing on a clean, intuitive design and user-centric features, the project seeks to evoke a positive emotional response and cater to both novice and experienced users in the crypto community.

### Project Objectives:

- **Create an Intuitive User Experience**: Design a simple and user-friendly interface that allows users to easily navigate and interact with the application, ensuring a positive user experience.
- **Instill a Professional Image**: Utilize modern design principles and high-quality content to project a professional and trustworthy image of the application, enhancing user confidence and engagement.
- **Feature-Rich and Responsive Design**: Integrate a variety of features such as real-time cryptocurrency tracking, portfolio management, community interaction, and educational resources, all within a responsive design that works seamlessly across various devices and screen sizes.
- **Enhance User Experience with Advanced Features**: Continuously update the application with advanced features like market analysis tools, customizable alerts, and integration with external crypto wallets and exchanges, to provide an enriched experience that keeps users engaged and informed.

### Scope

The scope encompasses the following:

- Development of a responsive and intuitive interface.
- Implementation of key features such as real-time tracking, user accounts, and interactive charts.
- Secure and efficient handling of user data and preferences.

## Structure

CryptoTracker is meticulously designed with a focus on user experience and is organized into several key pages, each crafted to cater to the needs of its diverse user base. The content and features available on these pages vary based on user authentication status and the specific role they hold within the platform. Below is an overview of the primary pages and their functionalities:

### Register/Login:

- These pages are dedicated to user onboarding. New users can register for an account, while existing users can log in.
- The registration process is streamlined to encourage new user sign-ups, while the login page offers a secure entry point for returning users.

### Logout:

- Implemented as a user-friendly modal dialog, this feature allows users to securely log out of their accounts, ensuring the safety and privacy of their data.

### Home:

- The Home page is the gateway to the CryptoTracker platform, accessible to all visitors.
- It showcases the latest market trends, top-performing cryptocurrencies, and recent news updates in the crypto world.
- This page also includes introductory content to guide new users, offering insights into the platform's capabilities.

### Dashboard:

- Exclusive to authenticated users, the Dashboard serves as a personal hub for tracking individual portfolios and market preferences.
- Users can customize their dashboard to display their preferred cryptocurrencies, watchlists, and portfolio performance.

### Market Overview:

- This page offers a comprehensive view of the cryptocurrency market, displaying real-time prices, market caps, trading volumes, and historical data.
- Users can explore detailed pages for each cryptocurrency, which include interactive charts, technical analysis, and community discussions.

### Community Forum:

- A space for users to engage with the broader CryptoTracker community. Here, users can participate in discussions, share insights, and seek advice on various crypto-related topics.
- Features include discussion threads, user comments, and the ability to post questions or articles.

### Settings/Profile Management:

- Authenticated users can access their profile settings to update personal information, modify security settings, and customize their experience on the platform.
- This section also allows users to manage their notifications and preferences related to market alerts and platform updates.

Each page of CryptoTracker is designed to provide a seamless and intuitive user experience, ensuring that both novice and experienced users of the cryptocurrency market find the platform informative, engaging, and easy to navigate.

### Skeleton

**Wireframes**<br>
The wireframes for mobile and desktop were created with [Balsamiq](https://balsamiq.com/) tool and can be viewed <details>

<summary>Here:</summary>
<img src="src/assets/Wireframe.png"><br>
</details><br>

**Database**<br>
The project uses ElephantSQL as PostgreSQL relational database for storing the data.<br>
This diagram was created to represent the relationships between the tables. The diagram was created before the website was developed, and it was used to identify the most relevant and useful attributes and tables. The final structure of the models in the project have been tweaked along the development of the project.

<details>
  <summary>Initial Model</summary>
<img src="src/assets/models.png" width="50%" ><br>
</details>

### Surface

#### Design

- The fonts I used for this site were imported from [Google Fonts](https://fonts.google.com/):<br>
- h1 - h6 elements: _Teko_
- paragraphs, links: _Ubuntu_

<img src="src/assets/colorcard.png" width="70%"><br>

- **Interaction Design**: Interactive elements like buttons and forms provide visual feedback to enhance the user experience.

**Page Design**<br>
The Design documents for desktop were created with [Figma](https://figma.com/) tool and can be viewed <details>

<summary>Here:</summary>
<img src="src/assets/design.png" width="30%"><br>
</details><br>

## Agile Methodology

The project was managed using an Agile approach, with progress tracked via a Kanban board. Features were developed iteratively based on user stories derived from the initial strategy discussions.

## Features

### Implemented Features

- **User Authentication**: Secure login and registration system.
- **Real-Time Data**: Live updates of cryptocurrency prices and trends.
- **Interactive Charts**: Graphs for historical data analysis.
- **User Comments**: Ability for users to discuss and share insights.

### Future Enhancements

- **Portfolio Management**: Users will be able to track the total value of their portfolio.
- **Alert System**: Notifications for significant market changes.

## Responsive Design

The application is designed to be fully responsive across all devices, ensuring accessibility and a consistent experience for all users.

**Tested devices:**

    - iPhone 11
    - iPhone 13
    - iPhone 6/7/8
    - Ipad
    - Samsung Galaxy S8
    - MacBook pro 16'' M2

## Technologies Used

- React.js
- Node.js
- Express.js
- MongoDB
- Chart.js
- Bootstrap
- React-router-dom - To create the differenct sites and connect navbar links
- Axios Library - To call our backend API
- Bootstrap sass - To work with custom colors (npm run watch-css to run the compiler)
- Jwt decoder

## Validation

### CSS

- [Jigsaw W3 Validator](https://jigsaw.w3.org/css-validator/)was used to validate the css in the project.
- Validator with no errors.
- The deployed app was passed as url input for validation

<details><summary>Jigsaw validation using url</summary>
<img src="image here">
</details>

### Html

- [WC3 Validator](https://validator.w3.org/) was used to validate the html in the project
- The deployed app was passed as url input for validation
- No errors were found
- Note : info were provided regarding standard Meta code

<details><summary>HTML validation screenshot</summary>
<img src="image here"  >
</details>
<details><summary>No error screenshot</summary>
<img src="image here" >
</details>

### Lighthouse

- [Lighthouse](https://developers.google.com/web/tools/lighthouse/) for performance, accessibility, progressive web apps, SEO analysis of the project code here are the results:

- While conducting lighthouse validation of profile edit page, username and password change page lighthouse was refreshing and testing the home page so I have not included the test results

- Note: Lighthouse results of testing the project may be inconsistent due to the functionality of user-uploaded images,Hosting project on Heroku may affected the results (server response time, caching, and network latency). Also additional external libraries reduce the response of the website. I will try improve in further projects to acheive better.

<details><summary>Enter all different pages</summary>
<img src="image link here" >

</details>

### ESLint Validation

- The JSX code was validated using the ESLint utility.
- The library was preinstalled in Codeanywhere IDE
- The code was getting validated so the errors were corrected during development process
- The library was also installed later using [ESLint website](https://eslint.org/) for final validation
- Few errors were shown which has been documented in Bug and fixes in TESTING.md
- No errors remained before final submission

<details><summary>Inbuild ESLint permission page</summary>
<img src="add screenshot"  >
</details>
<details><summary>No error screenshot</summary>
<img src="add screenshot" >
</details>

## Testing

The testing documentation can be found at [TESTING.md](TESTING.md)

## Deployment

CryptoTracker was deployed on Heroku for public access. Steps for deployment are documented for reproducibility.

### Deploying the website in Heroku

- Before deploying in Heroku following file was created:
- Procfile : Very important for deployment and must be added with capital P
- The website was deployed to Heroku using following steps:

#### Login or create an account at Heroku

- Make an account in Heroko and login

#### Creating an app

- Create new app in the top right of the screen and add an app name.
- Select region
- Then click "create app".

#### Open settings Tab

##### Click on config var

- No key or value was added as it is already connected to API

<details>
    <summary>Config Var</summary>
    <img src="src/assets/config-var.png" alt="Buildpacks screenshot">
</details>

##### Add Buildpacks

- Add python buildpack first
- Add Nodejs buildpack after that

<details>
    <summary>Buildpacks</summary>
    <img src="src/assets/buildpacks.png" alt="Buildpacks screenshot">
</details>

#### Open Deploy Tab

##### Choose deployment method

- Connect GITHUB
- Login if prompted

##### Connect to Github

- Choose repositories you want to connect
- Click "Connect"

##### Automatic and Manual deploy

- Choose a method to deploy
- After Deploy is clicked it will install various file

##### Deployment

- Project was deployed in Heroku

### Forking the GitHub Repository

1. Go to the GitHub repository
2. Click on Fork button in top right corner
3. You will then have a copy of the repository in your own GitHub account.
4. [GitHub Repository](https://github.com/christiangoran/crypto-tracker-frontend)

### Cloning the repository in GitHub

1. Visit the GitHub page of the website's repository
2. Click the “Clone” button on top of the page
3. Click on “HTTPS”
4. Click on the copy button next to the link to copy it
5. Open your IDE
6. Type `git clone <copied URL>` into the terminal

## Credits

### Content and Media

- All content was generated by me using Midjourney for image generation, After Effects and Photoshop fixing sizes and animations.
- All media used are licensed or free for commercial use.

### Acknowledgements

- Code Institute for providing a great course and support.<br>
- My mentor Gareth McGirr for great guidance and for wanting to help me more than expected of him with the problems encountered during the development of the project<br>
- Slack community for great involvement in helping each other<br>
