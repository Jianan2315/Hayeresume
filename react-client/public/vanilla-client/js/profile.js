window.addEventListener("message", function (event) {
    if (event.origin !== window.location.origin) return;
    if (event.data === 'resumesReady') {
        const resumesString = localStorage.getItem('resumes');
        if (resumesString) {
            loadResumes(JSON.parse(resumesString));
        } else {
            console.log("Invalid resume data from localStorage.");
        }
    }
});

window.addEventListener("load", function () {
    const resumesString = localStorage.getItem('resumes');
    if (resumesString) {
        loadResumes(JSON.parse(resumesString));
    }
});

let resumesLoaded = false;
const loadResumes = (resumes) => {
    if (resumesLoaded) return;
    resumesLoaded = true;
    const resumesContainer = document.querySelector('.resumes');
    const blankThumbnail = document.querySelector('.thumbnail.blank');
    blankThumbnail.addEventListener('click', () => {
        window.location.href = 'templateSelect.html';
    });

    resumes.forEach((resume) => {
        const resumeData = resume.json;
        const templateId = resume.templateId;
        const thumbnail = resume.thumbnail;
        const id = resume._id;

        const newThumbnail = document.createElement('div');
        newThumbnail.className = 'thumbnail';
        const newImage = document.createElement('img');
        newImage.src = thumbnail;

        newImage.addEventListener('click', function () {
            localStorage.setItem(id, resumeData);
            window.parent.postMessage(
                { templateId, id },
                window.location.origin
            );
        });

        newThumbnail.appendChild(newImage);
        resumesContainer.insertBefore(newThumbnail, blankThumbnail);
    });
};
