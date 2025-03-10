const jokeEl = document.getElementById("joke");
const jokeBtn = document.querySelector(".btn");

generateJoke();

// function generateJoke() {
//     const config = {headers: { 'Accept': 'application/json' }};

//     fetch("https://icanhazdadjoke.com/", config)
//         .then(res => res.json())
//         .then((data) =>
//         jokeEl.innerHTML = data.joke);
// }

async function generateJoke()
{
    const config = { headers: { 'Accept': 'application/json' } };

    const res = await fetch("https://icanhazdadjoke.com/", config)

    const data = await res.json();

    jokeEl.textContent = data.joke;
}



jokeBtn.addEventListener("click", () => {

    generateJoke();

})
