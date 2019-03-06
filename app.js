(function() {
    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = "lightgreen";
        } else {
          // if answer is wrong or blank
          // color the answers red
          answerContainers[questionNumber].style.color = "red";
        }
      });
  
      // show number of correct answers out of total
      //resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
      
      notaFinal = (10 / myQuestions.length) * numCorrect;
      console.log(notaFinal);

      //mostra a nota do simulado
      if (notaFinal<=2.5) {
          resultsContainer.innerHTML = notaFinal + "? O que aconteceu? A coisa tá feia! Vai ter que estudar bastante!";
        } else if (notaFinal < 7) {
            resultsContainer.innerHTML = notaFinal + ". Você chutou algumas respostas ou não sabia mesmo?";
        } else if (notaFinal < 10) {
            resultsContainer.innerHTML = notaFinal + ". Nada mal! Se estudar um pouco mais vai ficar fera!";
        } else if (notaFinal == 10) {
            resultsContainer.innerHTML = notaFinal + "! Caramba! Você deve ser um administrador de OpenPlant!";
        } else {
          resultsContainer.innerHTML = notaFinal;
      }
      //resultsContainer.innerHTML = notaFinal;

    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("nota");
    const submitButton = document.getElementById("submit");
    const myQuestions = [
      {
        question: "Qual o nome da ferramenta que verifica conectivade de linhas?",
        answers: {
          a: "Connectivity Checker",
          b: "Consistency Checker",
          c: "Isometrics Checker"
        },
        correctAnswer: "a"
      },
      {
        question: "Em qual pacote de instalação ficam os instaladores do Spec Generator e Class Editor?",
        answers: {
          a: "No mesmo pacote de instalação do OpenPlant Modeler",
          b: "No pacote de instalação do OpenPlant Project Administrator",
          c: "No pacote de instalação do OpenPlant Spec Editor"
        },
        correctAnswer: "b"
      },
      {
        question: "O que é Workspace?",
        answers: {
          a: "É o conjuntos de modulos do OpenPlant",
          b: "São as ferramentas de trabalho do OpenPlant",
          c: "São as pastas e arquivos de configuração relacionados aos projetos"
        },
        correctAnswer: "c"
      },
      {
        question: "O que são FASTENERS",
        answers: {
          a: "São aceleradores gráficos do OpenPlant para abrir modelos pesados.",
          b: "São componentes para fixar itens de tubulação. Ex: parafusos, soldas, juntas, etc.",
          c: "São acessórios "
        },
        correctAnswer: "b"
      }
    ];
  
    // display quiz right away
    buildQuiz();
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);
  })();