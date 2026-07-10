const checklist = document.querySelector("[data-checklist]");
const scrollTopButton = document.querySelector("[data-scroll-top]");
const storageKey = "gotoday-plan-checklist";

function readChecklistState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function writeChecklistState(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

if (checklist) {
  const inputs = Array.from(checklist.querySelectorAll("input[type='checkbox']"));
  const savedState = readChecklistState();

  inputs.forEach((input, index) => {
    input.checked = savedState[index] === true;
    input.addEventListener("change", () => {
      writeChecklistState(inputs.map((item) => item.checked));
    });
  });
}

if (scrollTopButton) {
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
