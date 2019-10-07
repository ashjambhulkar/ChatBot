$(document).ready(function() {
    var you = "Me";
    botSays("Hi how may i help you today ?")
});

function getUrlVars() 
{
	var vars = {};
	var parts = window.location.href.replace(/[?#&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
	});
	return vars;
}

function textHitEnter(ele) 
{
    if(event.key === 'Enter') {
        answer(document.getElementsByTagName('input')[0].value);    
    }
}
var id_token = getUrlVars()["id_token"];
console.log('id_token: ' + id_token);

AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:9f8c6f91-716d-4f9d-9683-1e91b7f512e6',
    Logins: {
        'cognito-idp.us-east-1.amazonaws.com/us-east-1_8ggOPx3UY': id_token
    }
});
var apigClient;
AWS.config.credentials.refresh(function(){
    var accessKeyId = AWS.config.credentials.accessKeyId;
    var secretAccessKey = AWS.config.credentials.secretAccessKey;
    var sessionToken = AWS.config.credentials.sessionToken;
    AWS.config.region = 'us-east-1';
    apigClient = apigClientFactory.newClient({
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken, // this field was missing
        region: 'us-east-1'
    });
});

function answer(x) 
{
    var you = "Me";    
    var Hello = ["HI", "HEY", "HOWDY", "HEYA", "HOLA", "HELLO", "SUP", "KONNICHIWA", "ALOHA"]
    var Goodbye = ["BYE", "SEE YA", "CYA", "LATER", "ADIOS", "SAYONARA", "SEEYA"]
    var Greeting = ["WHAT'S UP", "HOW'S IT GOING", "HOW ARE YOU", "NICE DAY", "GOOD MORNING", "GOOD NIGHT"]
    var Name = ["WHAT IS YOUR NAME", "WHAT'S YOUR NAME", "WHO ARE YOU", "WHAT DO THEY CALL YOU", "COMO TE LLAMAS"]
    var Actions = ["HELP", "DRINK", "CHALLENGE"]
    var Questions = ["QUESTION", "QUIZ", "CODE", "ANSWER", "HTML", "CSS", "JAVASCRIPT"];
    var Else = true;
    var reactions = [BotHello, BotGoodbye, BotGreeting];
    var BotHello = ["HI", "HEY", "HOWDY", "HEYA", "HOLA", "HELLO", "SUP", "KONNICHIWA", "ALOHA"]
    var BotGoodbye = ["BYE", "SEE YA", "CYA", "LATER", "ADIOS", "SAYONARA", "SEEYA"]
    var BotGreeting = ["WHAT'S UP", "HOW'S IT GOING", "HOW ARE YOU", "NICE TO SEE YOU", "GOOD MORNING", "WELCOME"]
    var BotPleasant = ["Thanks.", "Good job.", "Cool.", "I see.", "Anyway.", "right-o."]
    var botOut = botChat.value;
    var ans;
    document.getElementsByTagName("textarea")[0] = botChat
    document.getElementsByTagName("input")[0].value = ""

    question = x.toUpperCase()
    if (question === "" || null) {
        setTimeout(function() {
            botSays("\nBot : What? You shy?");
            botChat.scrollTop = botChat.scrollHeight;
        }, 600);
        return;
    } else if (Hello.includes(question)) {
        printUserMsg(x);
        callAws("Hi");
        botChat.scrollTop = botChat.scrollHeight;
        return;
    } else if (Goodbye.includes(question)) {
        printUserMsg(x);
        callAws("BYE");
        botChat.scrollTop = botChat.scrollHeight;
        return;
    } else if (Greeting.includes(question)) {
        printUserMsg(x);
        callAws("NICE DAY");
        botChat.scrollTop = botChat.scrollHeight;
        return;
    } else if (Name.includes(question)) {
        printUserMsg(x);
        callAws("WHO ARE YOU");
        botChat.scrollTop = botChat.scrollHeight;
        return;
    } else {
        printUserMsg(x);
        callAws(x);
        botChat.scrollTop = botChat.scrollHeight;
        return;
    }
}

function botSays(x) {
    document.getElementsByTagName("textarea")[0].innerHTML += ('\nBot : ' + x);
}

function printUserMsg(x) {
    document.getElementsByTagName("textarea")[0].innerHTML += ('\nMe : ' + x);
}

function youSay(x) {
    botSays("\n" + you + " \ : " + x)
}

function youDo(x) {
    botSays("\n" + you + " " + x)
}



function callAws(x) 
{
    talking = true;
    let params = {};
    let additionalParams = {
        headers: {
            "x-api-key" : 'r9C1YSEkFv8YBkHaBtUaW8cf5mnreaeF7pbgZm7G',
        }
    };
    var body = {
        "message" : x
    }
    apigClient.chatbotPost(params, body, additionalParams)
        .then(function(result) {
            // Add success callback code here.
            x = result.data.body;
            botSays(x + "\n");
            document.getElementsByTagName("textarea")[0].scrollTop = textarea.scrollHeight;
            console.log(result);
        }).catch(function(result) {
            // Add error callback code here.
            console.log(result)
        });
}

function enterButton(e, x) 
{
    if (e.keyCode == 13) 
    {
        answer(x);
    }
}

function setCharAt(str, index, chr) 
{
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}