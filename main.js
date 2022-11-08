const apiUrl = "https://api.github.com/users/";
// console.log(APIURL)
const form = document.getElementById("form");
const search = document.getElementById("esearch");
const main = document.querySelector("main");

async function getRepos(userName) {
    const response = await fetch(apiUrl + userName + "/repos");
    const responseData = await response.json();
    if (responseData.message == "Not Found") {
        main.innerHTML = "<h1>Not Found.Make sure you search fornthe right username.</h1>";
    }
    addRepostoCrad(responseData);
}

async function getData(user) {
    const response = await fetch(apiUrl + user);
    const responseData = await response.json();

    createCard(responseData);
    getRepos(user);
}

function createCard(user) {
    console.log(user);
    const { avatar_url, name, bio, followers, following, public_repos, location, login } = user;
    if (user.name !== null) {
        const containerHtml =
            `
            <div class="wrapper">
            <section class="profile">
                <div class="img-about">
                    <div>
                    <img id="sec-img"  src="${avatar_url}" alt="${name}" class="avatar border-2-yellow">
                    </div>
                    <div class="text-green">
                        <h1>${name}</h1>
                        <h6>@${login}</h6>
                        <p><i class="fa-regular fa-location-dot"></i>${location}</p>
                    </div>
                </div>
                <div class="profile-btn"><a href="https://github.com/${login}">Visit Profile</a></div>
            </section>
            <section class="sec-container">
                <div class="sec-about">
                    <h1>About</h1>
                    <p>${bio}</p>
                </div>
                <div class="sec-follow">
                    <div>
                        <h1>Followers</h1>
                        <p>${followers}</p>
                    </div>
                    <div>
                        <h1>Following</h1>
                        <p>${following}</p>
                    </div>
                    <div>
                        <h1>Repos</h1>
                        <p>${public_repos}</p>
                    </div>
                </div>
            
            </section>
            <section id="repos" class="sec-repos">
                <h1>Repositories</h1>
                <div>
                </div>
                    
            </section>
        </div>
`

        main.innerHTML = containerHtml;
    } else {
        main.innerHTML = "<h1>Result Not Found</h1>";
    }
}

function addRepostoCrad(repoData) {
    const reposEl = document.getElementById("repos");
    repoData.sort((a, b) =>
        b.stargazers_count - a.stargazers_count
    ).slice(0, 10)
        .forEach(e => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");
            repoEl.href = e.html_url;
            repoEl.target = "_shelynna";
            repoEl.innerText = e.name;
            reposEl.appendChild(repoEl);
        });
    console.log(repoData);
}

// SEARCH USERNAME
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const userValue = search.value;
    console.log(userValue);

    getData(userValue);
    search.value = "";
})