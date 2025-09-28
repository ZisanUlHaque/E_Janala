const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //return promise
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data));
};

const removeActive = () =>{
    const lessonsButyons = document.querySelectorAll(".lesson-btn");
    lessonsButyons.forEach((btn)=> btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((json) =>{
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn);
        clickBtn.classList.add("active");
        displayLevelWord(json.data)
    });
    
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if(words.length == 0){
    wordContainer.innerHTML = `
    
        <div class="text-center space-y-4 col-span-full rounded-xl py-10 font-bangla">
           <img class="mx-auto" src="assets/alert-error.png" alt="">
          <p class="font-medium text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="text-3xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>`;
    return;
  }


  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-15 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="font-semibold">Meaning /Pronounciation</p>
          <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : "Meaning পাওয়া যায়নি"} / ${word.pronunciation}</div>
          <div class="flex justify-between items-center">
            <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
        `;
    wordContainer.append(wordDiv);
  });
};

const displayLesson = (lessons) => {
  // 1.get the container
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // //2. get into every lessons
  for (let lesson of lessons) {
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}"
         onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;
    levelContainer.append(btnDiv);
  }
};

loadLessons();
