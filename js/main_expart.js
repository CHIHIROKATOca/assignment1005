"use strict";

{
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const btn = document.getElementById("btn");
  const result = document.getElementById("result");
  const scorelabel = document.querySelector("#result-score");
  const anime = document.getElementById("anime");
  const count = document.getElementById("count");
  const goNext = document.getElementById("replay");

  const quizSet =shuffle([
    {q: '"Gohan wa nandaro na?"', c : ["I wonder what the dish is today","Would you like to play with me?","Don't you bully me?"]},
    {q: '"Omae mijyuku sugida!"' , c : ["You're too immature!","You were lose!","I can win always!"]},
    {q: '"Washi no mai wo misete yaruwa!"', c : ["I will show you my dance!","Go to hell!","Have fun! I will show you future"]},
    {q: '"Ore no tsuyosa wa tenkaichi!"' , c : ["I am strongest in the world!","You are strong!","let show me your skill more!"]},
    {q: '"Ore wa mada manzoku shite naize!"' , c : ["I'm still not satisfied","Show me what you can do! ","You are strong!"]},
]);

    let currentNum = 0;
    let isAnswered;
    let score = 0;
    let count0 = 1;

    //questionに入れるテキストは、quizSetの[]番目のq

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
      }

      function checkAnswer(li) {
        if (isAnswered) {
          return;
        }
        isAnswered = true;

        if (li.textContent === quizSet[currentNum].c[0]) {
          li.classList.add('correct');
          score++;
        } else {
          li.classList.add('wrong');
        }

        btn.classList.remove('disabled');
      }

    function setQuiz(){
        isAnswered = false;
        question.textContent = quizSet[currentNum].q;

        while(choices.firstChild){
          choices.removeChild(choices.firstChild);
        }
        //選択肢がシャッフルされる
        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        //shuffledChoices.forEach(choice)とは、
        //1・constでリストをつくるように指定。
        //その中にquizセットのc(問題)をforEachで入れる
        //2・liのテキストはchoiceを入れるように指定して(いまこの設定をしているもの)
        //3・choicesの子にliを追加する
        shuffledChoices.forEach(choice =>{
        const li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click",()=>{
            checkAnswer(li);
        });
        choices.appendChild(li);
    });

    if(currentNum === quizSet.length - 1){
      btn.textContent = "Show Score";
    }
    }

    setQuiz();

    function countNum(){
      count.textContent = `What does it mean?: 1 / ${quizSet.length}`;
    }
    countNum();

    btn.addEventListener("click", ()=>{
      function countNum(){
      if(btn.classList.contains("disabled")){
      count.textContent = `What does it mean?: ${currentNum + 1} / ${quizSet.length}`;
      }else{
        count.textContent = `What does it mean?: ${currentNum + 2} / ${quizSet.length}`;
      }
      }
      countNum();

      if(btn.classList.contains("disabled")){
        return;
      }
      btn.classList.add("disabled");

      if(currentNum === quizSet.length - 1){
        // console.log(`Score: ${score} / ${quizSet.length}`);
        scorelabel.textContent = `Score: ${score} / ${quizSet.length}`;
        result.classList.remove("hidden");
      }else{
        currentNum++;
        setQuiz();
      }

      if(score === quizSet.length){
        const perfectText = document.getElementById("perfectText");
        perfectText.textContent = "Perfect!!";

        var tmp = document.getElementsByClassName("perfect-bg") ;
        var val="perfect";
        tmp[0].setAttribute("id",val);

        var perfectBg = document.getElementById("perfect-animation");
        perfectBg.style.display;
        perfectBg.style.display = "block";

        var perfectBgColor = document.querySelector(".perfect-body-bg");
        perfectBgColor.style.backgroundColor;
        perfectBgColor.style.backgroundColor = "#ffda48";

        var normalBg = document.getElementById("normal-animation");
        var normalBgT = document.getElementById("normal-animation-tablet");
        var normalBgM = document.getElementById("normal-animation-mobile");
        normalBg.style.display;
        normalBgT.style.display;
        normalBgM.style.display;
        normalBg.style.display = "none";
        normalBgT.style.display = "none";
        normalBgM.style.display = "none";


        goNext.innerText="Congratultion! Cleared All";
        goNext.href = "index.html";
      }else{
        return;
      }

    })
    }
