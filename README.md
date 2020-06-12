# article-details-assignment

This assignment basically covers the followign features:-
- Create User his own account (user registrating).
- User registration page has few validations but fulfilling them able to register user successfully.
- User can login by using his credentials (User Login).
- Login page has few validations but fulfilling them able to login successfully.

- If User Not Login:-
    - At Home screen (without login) user able to see global feeds (articles) and tag list.
    - On click perticular tag should render one tab along with global feed for that perticular tag which shows article related to that tab.
    - user able to see added tags and faviourate count along with user image, user name, title, description and read more field.
    - on click user image and user name should render to user profile page.
    - where user can see "My Article" and "Favorite Article" tabs.
    - which have respectivally data over there.
    - on click user image, user name, description and read more section should navigate to article detail page.
    - where on header user info displays and below that user able to show added comments.

    - If user is not login then he can not perform any kind of action like:
        - user not able mark favorite or unfavorite any article.
        - user can not able to add new article and he also not able to edit or delte previous added articles.
        - user not able add/delete comments as well.

- If User Log In:-
    - After login at home screen user able to see two tab YOUR FEEDS and GLOBAL FEEDS.
    - New post link present in header at where user can create new article.
    - On publish article from new post page user should navigate to article detail page.
    - Article which he added recently.
    - where on header along with user information two button displays that are : "Edit Article" and "Delete Article".
        - On click Edit Article user should navigate to Add post page where all field displays with pre filled values.
        - At where he can update his added article and on publish again redirect to article detail page.
        - On click delete button article is deleted and user should navigate to home page.
    - These two buttons along with user image and user nave displays in the page body above the comment section as well.

    - comment section also persent on the same page as well:
        - we can publish our own comment over here.
        - we can add multiple comments.
        - we can delete our previous added comment over here by clicking delete button.
        # Note: Edit Comment functionality is not present in the reference application and Edit comment API is not presented in the given API Doc. So I was not implement that functionality for now.
        - we able to delete all added comment in one go.

    - user able mark favorite or unfavorite any article by click the count button present in the section.
    - On click perticular tag should render one tab along with global feed for that perticular tag which shows article related to that tab.
    - user able to see added tags and faviourate count along with user image, user name, title, description and read more field.
    - on click user image and user name should render to user profile page.
    - where user can see "My Article" and "Favorite Article" tabs.
    - which have respectivally data over there.
    - on click user image, user name, description and read more section should navigate to article detail page.
    - where on header user info displays and below that user able to show added comments.

    # Note: If any article that can be published by perticular user then there are Edit Article and Delete Article page renders, if any article not save by logged in user he is not able to see Edit Article and Delete Article instead of that user able to see Follow and favorite/unfavorite article button on the page.

# Note: The basically aim to develop this application to Regisete user, see global feed and local feeds and feeds render according to selected tag, user should able to add/edit/delete article, should able to add/delete comments, should able to mark favorite/unfavorite articls as well.

### Tech

- [React 16.13.1]
- [axios 0.19.2]
- [redux 4.0.5]
- [typescript 3.9.3]

### Installation

You can directly access application from deployed instance:
Path: 

Take clone from

```
$ git clone https://github.com/Abhishekjsh/article-details-assignment
```

Install the dependencies.

```
$ cd article-details-assignment
$ npm install
$ npm start
Open http://localhost:3000 in browser
```