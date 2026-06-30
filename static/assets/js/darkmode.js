document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "theme-mode"
    const themeToggle = document.getElementById("theme-toggle")
    const iconSun = document.getElementById("icon-sun")
    const iconMoon = document.getElementById("icon-moon")

    function getSavedTheme() {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) return saved
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark"
        }
        return "light"
    }

    function applyTheme(theme) {
        const body = document.body
        if (theme === "dark") {
            body.classList.add("theme-dark")
            if (iconSun) iconSun.style.display = "block"
            if (iconMoon) iconMoon.style.display = "none"
        } else {
            body.classList.remove("theme-dark")
            if (iconSun) iconSun.style.display = "none"
            if (iconMoon) iconMoon.style.display = "block"
        }
    }

    function saveTheme(theme) {
        localStorage.setItem(STORAGE_KEY, theme)
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.body.classList.contains("theme-dark") ? "dark" : "light"
            const newTheme = currentTheme === "dark" ? "light" : "dark"
            applyTheme(newTheme)
            saveTheme(newTheme)
        })
    }

    const initialTheme = getSavedTheme()
    applyTheme(initialTheme)
})
