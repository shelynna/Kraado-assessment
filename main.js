const apiUrl = "https://api.github.com/users";
console.log(APIURL)
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
    const responseData = await resp.json();

    createCard(responseData);
    getRepos(user);
}

function createCard(user) {
    const { avatar_url, name, bio, followers, following, public_repos } = user;
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
                        <h1>Mahima</h1>
                        <h6>@</h6>
                        <p>Delhi</p>
                    </div>
                </div>
                <div class="profile-btn"><button type="submit">Visit Profile</button></div>
            </section>
            <section class="sec-container">
                <div class="sec-about">
                    <h1>${name}</h1>
                    <p>${bio}</p>
                </div>
                <div class="sec-follow">
                    <div>
                        <h1>${followers}</h1>
                        <p>0</p>
                    </div>
                    <div>
                        <h1>${following}</h1>
                        <p>0</p>
                    </div>
                    <div>
                        <h1>${public_repos}</h1>
                        <p>0</p>
                    </div>
                </div>
            
            </section>
            <section id="repos" class="sec-repos">
                <h1>Repositories</h1>
                <div>
                </div>
                    
            </section>
            main.innerHTML = cardHtml;
    } else {
        main.innerHTML = "<h1>Result Not Found</h1>";
    }
}
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
            repoEl.target = "_arshad";
            repoEl.innerText = e.name;
            reposEl.appendChild(repoEl);
        });
    console.log(repoData);
}

// SEARCH USERNAME
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const userValue = search.value;

    getData(userValue);
    search.value = "";
})