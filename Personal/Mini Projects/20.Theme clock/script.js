const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const toggle = document.querySelector(".toggle");
const html = document.querySelector("html");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


toggle.addEventListener("click", (e) => {
    if (html.classList.contains("dark"))
    {
        html.classList.remove("dark");
        e.target.innerHTML = `Dark mode`;
    }
    else
    {
        html.classList.add("dark");
        e.target.innerHTML = `Light mode`;
    }

 });



function setTime() {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hours = time.getHours();
    const hoursForclock = hours % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hourEl.style.transform = `translate(-50%,-100%) rotate(${ hoursForclock * 30 }deg)`;
    minuteEl.style.transform = `translate(-50%,-100%) rotate(${ minutes * 6 }deg)`;
    secondEl.style.transform = `translate(-50%,-100%) rotate(${ seconds * 6 }deg)`;

    timeEl.innerHTML = `${hoursForclock}:${
        minutes < 10 ? `0${ minutes }` : minutes } ${ ampm }`

    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class = "circle">${date}</span>`
}


setTime();

setInterval(setTime, 1000);
