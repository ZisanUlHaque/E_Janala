const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all") //return promise
    .then(res => res.json()) //promise of json data
    .then((json)  => displayLesson(json.data))
}
const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    
    fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML ="";

    words.forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML=`
        `;
        wordContainer.append(wordDiv);
    });

};

const displayLesson = (lessons) => {

    // 1.get the container
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML ="";

    // //2. get into every lessons
    for(let lesson of lessons){
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;
        levelContainer.append(btnDiv);
    }
};

loadLessons();
