'use strict';

var questions = [
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/cafe.mp3" />' : [
        "coffee",
        "caffè"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/biscotto.mp3" />' : [
        "cookies and cream",
        "biscotto"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/bacio.mp3" />' : [
        "hazelnut and milk chocolate",
        "bacio"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/arachidi.mp3" />' : [
        "peanut butter",
        "arachidi"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/vaniglia.mp3" />' : [
        "vanilla",
        "vaníglia"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/stracciatella.mp3" />' : [
        "chocolate chip",
        "stracciatella"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/nocciola.mp3" />' : [
        "hazelnut",
        "nocciola"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/cioccolato-dark.mp3" />' : [
        "chocolate",
        "cioccolato"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/limone.mp3" />' : [
        "lemon",
        "limone"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/cioccolato.mp3" />' : [
        "milk chocolate",
        "cioccolato al latte"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/pistacchio.mp3" />' : [
        "pistachio",
        "pistacchio"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/amarena.mp3" />' : [
        "black cherry",
        "amarena"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/malaga.mp3" />' : [
        "rum raisin",
        "malaga"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/tiramisu.mp3" />' : [
        "tiramisu",
        "tiramisù"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/frutti.mp3" />': [
        "mixed berries",
        "fruitti di bosco"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/pera.mp3" />' : [
        "pear",
        "pera"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/mela.mp3" />' : [
        "apple",
        "mela"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/fragola.mp3" />' : [
        "strawberry",
        "fragola"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/anguria.mp3" />' : [
        "watermelon",
        "anguria"
        ]
    },
    {
        '<audio src = "https://s3.amazonaws.com/two-scoops/pesca.mp3" />' : [
        "peach and champagne",
        "pesca champagne"
        ]
    },
    // {
    //     '<audio src = "https://s3.amazonaws.com/two-scoops/mojito.mp3" />' : [
    //     "mojito",
    //     "mojito"
    //     ]
    // },
    // {
    //     '<audio src = "https://s3.amazonaws.com/two-scoops/panna.mp3" />' : [
    //     "panna cotta",
    //     "panna cotta"
    //     ]
    // },
    // {
    //     '<audio src = "https://s3.amazonaws.com/two-scoops/baileys.mp3" />' : [
    //     "baileys",
    //     "Baileys"
    //     ]
    // },
    // {
    //     '<audio src = "https://s3.amazonaws.com/two-scoops/guinness.mp3" />' : [
    //     "guinness",
    //     "Guinness"
    //     ]
    // },
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
//         context.fail("Invalid Application ID");
//      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        if (!session.attributes) {
            getWelcomeResponse(callback);
        } else { 
            handleGetHelpRequest(intent, session, callback);
        }
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
       // throw "Invalid intent";
       console.log("Throwing invalid intent at this point");
     getWelcomeResponse(callback);
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 1;
var GAME_LENGTH = 5;
var CARD_TITLE = "Order Like a Pro"; // Be sure to change this for your skill.
var CARD_TEXT = "Let's learn to recognize our favorite gelato flavors in Italian.";
var currentQuestionText = "";

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
         speechOutput = "Hi there, I will ask you about " + GAME_LENGTH.toString()
            +  " Italian flavors, and you can say the english name. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]),
        repromptText = spokenQuestion,

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += ""
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0],
        "currentQuestionText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][1],
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, CARD_TEXT, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp ) {
        var speechOutput = "Translate this italian flavor " + speechOutput;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;
            currentQuestionText = session.attributes.currentQuestionText;

        var speechOutputAnalysis = "";
        var currentQuestionCorrect = false;
        var CARD_TEXT = currentQuestionText + " / " + correctAnswerText;

        if (answerSlotValid && intent.slots.Answer.value == correctAnswerText) {
       // if (answerSlotValid && intent.slots.Answer.value.toUpperCase() == correctAnswerText.toUpperCase()) {
            currentScore++;
            currentQuestionCorrect = true;

            //speechOutputAnalysis = "correct. ";
            switch (currentScore) {
                case 5: speechOutputAnalysis = "Genius. "
                break;
                case 4: speechOutputAnalysis = "Outstanding. "
                break;
                case 3: speechOutputAnalysis = "Bravo. "
                break;
                case 2: speechOutputAnalysis = "Great. "
                break;
                case 1: speechOutputAnalysis = "Good. "
                break;
            }
            
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "The correct answer is " + correctAnswerText + ". ";
            }
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {

            //vary responses based on score
            switch (currentScore) {
                case 5: 
                    speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                    + GAME_LENGTH.toString() + " questions correct. Thanks for playing . Ciao! ";
                    break;
                case 4:
                    speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                    + GAME_LENGTH.toString() + " questions correct. Thanks for playing . Ciao! ";
                    break;
                case 3:
                    speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                    + GAME_LENGTH.toString() + " questions correct. Thanks for playing . Ciao! ";
                    break;
                case 2:
                    speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                    + GAME_LENGTH.toString() + " questions correct. Thanks for playing . Ciao! ";
                    break;
                case 1:
                    speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                    + GAME_LENGTH.toString() + " questions correct. Review the flavors you missed in your Alexa App and try again . Ciao! ";
                    break;
                case 0:
                     speechOutput += speechOutputAnalysis + "Oh dear . You got " + currentScore.toString() + " out of "
                    + GAME_LENGTH.toString() + " questions correct. Study the card in your Alexa App and try again . Ciao! ";
                    break;
            }
            if(currentQuestionCorrect) { //hide card
                callback(sessionAttributes,
                    buildSpeechletResponseWithoutCard(speechOutput, " ", true)
                    );
            } else {//show card
                callback(sessionAttributes,
                    buildSpeechletResponse(currentQuestionText, CARD_TEXT, speechOutput, " ", true)
                    );
            }
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]);
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),
                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText =  spokenQuestion;
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText +=  ""
            }
            //speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0],
                "currentQuestionText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][1]
            };
            if(currentQuestionCorrect) { //hide card
                callback(sessionAttributes,
                    buildSpeechletResponseWithoutCard(speechOutput, repromptText, false)
                    );
            } else {//show card
                callback(sessionAttributes,
                    buildSpeechletResponse(currentQuestionText, CARD_TEXT, speechOutput, repromptText, false)
                    );
            }
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

     var speechOutput = "I will say the name of a gelato flavor in italian, and you will identify the same flavor in english. "
        + "For example, If the flavor is <audio src = \"https://s3.amazonaws.com/two-scoops/fragola.mp3\" />, you would say strawberry. To start a new game at any time, say, start new game. "
        + "To repeat the last flavor, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer, respond with the correct flavor in english. "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Thanks for playing. Ciao!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return 1;
}

// ------- Helper functions to build responses -------

function buildSpeechletResponse(title, cardText, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: '<speak>' + output + '</speak>'
        },
        card: {
            type: "Simple",
            title: title,
            content: cardText
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
                ssml: '<speak>' + repromptText + '</speak>'
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: '<speak>' + output + '</speak>'
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
                ssml: '<speak>' + repromptText + '</speak>'
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}