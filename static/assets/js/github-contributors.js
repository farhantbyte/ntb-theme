document.addEventListener("DOMContentLoaded", () => {
    const contributorsSection = document.getElementById("github-contributors")
    const contributorsList = document.getElementById("contributors-list")
    
    if (!contributorsSection || !contributorsList) return

    const repo = contributorsSection.dataset.repo
    const branch = contributorsSection.dataset.branch
    const filepath = contributorsSection.dataset.filepath

    if (!repo || !filepath) {
        contributorsSection.style.display = 'none'
        return
    }

    const apiUrl = `https://api.github.com/repos/${repo}/commits?path=${filepath}`

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`خطای HTTP: ${response.status}`)
            }
            return response.json()
        })
        .then(commits => {
            const uniqueUsers = new Map()
            commits.forEach(commit => {
                if (commit.author && commit.author.login) {
                    const user = commit.author
                    if (!uniqueUsers.has(user.login)) {
                        uniqueUsers.set(user.login, {
                            login: user.login,
                            avatar_url: user.avatar_url,
                            html_url: user.html_url
                        })
                    }
                }
            })

            const contributors = Array.from(uniqueUsers.values())
            if (contributors.length === 0) {
                contributorsSection.style.display = 'none'
                return
            }

            let html = ''
            contributors.forEach(user => {
                html += `
                    <a href="${user.html_url}" 
                       target="_blank" 
                       class="contributor-item contributor-github"
                       title="${user.login}">
                        <img src="${user.avatar_url}" 
                             alt="${user.login}" 
                             class="contributor-avatar-img"
                             width="32" 
                             height="32"
                             loading="lazy">
                        <span class="contributor-name">${user.login}</span>
                    </a>
                `
            })

            contributorsList.innerHTML = html
            contributorsSection.style.display = 'block'
        })
        .catch(error => {
            console.error("خطا در دریافت مشارکت‌کنندگان:", error)
            contributorsSection.style.display = 'none'
        })
})
