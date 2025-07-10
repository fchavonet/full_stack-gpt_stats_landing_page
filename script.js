/***********************************
* SYSTEM THEME ADAPTATION BEHAVIOR *
***********************************/

// Tags to which the theme class will be applied.
targetedTags = [
  "body",
  "a",
  ".mute",
  "#toggle-mode-btn",
  "#description-subtext"
];

const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const savedTheme = localStorage.getItem("theme");
const toggleModeBtn = document.getElementById("toggle-mode-btn");
const screenshot = document.getElementById("screenshot");

// Apply or remove the "dark" class on each targeted element.
function applySystemTheme(isDarkMode) {
  for (i = 0; i < targetedTags.length; i++) {
    tagName = targetedTags[i];
    elements = document.querySelectorAll(tagName);

    for (j = 0; j < elements.length; j++) {
      if (isDarkMode) {
        elements[j].classList.add("dark");
      } else {
        elements[j].classList.remove("dark");
      }
    }
  }
}

// Update UI elements according to the current theme.
function updateElements(isDarkMode) {
  toggleModeBtnIcon = toggleModeBtn.querySelector("i");

  if (isDarkMode) {
    // Dark mode.
    toggleModeBtnIcon.className = "bi bi-sun-fill";
    screenshot.src = "./assets/images/screenshot-gpt_stats-dark.webp"
  } else {
    // Light mode
    toggleModeBtnIcon.className = "bi bi-moon-stars-fill";
    screenshot.src = "./assets/images/screenshot-gpt_stats-light.webp"
  }
}

// Centralized theme application based on input string or system preference.
function applyTheme(theme) {
  if (theme === "dark") {
    applySystemTheme(true);
    updateElements(true);
  } else if (theme === "light") {
    applySystemTheme(false);
    updateElements(false);
  } else {
    applySystemTheme(systemThemeQuery.matches);
    updateElements(systemThemeQuery.matches);
  }
}

// Apply theme based on saved preference or system default.
if (savedTheme !== null && (savedTheme === "dark" || savedTheme === "light")) {
  applyTheme(savedTheme);
} else {
  applySystemTheme(systemThemeQuery.matches);
  updateElements(systemThemeQuery.matches);
}

// Listen for system theme changes if no preference is saved.
systemThemeQuery.addEventListener("change", function (event) {
  if (localStorage.getItem("theme") === null) {
    applySystemTheme(event.matches);
    updateElements(event.matches);
  }
});

// Toggle between light and dark mode when user clicks the button.
toggleModeBtn.addEventListener("click", function () {
  isCurrentlyDark = false;

  for (i = 0; i < targetedTags.length; i++) {
    tagName = targetedTags[i];
    elements = document.querySelectorAll(tagName);

    for (j = 0; j < elements.length; j++) {
      if (elements[j].classList.contains("dark")) {
        isCurrentlyDark = true;
        break;
      }
    }
    if (isCurrentlyDark) {
      break;
    }
  }

  if (isCurrentlyDark) {
    applyTheme("light");
    localStorage.setItem("theme", "light");
  } else {
    applyTheme("dark");
    localStorage.setItem("theme", "dark");
  }
});