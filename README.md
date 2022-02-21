# Welcome To My Movie Ticket Api

## Lunch the app:

open up a docker-compose.yml and replace the next fields with your actual data (in order to have mails sent from your mail account make sure to edit your email's access configurations):

```
    MONGO_URI: *your-mongo-uri*
    MY_EMAIL_ADDR: *your-email-address*
    MY_EMAIL_PASS: *your-email's-password*
    SECRET: *64-bit-hash-key*
```

open up a terminal:

```
    docker-compose up --build
```

open up another terminal:

```
    1. docker exec -it seed /bin/bash
    2. python main.py
    3. service cron start
    4. exit
```

## General Description:

```
    1. select a movie, time & date and click "Get Tickets"
    2. select seats as you wish, fill in the email verification form and then click "Send verification key to `my email`"
    3. enter your email account, copy your verification code and paste it in the targeted filled.
    4. Enter your payments info (demo, make sure to enter fake details but valid) and click "Complete Purchase"
    5. Your Order details will be sent be mail.
    6. in order to change seats or cancel your ticket feel free to enter "My Tickets" area with your personal order id.
    7.The movies database will update everyday with new dates and movies
    8. enjoy and feel free to note out every issue you have seen!
```

## View the app on `http://localhost:3000/`:

##### Home Page:

![Home Page](assets/homepage_movie_ticket_app.png)

##### Single Movie Page:

![Single Movie Page](assets/single_page_movie_ticket_app.png)

##### Personal Ticket Hub:

![Personal Ticket Hub](assets/single_ticket_hub_movie_ticket_app.png)

## Api Documentation:
