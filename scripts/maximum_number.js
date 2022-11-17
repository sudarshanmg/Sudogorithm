import anime from "../node_modules/animejs/lib/anime.es.js";

const inputValue = document.querySelectorAll("input");

const submitBtn = document.querySelector("#submit");

const varValue = document.querySelectorAll(".blocks var");

const blocks = document.querySelectorAll(".blocks");

const findBtn = document.querySelector("#find");

const restartBtn = document.querySelector("#restart");

const maxVar = document.querySelector(".max var");


// Maps the input values to the blocks
function mapValue() {
  let blockVal = {};
  for (let i = 0; i < 5; i++) {
    blockVal[i] = +inputValue[i].value;
    varValue[i].textContent = blockVal[i];
  }
}


// Timer function
const setTimer = (duration) => {
  const promise = new Promise((res, rej) => {
    setTimeout(() =>res(), duration);
  });

  return promise;
};

// Visualizer for finding largest value in the array
async function findMax() {
  let max = +varValue[0].textContent;
  let prevMax = max;
  findBtn.style.display = 'none';
  for (let i = 0; i < 5; i++) {
    if (max < +varValue[i].textContent) {
      prevMax = max;
      max = +varValue[i].textContent;
    }
    await setTimer(1000);
    maxVar.textContent = max;
    anime({
      targets: blocks[i],
      translateX: 100,
      delay: 100,
      direction: "alternate",
    });
    if(i != 4) {  
      console.log(max)
      anime({
        targets: '.max',
        translateY: '+=90',
        delay: 100,
        endDelay: 100,
      });
    }
  }

  anime({
    targets: '.max',
    delay: 1000,
    endDelay: 100,
    background: "#a3e789",
    scale: 3,
    borderRadius: ['35%', '50%'],
    translateX: -50,
    translateY: 128
  });

  restartBtn.style.display = 'block'

  

}

// Submit button's
submitBtn.addEventListener("click", mapValue);


// Find button's
findBtn.addEventListener("click", findMax);

// Restart button's
restartBtn.addEventListener("click", () => {
  location.reload();
})



