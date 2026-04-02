/**
 * Contact form: HTML5 + custom validation (10-digit mobile, all fields).
 */
(function () {
  "use strict";

  const form = document.getElementById("contactForm");
  if (!form) return;

  const phoneInput = document.getElementById("phone");
  const phoneFeedback = document.getElementById("phoneFeedback");

  function digitsOnly(value) {
    return String(value).replace(/\D/g, "");
  }

  function validatePhone() {
    const digits = digitsOnly(phoneInput.value);
    const ok = digits.length === 10;
    if (!ok && phoneInput.value.trim() !== "") {
      phoneInput.setCustomValidity("Enter exactly 10 digits for your mobile number.");
      phoneFeedback.textContent =
        "Mobile number must contain exactly 10 digits (numbers only).";
      phoneFeedback.classList.add("show");
      phoneInput.classList.add("is-invalid");
    } else {
      phoneInput.setCustomValidity("");
      phoneFeedback.classList.remove("show");
      phoneInput.classList.remove("is-invalid");
    }
    return ok;
  }

  phoneInput.addEventListener("input", validatePhone);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    validatePhone();
    const digits = digitsOnly(phoneInput.value);

    if (digits.length !== 10) {
      phoneInput.focus();
      form.classList.add("was-validated");
      return;
    }

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const modalEl = document.getElementById("submitSuccessModal");
    if (modalEl && typeof bootstrap !== "undefined") {
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
    form.reset();
    form.classList.remove("was-validated");
  });
})();
