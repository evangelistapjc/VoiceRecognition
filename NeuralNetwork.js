alert("Train your AI IFE Chatbot by talking via Voice Recognition. If you are satisfied with your answer, please respond by clicking either yes or no!");

window.addEventListener('load', function() {
    //**********VARIABLES**********

    var chatResponse = ["Hello.", "I'm doing fine. Thank you for asking!", "I am your In-Flight Entertainment System Voice Recognition Assistant.", 
    "What music would you like to listen to on the IFE?", "What movie would you like to play on the IFE?", "I'll pull up the food menu for you now.", 
    "What do you need assistance with?", "Sure. Let me go ahead and notify the flight attendant...", "The bathroom is located in the middle and back of the aircraft.", 
    "Would you like to adjust your seat higher or lower?", "Sure. Now adjusting your seat higher.", "Sure. Now lowering your seat.", "You're very welcome."];

    var yes = document.getElementById("yes-butt");
    var no = document.getElementById("no-butt");
    var AIResponse = document.getElementById("correct");
    var subAnswer = document.getElementById("submit-butt");
    var message = document.getElementById("message");
    var send = document.getElementById("send");
    var buffer = 0;
    var message_temp;
    var div_temp;
    var div_counter = 0;

    //**********MACHINE LEARNING**********

    //Initialize Machine learning and necessary variables
    var net = new brain.NeuralNetwork();
    var trainingResponses = [];
    var length = 0;
    var lengthLeft = 0;
    var newAns;
    var uniqueResponses = 14;

    //**********POTENTIAL USER MESSAGES**********
    //Hi
    trainingResponses.push({ input: [1,0,0,0,1,1,1,1,0,0,1,0,0,0], output: {[1]: 1} });
    //How are you?
    trainingResponses.push({ input: [1,0,0,0,1,1,1,1,0,0,1,1,1,0,1,0,1,0,1,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1], output: {[2]: 1} });
    //What is your name?
    trainingResponses.push({ input: [1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,1,0,0,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1], output: {[3]: 1} });
    //Play music
    trainingResponses.push({ input: [1,0,0,1,1,1,1,1,0,0,1,0,1,1,1,0,0,0,0,0,0,1,0,1,1,0,0,0,1,0,0,1,1,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0], output: {[4]: 1} });
    //Play a movie
    trainingResponses.push({ input: [1,0,0,1,1,1,1,1,0,0,1,0,1,1,1,0,0,0,0,0,0,1,0,1,1,0,0,0,1,0,0,1,0,1,1,1,0,0,1,1,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,1,1,0,0,1,0,0,0,1,0,0,0,1,0,0], output: {[5]: 1} });
    //What food is on the menu?
    trainingResponses.push({ input: [1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,0,0,1,0,1,1,1,0,1,0,0,1,1,1,0,0,0,1,0,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,0,0,0,0,1,1,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,0,1,1,1,0,1,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,0,0,1,1,0,1,1,0,1,0,1,0,0], output: {[6]: 1} });
    //I want to order some food
    trainingResponses.push({ input: [1,0,0,1,0,0,0,1,0,1,0,1,1,0,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0,1,0,0,1,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,0,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,0,0,1,0,1,0,0,0,1,1,0,1,0,0,1,0,1,0,0,1,1,1,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,0,0,0,0,1,1], output: {[6]: 1} });
    //I would like to order some food
    trainingResponses.push({ input: [1,0,0,1,0,0,0,1,0,1,0,1,1,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,0,0,1,0,1,1,1,0,0,0,0,1,1,1,0,0,1,0,1,1,1,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,0,0,1,0,0,1,0,1,0,0,1,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,0,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,0,0,1,0,1,0,0,0,1,1,0,1,0,0,1,0,1,0,0,1,1,1,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,0,0,0,0,1,1], output: {[6]: 1} });
    //I need some help
    trainingResponses.push({ input: [1,0,0,1,0,0,0,1,0,0,1,1,0,1,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,1,1,0,1,0,0,1,0,1,0,0,1,1,1,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,0,1,0,1,1,1,0,0,1,1,1,1], output: {[7]: 1} });
    //I need some assistance
    trainingResponses.push({ input: [1,0,0,1,0,0,0,1,0,0,1,1,0,1,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,1,1,0,1,0,0,1,0,1,0,0,1,1,1,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,0,0,0,1,0,1,0,0,0,1,0,0], output: {[7]: 1} });
    //I want to see the flight attendant
    trainingResponses.push({ input: [1,0,0,1,0,0,0,1,0,1,0,1,1,0,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0,1,0,0,1,1,1,0,0,1,1,1,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,0,0,1,0,1,1,0,0,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,1,1,0,1,0,0,0,1,1,1,1,0,1,0,0,1,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,1,0,0,1,1,1,0,0,0,1,0,0,1,0,0,1,1,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,1], output: {[8]: 1} });
    //I want the flight attendant
    trainingResponses.push({ input: [1,0,0,1,0,0,0,1,0,1,0,1,1,0,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,0,0,1,0,1,1,0,0,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,1,1,0,1,0,0,0,1,1,1,1,0,1,0,0,1,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,1,0,0,1,1,1,0,0,0,1,0,0,1,0,0,1,1,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,1], output: {[8]: 1} });
    //Where is the bathroom
    trainingResponses.push({ input: [1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,0,1,0,0,0,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,0,0,1,1,0,0], output: {[9]: 1} });
    //Can I adjust my seat
    trainingResponses.push({ input: [1,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,1,0,0,1,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,1,1,0,0,1,1,0,0,1,0,1,1,0,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,0,1,1], output: {[10]: 1} });
    //Adjust my seat higher
    trainingResponses.push({ input: [1,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,1,0,0,1,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,1,1,0,0,1,1,0,0,1,0,1,1,0,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,0,0,1,0,0,0,1,0,0,0,1,1,0,1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,1,0,0,0,1], output: {[11]: 1} });
    //Adjust my seat lower
    trainingResponses.push({ input: [1,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,1,0,0,1,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,1,1,0,0,1,1,0,0,1,0,1,1,0,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,0,1,1,1,0,1,0,1,0,1,1,0,1,0,0,0,1,0,0,1,0,1,0,0,0,1], output: {[12]: 1} });
    //Thank you
    trainingResponses.push({ input: [1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,0,1,0,1,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0], output: {[13]: 1} });

    //User Responses - Fill user input array with zeros for correct length
    for ( i = 0; i < trainingResponses.length; i++) {
        if (trainingResponses[i].input.length > length) {
            length = trainingResponses[i].input.length;
        }
    }

    for ( i = 0; i < trainingResponses.length; i++) {
        if (trainingResponses[i].input.length < length) {
            lengthLeft = length - trainingResponses[i].input.length;
            zeroArray = Array(lengthLeft).fill(0);
            trainingResponses[i].input = trainingResponses[i].input.concat(zeroArray);
        }
    }

    // AI - Training
    net.train(trainingResponses, {
        log: false,
        logPeriod: 10,
        errorThresh: 0.0005,
    });

    //**********EVENTS FOR BUTTONS**********

    //Submit Button - Sends to chatbot message screen
    send.addEventListener("click", function() {
        if (message.value != "" && VoiceVar == 1) {
            chatBubble("me", message.value);
            
            var temp = binaryConversion(message.value);
            var ans = brain.likely(temp, net);

            var i = 1;
            while (i <= chatResponse.length) {
                if (ans == i) {
                    buffer = i;

                    setTimeout( function() {
                        chatBubble("ai", chatResponse[buffer - 1]);
                        yes.style.display = "inline";
                        no.style.display = "inline";
                    }, 1000);
                }
                i++;
            }
            value = 0;
            VoiceVar = 0;
        } else {
            chatBubble("ai", "Please click on the \"Voice\" button first!");
        }
        message_temp = message.value;
        message.value = "";
    });

    //Yes Button - Says AI response was good
    yes.addEventListener("click", function() {
        alert("Nice! Thank you!");
        no.style.display = "none";
        yes.style.display = "none";
    })

    //No Button - Shows the Reinforcement Area, then highlights AI's incorrect response
    no.addEventListener("click", function() {
        alert("Please fill in the textbox under the \"Reinforcement Area\".");
        AIResponse.style.display = "inline";
        subAnswer.style.display = "inline";
        no.style.display = "none";
        yes.style.display = "none";

        if (div_temp.id == "div" + (div_counter - 1)) {
            div_temp.style.background = "red";
        }
    })

    //Correct Answer Button - Pushes correct response to the chatResponses, and records the corresponding message that the User sent
    subAnswer.addEventListener("click", function() {
        chatResponse.push(AIResponse.value);
        newAns = binaryConversion(message_temp);
        trainingResponses.push({ input: newAns, output: {[uniqueResponses]: 1} });
        uniqueResponses = uniqueResponses + 1;
        net = new brain.NeuralNetwork();

        net.train(trainingResponses, {
            log: false,
            logPeriod: 10,
            errorThresh: 0.0005,
        });

        alert("Thank you for a better chatbot response!");

        AIResponse.style.display = "none";
        subAnswer.style.display = "none";
        AIResponse.value = "";
    })

    //**********OTHER FUNCTIONS**********

    //Creates Bubble texts in chatbot messages
    function chatBubble(color, text) {
        var newMessage = document.createElement("div");
        
        if (color == "me") {
            newMessage.style.float = "right";
            newMessage.style.background = "green";
        } else {
            newMessage.style.left = "left";
            newMessage.style.background = "orange";
        }

        newMessage.id = "div" + div_counter;
        newMessage.innerHTML = text;
        newMessage.style.display = "inline-block";
        newMessage.style.width = "70%";
        newMessage.style.height = "fit-content";
        newMessage.style.marginBottom = "10px";
        newMessage.style.borderRadius = "15px";
        newMessage.style.padding = "10px 10px 10px 10px"
        newMessage.style.wordWrap = "break-word";
        newMessage.style.fontFamily = "Calibri, Roboto, sans-serif";
        newMessage.style.border = "1px solid black";
        newMessage.style.color = "white";
        document.getElementById("Chat_messages_print").appendChild(newMessage);

        if (div_counter%2 == 1) {
            div_temp = newMessage;
        }
        div_counter = div_counter + 1;        
    }

	//Convert all letters to uppercase, then convert to binary
    function binaryConversion(t) {
		t = t.toUpperCase();
		var responses = [];
	
		for (i = 0; i < t.length; i++) {
			if ( t[i]=="A"){
				responses = responses.concat([1,0,0,0,0,0,0]);
			} else if (t[i]=="B"){
				responses = responses.concat([1,0,0,0,0,0,1]);
			} else if (t[i]=="C"){
				responses = responses.concat([1,0,0,0,0,1,0]);
			} else if (t[i]=="D"){
				responses = responses.concat([1,0,0,0,0,1,1]);
			} else if (t[i]=="E"){
				responses = responses.concat([1,0,0,0,1,0,0]);
			} else if (t[i]=="F"){
				responses = responses.concat([1,0,0,0,1,0,1]);
			} else if (t[i]=="G"){
				responses = responses.concat([1,0,0,0,1,1,0]);
			} else if (t[i]=="H"){
				responses = responses.concat([1,0,0,0,1,1,1]);
			} else if (t[i]=="I"){
				responses = responses.concat([1,0,0,1,0,0,0]);
			} else if (t[i]=="J"){
				responses = responses.concat([1,0,0,1,0,0,1]);
			} else if (t[i]=="K"){
				responses = responses.concat([1,0,0,1,0,1,0]);
			} else if (t[i]=="L"){
				responses = responses.concat([1,0,0,1,0,1,1]);
			} else if (t[i]=="M"){
				responses = responses.concat([1,0,0,1,1,0,0]);
			} else if (t[i]=="N"){
				responses = responses.concat([1,0,0,1,1,0,1]);
			} else if (t[i]=="O"){
				responses = responses.concat([1,0,0,1,1,1,0]);
			} else if (t[i]=="P"){
				responses = responses.concat([1,0,0,1,1,1,1]);
			} else if (t[i]=="Q"){
				responses = responses.concat([1,0,1,0,0,0,0]);
			} else if (t[i]=="R"){
				responses = responses.concat([1,0,1,0,0,0,1]);
			} else if (t[i]=="S"){
				responses = responses.concat([1,0,1,0,0,1,0]);
			} else if (t[i]=="T"){
				responses = responses.concat([1,0,1,0,0,1,1]);
			} else if (t[i]=="U"){
				responses = responses.concat([1,0,1,0,1,0,0]);
			} else if (t[i]=="V"){
				responses = responses.concat([1,0,1,0,1,0,1]);
			} else if (t[i]=="W"){
				responses = responses.concat([1,0,1,0,1,1,0]);
			} else if (t[i]=="X"){
				responses = responses.concat([1,0,1,0,1,1,1]);
			} else if (t[i]=="Y"){
				responses = responses.concat([1,0,1,1,0,0,0]);
			} else if (t[i]=="Z"){
				responses = responses.concat([1,0,1,1,0,0,1]);
			} else if (t[i]=="?"){
				responses = responses.concat([1,1,1,1,1,1,1]);
			}
		}

		//User Responses - Fill user input array with zeros for correct length
		if (responses.length < length) {
			lengthLeft = length - responses.length;
			zeroArray = Array(lengthLeft).fill(0);
			responses = responses.concat(zeroArray);
		}
	return responses;
	}
});
