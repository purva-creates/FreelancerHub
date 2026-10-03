const searchForm = document.querySelector(".search-bar");
const searchInput = document.querySelector(".search-bar__input");

const freelancers = [
    {
        name: "Neha Kulkarni",
        title: "Full Stack Developer",
        skills: ["Java", "React", "MySQL"],
        experience: 3,
        hourlyRate: 800,
        availability: "Available"
    },
    {
        name: "Arjun Mehta",
        title: "UI/UX Designer",
        skills: ["Figma", "UI/UX Design", "Photoshop"],
        experience: 5,
        hourlyRate: 1200,
        availability: "Available"
    },
    {
        name: "Riya Shah",
        title: "Digital Marketing Specialist",
        skills: ["SEO", "Social Media", "Google Ads"],
        experience: 2,
        hourlyRate: 600,
        availability: "Busy"
    }
];

function displayFreelancers(results) {
    console.log("displayFreelancers called with:", results);

    freelancerResults.innerHTML = "";

    if (results.length === 0) {
        freelancerResults.innerHTML = `
            <div class="no-results">
                <h3>No freelancers found</h3>
                <p>Try searching for another skill or domain.</p>
            </div>
        `;
        return;
    }

    results.forEach(function(freelancer) {
        const card = document.createElement("article");
        console.log("Card created:", card);

        card.className = "freelancer-card";

        card.innerHTML = `
            <div class="freelancer-card__head">
                <div class="freelancer-card__avatar">
                    ${freelancer.name
                        .split(" ")
                        .map(function(word) {
                            return word[0];
                        })
                        .join("")}
                </div>

                <div>
                    <h3 class="freelancer-card__name">${freelancer.name}</h3>
                    <p class="freelancer-card__title">${freelancer.title}</p>
                </div>
            </div>

            <div class="freelancer-card__meta">
                <span class="freelancer-card__availability">
                    ${freelancer.availability}
                </span>
            </div>

            <div class="freelancer-card__skills">
                ${freelancer.skills.map(function(skill) {
                    return `<span class="skill-tag">${skill}</span>`;
                }).join("")}
            </div>

            <div class="freelancer-card__footer">
                <span class="freelancer-card__exp">
                    ${freelancer.experience} Years Experience
                </span>

                <span class="freelancer-card__rate">
                    ₹${freelancer.hourlyRate}/hr
                </span>
            </div>

            <div class="freelancer-card__actions">
                <a href="freelancer-profile.html" class="btn-secondary btn-block">View Profile</a>
                <a href="#" class="btn-primary btn-block">Message</a>
            </div>
        `;

        freelancerResults.appendChild(card);

        console.log("Card appended to grid:", freelancerResults);
    });
}

const freelancerResults = document.querySelector(".freelancer-grid");

console.log("Freelancer grid:", freelancerResults);

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    console.log("Freelancers data:", freelancers);
console.log("Searching for:", query);



    const results = freelancers.filter(function(freelancer) {
        const matchesName = freelancer.name.toLowerCase().includes(query);
        const matchesTitle = freelancer.title.toLowerCase().includes(query);
        const matchesSkill = freelancer.skills.some(function(skill) {
            return skill.toLowerCase().includes(query);
        });

        return matchesName || matchesTitle || matchesSkill;
    });

    console.log("Matching freelancers:", results);

    displayFreelancers(results);
});


