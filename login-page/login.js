const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");


inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider(index) {
  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  bullets[index - 1].classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", function () {
    moveSlider(parseInt(this.dataset.value));
  });
});

let currentIndex = 1;
function autoSlide() {
  currentIndex++;
  if (currentIndex > images.length) {
    currentIndex = 1;
  }
  moveSlider(currentIndex);
}


setInterval(autoSlide, 2800); // 2200ms = 2.8 seconds

// SIGN UP
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".sign-up-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("signup fired");

    const name = document.getElementById("name-signup").value;
    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

const data = await res.json();

if (res.ok) {
  alert("Signup successful! Please sign in.");

  // automatically switch to sign in mode
  main.classList.remove("sign-up-mode");

  // clear signup form
  document.getElementById("name-signup").value = "";
  document.getElementById("email-signup").value = "";
  document.getElementById("password-signup").value = "";

} else {
  alert(data.message);
}
  });
});

// SIGN IN
document.querySelector(".sign-in-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    window.location.href = data.redirect;
  } else {
    alert(data.message);
  }
});
