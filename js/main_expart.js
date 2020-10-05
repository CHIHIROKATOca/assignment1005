"use strict";

{
    const question = document.getElementById("question");
    const choices = document.getElementById("choices");
    const btn = document.getElementById("btn");
    const result = document.getElementById("result");
    const scorelabel = document.querySelector("#result > p");
    const anime = document.getElementById("anime");
    const count = document.getElementById("count");

    const quizSet =shuffle([
      {q: "Which quintessentially Japanese dish actually originates from Portugal?" , c : ["Tempura","Sushi","Okonomiyaki"]},
      {q: "What is the population of Japan" , c : ["126 million","89 million","50 million"]},
      {q: 'Male ninja are called "ninja", but what are they called female ninja?' , c : ["Kunoichi","Onna ninjya","Geisya"]},
      {q: 'What type of food is "Napolitan"?' , c : ["A pasta dish made by first sauteing meat and vegetables","Fried rice with ingredients","Raw fish on vinegared rice"]},
      {q: "When does Japanese say “Otsukaresama?" , c : ["When the work is done","When want to apologize","When have to go to the bathroom"]},
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
      count.textContent = `Question: 1 / ${quizSet.length}`;
    }
    countNum();

    btn.addEventListener("click", ()=>{
      function countNum(){
      if(btn.classList.contains("disabled")){
      count.textContent = `Question: ${currentNum + 1} / ${quizSet.length}`;
      }else{
        count.textContent = `Question: ${currentNum + 2} / ${quizSet.length}`;
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
       var tmp = document.getElementsByClassName("perfect-bg") ;
        var val="perfect";
        tmp[0].setAttribute("id",val);
        var tmp = document.getElementsByClassName("perfect-body-bg") ;
        var val="perfect-bg-animation";
        tmp[0].setAttribute("id",val);
        anime.classList.remove("hidden");
      }else{
        return;
      }

    })
    }
