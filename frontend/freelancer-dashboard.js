// ==========================================
// FREELANCER DASHBOARD
// ==========================================

// Current freelancer data
let freelancer = {
    name: "Neha Kulkarni",
    title: "Full Stack Developer",
    domain: "Web Development",
    experience: 3,
    hourlyRate: 800,
    availability: "Available",

    skills: [
        "Java",
        "React",
        "MySQL"
    ],

    projects: [
        {
            title: "E-Commerce Website",
            skills: ["Java", "React", "MySQL"],
            description:
                "Developed a full-stack online shopping website using Java, React and MySQL.",
            link: "https://github.com/demo/neha-ecommerce"
        },

        {
            title: "Task Management App",
            skills: ["Java", "React", "MySQL"],
            description:
                "Built a task management application with user authentication and database integration.",
            link: "https://github.com/demo/neha-taskapp"
        }
    ]
};


// ==========================================
// SAVE DATA
// ==========================================

function saveFreelancerData() {
    localStorage.setItem(
        "freelancerData",
        JSON.stringify(freelancer)
    );
}


// ==========================================
// LOAD DATA
// ==========================================

function loadFreelancerData() {

    const savedData =
        localStorage.getItem("freelancerData");

    if (savedData) {
        freelancer = JSON.parse(savedData);
    }
}


// ==========================================
// UPDATE PROFILE DISPLAY
// ==========================================

function updateProfileDisplay() {

    const welcomeTitle =
        document.querySelector(".welcome__title");

    if (welcomeTitle) {
        welcomeTitle.textContent =
            `Welcome back, ${freelancer.name} 👋`;
    }

    const infoRows =
        document.querySelectorAll(".info-list__row");

    if (infoRows.length >= 5) {

        infoRows[0].querySelector("dd").textContent =
            freelancer.title;

        infoRows[1].querySelector("dd").textContent =
            freelancer.domain;

        infoRows[2].querySelector("dd").textContent =
            `${freelancer.experience} Years`;

        infoRows[3].querySelector("dd").textContent =
            `₹${freelancer.hourlyRate} / hour`;

        infoRows[4].querySelector("dd").textContent =
            freelancer.availability;
    }

    const availabilityLabel =
        document.querySelector(
            ".availability-display__label"
        );

    if (availabilityLabel) {
        availabilityLabel.textContent =
            freelancer.availability.toUpperCase();
    }
}


// ==========================================
// DISPLAY SKILLS
// ==========================================

function displaySkills() {

    const skillsContainer =
        document.querySelector(".skills-list");

    if (!skillsContainer) {
        return;
    }

    skillsContainer.innerHTML = "";

    freelancer.skills.forEach(function(skill) {

        const skillTag =
            document.createElement("span");

        skillTag.className = "skill-tag";

        skillTag.textContent = skill;

        skillsContainer.appendChild(skillTag);
    });

    const addSkillButton =
        document.createElement("button");

    addSkillButton.className =
        "skill-tag skill-tag--add";

    addSkillButton.type = "button";

    addSkillButton.textContent =
        "+ Add Skill";

    addSkillButton.addEventListener(
        "click",
        addSkill
    );

    skillsContainer.appendChild(addSkillButton);
}


// ==========================================
// ADD SKILL
// ==========================================

function addSkill() {

    const skill =
        prompt("Enter a new skill:");

    if (!skill) {
        return;
    }

    const cleanSkill =
        skill.trim();

    if (!cleanSkill) {
        return;
    }

    const alreadyExists =
        freelancer.skills.some(function(existingSkill) {

            return existingSkill.toLowerCase() ===
                   cleanSkill.toLowerCase();
        });

    if (alreadyExists) {

        alert("This skill already exists.");

        return;
    }

    freelancer.skills.push(cleanSkill);

    saveFreelancerData();

    displaySkills();

    alert("Skill added successfully!");
}


// ==========================================
// EDIT PROFILE
// ==========================================

function editProfile() {

    const newTitle =
        prompt(
            "Professional Title:",
            freelancer.title
        );

    if (newTitle === null) {
        return;
    }

    const newDomain =
        prompt(
            "Domain:",
            freelancer.domain
        );

    if (newDomain === null) {
        return;
    }

    const newExperience =
        prompt(
            "Years of Experience:",
            freelancer.experience
        );

    if (newExperience === null) {
        return;
    }

    const newRate =
        prompt(
            "Hourly Rate:",
            freelancer.hourlyRate
        );

    if (newRate === null) {
        return;
    }

    freelancer.title =
        newTitle.trim();

    freelancer.domain =
        newDomain.trim();

    freelancer.experience =
        Number(newExperience);

    freelancer.hourlyRate =
        Number(newRate);

    saveFreelancerData();

    updateProfileDisplay();

    alert("Profile updated successfully!");
}


// ==========================================
// ADD PROJECT
// ==========================================

function addProject() {

    const title =
        prompt("Project Title:");

    if (!title) {
        return;
    }

    const skillsInput =
        prompt(
            "Skills used (separate with commas):"
        );

    if (!skillsInput) {
        return;
    }

    const description =
        prompt("Project Description:");

    if (!description) {
        return;
    }

    const link =
        prompt(
            "Project Link (optional):"
        ) || "#";

    const project = {

        title: title.trim(),

        skills: skillsInput
            .split(",")
            .map(function(skill) {
                return skill.trim();
            })
            .filter(function(skill) {
                return skill.length > 0;
            }),

        description:
            description.trim(),

        link:
            link.trim()
    };

    freelancer.projects.push(project);

    saveFreelancerData();

    displayProjects();

    alert("Project added successfully!");
}


// ==========================================
// DISPLAY PROJECTS
// ==========================================

function displayProjects() {

    const portfolioGrid =
        document.querySelector(".portfolio-grid");

    if (!portfolioGrid) {
        return;
    }

    portfolioGrid.innerHTML = "";

    freelancer.projects.forEach(function(project) {

        const card =
            document.createElement("article");

        card.className =
            "portfolio-card";

        const skillsHTML =
            project.skills
                .map(function(skill) {

                    return `
                        <span class="skill-tag">
                            ${skill}
                        </span>
                    `;

                })
                .join("");

        card.innerHTML = `

            <h3 class="portfolio-card__title">
                ${project.title}
            </h3>

            <div class="portfolio-card__tags">
                ${skillsHTML}
            </div>

            <p class="portfolio-card__desc">
                ${project.description}
            </p>

            <a
                href="${project.link}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary btn-block"
            >
                View Project
            </a>

        `;

        portfolioGrid.appendChild(card);
    });
}


// ==========================================
// BUTTON EVENTS
// ==========================================

function setupButtons() {

    // Add Skill
    const addSkillButton =
        document.querySelector(".skill-tag--add");

    if (addSkillButton) {

        addSkillButton.addEventListener(
            "click",
            addSkill
        );
    }


    // Edit Profile
    const editProfileButton =
        document.querySelector(
            ".info-panel .btn-secondary"
        );

    if (editProfileButton) {

        editProfileButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                editProfile();
            }
        );
    }


    // Add Project
    const addProjectButton =
        document.querySelector(
            ".portfolio-panel__add"
        );

    if (addProjectButton) {

        addProjectButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                addProject();
            }
        );
    }
}


// ==========================================
// INITIALIZE DASHBOARD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadFreelancerData();

        updateProfileDisplay();

        displaySkills();

        displayProjects();

        setupButtons();

    }
);