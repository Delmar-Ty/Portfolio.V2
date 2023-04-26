const projects = 'assets/JSON/projects.json';
const storageName = 'projects';
let dataExists = (sessionStorage[storageName])? true: false;
let evnt = new Event('init');


//Function to fetch json data
async function getProjects(resource) {
    try {
        let response = await fetch(resource);
        let data = await response.json();
        return data;
    } catch (err) {
        console.error(err, 'Something went wrong when trying to fetch the data');
    }
}

//Function to save json data to session storage
function saveData(data) {
    sessionStorage.setItem(storageName, JSON.stringify(data));
    dataExists = true;
}

//Function to update the content with projects on the my work page
function update() {
    let data = JSON.parse(sessionStorage[storageName]);
    let grid = document.querySelector('.projects-container');
    let elements = [];
    for (const index in data) {
        let html = `
            <a href="${data[index].github}" class="project-item" style="--img: url(${data[index].thumbnail}); --content: '${data[index].name}';" target="_blank" data-id="${index}" onmouseover="thing(this)"></a>
        `;
        elements.push(html);
    }
    grid.innerHTML = elements.join('');
}

//Listen for the custom event to ensure that data has been processed correctly
document.addEventListener('init', function() {
    update();
});

//Function to check whether the json data already exists in the session storage
function initData() {
    if (!dataExists) {
        getProjects(projects)
            .then(data => {
                saveData(data);
                document.dispatchEvent(evnt);
            })
            .catch(err => console.error(err));
    } else {
        document.dispatchEvent(evnt);
    }
}

initData();

//Function to display message when a project is hoevered over
function thing(element) {
    console.log(element.getAttribute('data-id'));
}