// ==========================================
// FREELANCER PROFILE
// ==========================================

const freelancerProfiles = {

    1: {
        name: "Neha Kulkarni",
        initials: "NK",
        title: "Full Stack Developer",
        rating: 4.5,
        reviews: 2,
        experience: 3,
        projectsCount: 2,
        hourlyRate: 800,
        availability: "Available",
        location: "Pune, India",

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
    },


    2: {
        name: "Arjun Mehta",
        initials: "AM",
        title: "UI/UX Designer",
        rating: 5.0,
        reviews: 2,
        experience: 5,
        projectsCount: 2,
        hourlyRate: 1200,
        availability: "Available",
        location: "Pune, India",

        skills: [
            "Figma",
            "UI/UX Design",
            "Photoshop"
        ],

        projects: [
            {
                title: "Food Delivery UI",
                skills: ["Figma", "UI/UX Design"],
                description:
                    "Designed a modern food delivery application interface.",
                link: "#"
            },

            {
                title: "Finance Dashboard",
                skills: ["Figma", "Photoshop"],
                description:
                    "Designed a responsive finance dashboard for tracking business data.",
                link: "#"
            }
        ]
    },


    3: {
        name: "Riya Shah",
        initials: "RS",
        title: "Digital Marketing Specialist",
        rating: 4.0,
        reviews: 2,
        experience: 2,
        projectsCount: 2,
        hourlyRate: 600,
        availability: "Busy",
        location: "Pune, India",

        skills: [
            "SEO",
            "Social Media",
            "Google Ads"
        ],

        projects: [
            {
                title: "Digital Marketing Campaign",
                skills: ["Social Media", "Google Ads"],
                description:
                    "Created and managed a digital marketing campaign for an online business.",
                link: "#"
            },

            {
                title: "SEO Optimization Project",
                skills: ["SEO"],
                description:
                    "Improved website visibility through SEO optimization strategies.",
                link: "#"
            }
        ]
    }

};


// ==========================================
// GET FREELANCER ID FROM URL
// ==========================================

const urlParams =
    new URLSearchParams(window.location.search);

const freelancerId =
    urlParams.get("id");


// ==========================================
// FIND SELECTED FREELANCER
// ==========================================

const freelancer =
    freelancerProfiles[freelancerId];


// ==========================================
// CHECK PROFILE
// ==========================================

if (!freelancer) {

    alert("Freelancer profile not found.");

} else {

    // Page title
    document.title =
        `${freelancer.name} · Freelancer Hub`;


    // ======================================
    // HEADER
    // ======================================

    document.querySelector(
        ".profile-header__initials"
    ).textContent =
        freelancer.initials;


    document.querySelector(
        ".profile-header__name"
    ).textContent =
        freelancer.name;


    document.querySelector(
        ".profile-header__title"
    ).textContent =
        freelancer.title;


    document.querySelector(
        ".profile-header__rating"
    ).textContent =
        `⭐ ${freelancer.rating} / 5`;


    document.querySelector(
        ".profile-header__location"
    ).textContent =
        `📍 ${freelancer.location}`;


    const availability =
        document.querySelector(
            ".profile-header .freelancer-card__availability"
        );

    availability.textContent =
        `🟢 ${freelancer.availability}`;


    // ======================================
    // STATISTICS
    // ======================================

    const stats =
        document.querySelectorAll(
            ".stats-row .stat-card__value"
        );

    stats[0].textContent =
        freelancer.rating;

    stats[1].textContent =
        freelancer.reviews;

    stats[2].textContent =
        freelancer.experience;

    stats[3].textContent =
        freelancer.projectsCount;

    stats[4].textContent =
        `₹${freelancer.hourlyRate}`;


    // ======================================
    // ABOUT / PROFESSIONAL INFORMATION
    // ======================================

    const infoRows =
        document.querySelectorAll(
            ".about-panel .info-list__row"
        );

    if (infoRows.length >= 3) {

        infoRows[0].querySelector("dd").textContent =
            freelancer.title;

        infoRows[1].querySelector("dd").textContent =
            "Web Development";

        infoRows[2].querySelector("dd").textContent =
            `${freelancer.experience} Years`;
    }


    // ======================================
    // AVAILABILITY
    // ======================================

    document.querySelector(
        ".availability-display__label"
    ).textContent =
        `${freelancer.availability} for new projects`;


    document.querySelector(
        ".availability-panel__rate-value"
    ).textContent =
        `₹${freelancer.hourlyRate} / hour`;


    // ======================================
    // SKILLS
    // ======================================

    const skillsContainer =
        document.querySelector(
            ".skills-panel .skills-list"
        );

    skillsContainer.innerHTML = "";

    freelancer.skills.forEach(function(skill) {

        const tag =
            document.createElement("span");

        tag.className =
            "skill-tag";

        tag.textContent =
            skill;

        skillsContainer.appendChild(tag);
    });


    // ======================================
    // PORTFOLIO
    // ======================================

    const portfolioGrid =
        document.querySelector(
            ".portfolio-panel .portfolio-grid"
        );

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

            <div class="portfolio-card__preview"
                 aria-hidden="true">

                <span>💻</span>

            </div>

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
                class="btn-secondary btn-block"
                target="_blank"
                rel="noopener noreferrer"
            >
                View Project
            </a>
        `;

        portfolioGrid.appendChild(card);
    });


    // ======================================
    // CTA
    // ======================================

    document.querySelector(
        ".cta-panel__title"
    ).textContent =
        `Interested in working with ${freelancer.name}?`;

}