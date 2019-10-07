# Dining-ChatBot
Chatting application to suggest users restaraunts after a set of Q&amp;A.

Technologies Used: 
1. Yelp-API to find restaraunts.
2. Amazon LEX for tokenizing the user input and finding answers to questions put by chatbot.
3. Amazon S3 to store the static frontend.
4. Amazon Cognito to authenticate the users.

[Dining Chatbot Demo](https://diningnearme.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=v7nle9dbles7btfrsklqq4i52&redirect_uri=https://s3.amazonaws.com/diningchatservice/index.html
)

Chatbot Architecture

![image](https://github.com/shaileshgupta94/Dining-ChatBot/blob/master/images/chatbot-design.png)

Chatbot Frontend

![image](https://github.com/shaileshgupta94/Dining-ChatBot/blob/master/images/ChatBot%20frontend.png)
