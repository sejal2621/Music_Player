let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let myProgressBar = document.getElementById("myProgressBar");

let songs = [
  { songName: "Falling For You", filePath: "songs/1.mp3", coverPath: "cover/1.jpeg"},
  { songName: "We Are", filePath: "songs/2.mp3", coverPath: "cover/2.jpeg" },
  { songName: "Zero", filePath: "songs/3.mp3", coverPath: "cover/3.jpeg" },
  { songName: "Carnival", filePath: "songs/4.mp3", coverPath: "cover/4.jpeg" },
  { songName: "With You", filePath: "songs/5.mp3", coverPath: "cover/5.jpg" },
  { songName: "Jhol", filePath: "songs/6.mp3", coverPath: "cover/6.jpeg" },
  { songName: "Tum Ho Toh", filePath: "songs/7.mp3", coverPath: "cover/7.jpeg" },
  { songName: "Pehli Si Mohabbat", filePath: "songs/8.mp3", coverPath: "cover/8.jpg" },
  { songName: "Maand ", filePath: "songs/9.mp3", coverPath: "cover/9.jpeg" },
  { songName: "Chaahat", filePath: "songs/10.mp3", coverPath: "cover/10.jpg" }
];

// Populate song items with data
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Toggle play/pause when clicking the master play button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    updateSongItemPlayButton(songIndex, true);
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    updateSongItemPlayButton(songIndex, false);
  }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
  if (!isNaN(audioElement.duration)) {
    let progress = Math.floor(
      (audioElement.currentTime / audioElement.duration) * 100
    );
    myProgressBar.value = progress;
  }
});

// Seek functionality
myProgressBar.addEventListener("input", () => {
  if (!isNaN(audioElement.duration)) {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
  }
});

// Function to reset all play buttons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.classList.add("fa-circle-play");
    element.classList.remove("fa-circle-pause");
  });
};

// Function to update the play button of a song
const updateSongItemPlayButton = (index, isPlaying) => {
  let songButtons = document.getElementsByClassName("songItemPlay");
  makeAllPlays(); // Reset all buttons first
  if (isPlaying) {
    songButtons[index].classList.remove("fa-circle-play");
    songButtons[index].classList.add("fa-circle-pause");
  }
};

// Handling play button clicks for each song
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
  element.addEventListener("click", (e) => {
    if (songIndex === i && !audioElement.paused) {
      // If the same song is clicked again, toggle pause
      audioElement.pause();
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-circle-play");
      gif.style.opacity = 0;
      updateSongItemPlayButton(i, false);
    } else {
      // Otherwise, play new song
      songIndex = i;
      audioElement.src = songs[songIndex].filePath;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-pause-circle");
      updateSongItemPlayButton(songIndex, true);
    }
  });
});

// Handling next button
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length; // Loop back to first song if at the end
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;
  updateSongItemPlayButton(songIndex, true);
});

// Handling previous button
document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length; // Loop back to last song if at first
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;
  updateSongItemPlayButton(songIndex, true);
});

// Automatically switch to next song when current song ends
audioElement.addEventListener("ended", () => {
  document.getElementById("next").click();
});
