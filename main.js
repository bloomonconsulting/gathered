/* Gathered in Community - mobile nav */
(function () {
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();

/* Email signup: sends the address to a Google Sheet through a Google Apps Script web app */
(function () {
  var form = document.getElementById("signup-form");
  if (!form) return;
  var input = document.getElementById("signup-email");
  var status = document.getElementById("signup-status");
  var button = form.querySelector("button");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = input.value.trim();
    if (!input.checkValidity() || !email) {
      status.textContent = "Please enter a valid email address.";
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }
    input.removeAttribute("aria-invalid");
    var endpoint = form.getAttribute("data-endpoint");
    if (!endpoint || endpoint.indexOf("http") !== 0) {
      status.textContent = "Sign up isn't connected yet. Please email gatheredincommunity@gmail.com.";
      return;
    }
    button.disabled = true;
    status.textContent = "Signing you up...";
    var body = new URLSearchParams({ email: email, page: location.pathname });
    fetch(endpoint, { method: "POST", mode: "no-cors", body: body })
      .then(function () {
        status.textContent = "Thank you! You're on the list.";
        form.reset();
      })
      .catch(function () {
        status.textContent = "Something went wrong. Please try again, or email gatheredincommunity@gmail.com.";
      })
      .then(function () { button.disabled = false; });
  });
})();
