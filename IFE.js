var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var rec = new SpeechRecognition();
rec.lang = 'en-US';
rec.interimResults = false;
rec.maxAlternatives = 1;

//**********BEGIN RECORDING**********
function voice() {
   document.getElementById("no-butt").style.display = "none";
   document.getElementById("yes-butt").style.display = "none";
   rec.start();
   VoiceVar = 1;
}

//**********STOP RECORDING**********
rec.onspeechend = function() {
   rec.stop();
}

//**********POST INTO MESSAGE TEXTBOX**********
rec.onresult = function(event) {
   var a = event.results.length - 1;
   var phrases = event.results[a][0].transcript;

   var temp = phrases.split(" ");

   //If you spoke after clicking on voice button, it will appear in textbox
   if (temp.length != 0) {
      document.getElementById("message").value = phrases;
   } 
}

//**********POTENTIAL FAIL**********
rec.onnomatch = function(event) {
   range.textContent = "No word received";
}
