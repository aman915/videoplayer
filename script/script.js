


// import Plyr from 'plyr';

const controls = `
<div class="plyr__controls">
    <button type="button" class="plyr__control" data-plyr="restart" style="Position: absolute; top: 100px; left: 300px;">


        <i class="glyphicon glyphicon-euro"></i>




        <span class="plyr__tooltip" role="tooltip">Restart</span>
    </button>
    <button type="button" class="plyr__control" data-plyr="rewind">


        <i class="glyphicon glyphicon-pencil" style="color:red;"></i>


        <span class="plyr__tooltip" role="tooltip">Rewind {seektime} secs</span>
    </button>
    <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">


        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>

        
        <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
        <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
    </button>
    <button type="button" class="plyr__control" data-plyr="fast-forward">

        <i class="glyphicon glyphicon-star"></i>

        <span class="plyr__tooltip" role="tooltip">Forward {seektime} secs</span>
    </button>
    <button type="button" class="plyr__control" data-plyr="captions">
    <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-captions-on"></use></svg>
    <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-captions-off"></use></svg>
    <span class="label--pressed plyr__tooltip" role="tooltip">Disable captions</span>
    <span class="label--not-pressed plyr__tooltip" role="tooltip">Enable captions</span>
</button>
</div>
`;



const player = new Plyr('#myPlayer', {
    controls: ["play"],
    i18n: {play: "Get it going"},
    controls,
    loop : [],
    captions: { active: true, language: 'auto', update: false } 
});
player.on('play', event => {
    player.controls = ['play-large', 'play', 'volume', 'fullscreen', 'progress'];
});

//player.fullscreen.enter()


// const player = new Plyr('#myPlayer');



// player.toggleControls(false);

// player.setup({
//     controls: ["play", "volume"],
//     i18n: {play: "Get it going", volume: "Let's get loud"}
//   })

var progress = document.querySelector(".actual-progress");
var play_pause = document.getElementById("play_pause");
var play_pause_glyph = document.getElementById("play_pause_glyph");
var play_pause_glyph1 = document.getElementById("play_pause_glyph1");

var btn_back = document.getElementById("btnback");
var btn_loop_specific = document.getElementById("btnloopspecific");
var btn_loop = document.getElementById("btnloop");

var ctrls = document.querySelector(".controls");
var ctrls = document.querySelector(".controls");


var btnfastfwd = document.getElementById('btnfastfwd');

var time = document.getElementById('time-id');
time.innerHTML = "00:00";
setTimeout(function() {
    var time1 = document.getElementById('time-id1');
    var date1 = new Date(null);
    date1.setSeconds(player.duration); // specify value for SECONDS here
    var result1 = date1.toISOString().substr(11, 8);
    time1.innerHTML = result1.substring(3, result1.length);
});


function togglePlayPause() {
    // player.toggleCaptions();

    if(player.playing) {
        player.pause();
       
        // play_pause_glyph.classList.remove('glyphicon-pause');
        // play_pause_glyph.classList.add('glyphicon-play');
        play_pause_glyph1.classList.remove('glyphicon-pause');
        play_pause_glyph1.classList.add('glyphicon-play');
    }

    else {
        player.play();
        play_pause.style.display ="none";
        // play_pause_glyph.classList.add('glyphicon-pause');
        // play_pause_glyph.classList.remove('glyphicon-play');
        play_pause_glyph1.classList.add('glyphicon-pause');
        play_pause_glyph1.classList.remove('glyphicon-play');
    }


    // else if (player.paused){
    //     player.play();
    //     play_pause_glyph.classList.add('glyphicon-play');
    //     play_pause_glyph.classList.remove('glyphicon-pause');
    // }

    // else {
    //     play_pause_glyph.classList.remove('glyphicon-play');
    //     play_pause_glyph.classList.remove('glyphicon-pause');
    //     play_pause_glyph.classList.add('glyphicon-repeat');
    //     // player.restart();
    // }
}

play_pause.addEventListener("click", mySecondFunction);
var play_pause_second = document.getElementById("play_pause1");
play_pause_second.addEventListener("click", mySecondFunction);

function mySecondFunction() {
    togglePlayPause();
}

console.log('abc', player);

player.on("timeupdate", event => {
    
    var pos = player.currentTime / player.duration;
    progress.style.width = pos*100 + '%';

    var time = document.getElementById('time-id');
    var date = new Date(null);
    date.setSeconds(player.currentTime); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 8);
    time.innerHTML = result.substring(3, result.length);



    var time1 = document.getElementById('time-id1');
    var date1 = new Date(null);
    date1.setSeconds(player.duration); // specify value for SECONDS here
    var result1 = date1.toISOString().substr(11, 8);
    time1.innerHTML = result1.substring(3, result1.length);
    //console.log(pos);
});

btn_back.addEventListener("click", function() {
    player.rewind(10);
});

var btnfwd = document.getElementById("btnfwd");
btnfwd.addEventListener("click", function(e) {
    // console.log("HIIIIIIIIIIIIIII");
    player.forward(10);
});

var video, transcriptDiv;
var tracks, trackElems, tracksURLs = [];
var buttonEnglish, buttonDeutsch;

window.onload = function() {
  console.log("init");
  // when the page is loaded
  video = document.querySelector("#myPlayer");
  transcriptDiv = document.querySelector("#transcript");
  
  // The tracks as HTML elements
  trackElems = document.querySelectorAll("track");
  for(var i = 0; i < trackElems.length; i++) {
    var currentTrackElem = trackElems[i];
    tracksURLs[i] = currentTrackElem.src;
  }
  
  buttonEnglish = document.querySelector("#buttonEnglish");
//   buttonDeutsch = document.querySelector("#buttonDeutsch");
  
//   // we enable the buttons and show transcript
//   buttonEnglish.disabled = false;
//   buttonDeutsch.disabled = false;
    
  // The tracks as JS objects
  tracks = video.textTracks;
};

function loadTranscript(lang) {
  // clear current transcript
  clearTranscriptDiv();
  
  // set all track mode to disabled. We will only activate the
  // one whose content will be displayed as transcript
//   disableAllTracks();
  
  // Locate the track with language = lang
  for(var i = 0; i < tracks.length; i++) {
    // current track
    var track = tracks[i];
    var trackAsHtmlElem = trackElems[i];
  
    if((track.language === lang) && (track.kind !== "chapters")) {
      track.mode="showing";

      if(trackAsHtmlElem.readyState === 2) {
        // the track has already been loaded
        displayCues(track);
      } else {
        displayCuesAfterTrackLoaded(trackAsHtmlElem, track);
      }
      
/*      FOR FIREFOX....
        track.addEventListener("cuechange", function(e) {
           var cue = this.activeCues[0];
           console.log("cue change");
           var transcriptText = document.getElementById(cue.id);
           transcriptText.classList.add("current");
      });
      */
    }
  } 
}
  

function displayCuesAfterTrackLoaded(trackElem, track) {
  // Create a listener that will be called only when the track has
  // been loaded
  trackElem.addEventListener('load', function(e) {
      console.log("track loaded");
      displayCues(track);
   });
}
// function disableAllTracks() {
//     for(var i = 0; i < tracks.length; i++) 
//       tracks[i].mode = "disabled";
// }

function displayCues(track) {
    var cues = track.cues;
    
    //append all the subtitle texts to 
      for(var i=0, len = cues.length; i < len; i++) {
        var cue = cues[i];
        addCueListeners(cue);

        var voices = getVoices(cue.text);
        var transText="";
        if (voices.length > 0) {
            for (var j = 0; j < voices.length; j++) { // how many voices ?
                transText += voices[j].voice + ': ' + removeHTML(voices[j].text);
            }
          } else 
             transText = cue.text; // not a voice text
        var clickableTransText = "<li class='cues' id=" + cue.id +  " onclick='jumpTo(" + cue.startTime + ");'" + ">" + transText + "</li>";

        addToTranscriptDiv(clickableTransText);
      }
  }

function getVoices(speech) {  // takes a text content and check if there are voices 
  var voices = [];            // inside
  var pos = speech.indexOf('<v'); // voices are like <v michel> ....
  while (pos != -1) {
    endVoice = speech.indexOf('>');
    var voice = speech.substring(pos + 2, endVoice).trim();
    var endSpeech = speech.indexOf('</v>');
    var text = speech.substring(endVoice + 1, endSpeech);
    voices.push({
       'voice': voice,
       'text': text
    });
    speech = speech.substring(endSpeech + 4);
    pos = speech.indexOf('<v');
  }
  return voices;
}

function removeHTML(text) {
  var div = document.createElement('div');
  div.innerHTML = text;
  return div.textContent || div.innerText || '';
}
function jumpTo(time) {
  video.currentTime = time;
  video.play();
}

function clearTranscriptDiv() {
  transcriptDiv.innerHTML = "";
}

function addToTranscriptDiv(htmlText) {
  transcriptDiv.innerHTML += htmlText;
}

function addCueListeners(cue) {
  cue.onenter = function(){
    console.log('enter id=' + this.id);
    var transcriptText = document.getElementById(this.id);
    transcriptText.classList.add("current");
  };

  cue.onexit = function(){
    console.log('exit id=' + cue.id);
   var transcriptText = document.getElementById(this.id); transcriptText.classList.remove("current");
  };
}
