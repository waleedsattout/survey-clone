// DOM elements
const form = document.getElementById("form");
const tabs = document.getElementById("tabs");
const textElement = document.getElementById("text");
const progressBarFill = document.querySelector('.progress-bar-fill');
const formSections = document.querySelectorAll('.form-section');
const yearContainer = document.getElementById('yearDropdownContainer');
const occupationDropdownContainer = document.getElementById('occupationDropdownContainer');
const carContainer = document.getElementById('carDropdownContainer');
const engineContainer = document.getElementById('engineDropdownContainer');
const usageContainer = document.getElementById('usage-container');
const milesContainer = document.getElementById('miles-container');
const chevrContainer = document.getElementById('chevr-container');
const liabContainer = document.getElementById('liab-container');
const secondVehicleContainer = document.getElementById('second-vehicle-container');
const continueButton1 = document.getElementById('continueButton-1');
const continueButton2 = document.getElementById('continueButton-2');
var checkMarks = document.querySelectorAll('span[id^="check-mark"]')

let __ = 1;
let progress = 33;
let selectedYearIndex = -1;
let selectedCarIndex = -1;
let selectedEngineIndex = -1;
let selectedUsage = '';
let selectedMiles = '';
let selectedChevr = '';
let selectedLiab = '';
let selectedSaving = '';
let carsData = [];
const years = [
    2024,
    2023,
    2022,
    2021,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
    2009,
    2008,
    2007,
    2006,
    2005,
    2004,
    2003,
    2002,
    2001,
    2000,
    1999,
    1998,
    1997,
    1996,
    1995,
    1994,
    1993,
    1992,
    1991,
    1990,
    1989,
    1988,
    1987,
    1986
];

const enginesData = [
    "Avalanche",
    "Aveo",
    "C4500",
    "C5500",
    "C65",
    "C7500",
    "C8500",
    "Cobalt",
    "Colorado",
    "Corvette",
    "Equinox",
    "Express G1500",
    "Express G2500",
    "Express G3500",
    "Hhr",
    "Impala",
    "Malibu",
    "Optra",
    "Silverado",
    "Suburban",
    "T - Series",
    "Tahoe",
    "Tilt Master W35042",
    "Tilt Master W4s042",
    "Tilt Master W5s042",
    "Trailblazer",
    "Uplander"
]

occupation = [
    "Administrative Clerical",
    "Architect",
    "Business Owner",
    "Certified Public Accountant",
    "Clergy",
    "Construction Trades",
    "Consultant",
    "Dentist",
    "Disabled",
    "Engineer",
    "Financial Services",
    "Health Care",
    "Homemaker",
    "Human Relations",
    "Lawyer",
    "Marketing",
    "Manager Supervisor",
    "Military Enlisted",
    "Minor Not Applicable",
    "Other / Not Listed",
    "Other Non Technical",
    "Other Technical",
    "Physician",
    "Professional Salaried",
    "Professor",
    "Retail",
    "Retired",
    "Sales Inside",
    "Sales Outside",
    "School Teacher",
    "Scientist",
    "Self Employed",
    "Skilled Semi Skilled",
    "Transportantion / Logistics",
    "Student",
    "Unemployed"
];

unk = [
    "AL",
    "AK",
    "AR",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
]

// Tabs navigation event listener
tabs.addEventListener("click", (event) => {
    const clickedTab = event.target.closest(".tab");
    const selectedTab = clickedTab.dataset.tab;

    if (!clickedTab) return;
    if (__ < 10 && selectedTab === "Drivers") return
    else if (__ < 21 && selectedTab === "Details") return
    for (const tab of tabs.children) {
        tab.classList.remove("active");
    }
    clickedTab.classList.add("active");

    if (selectedTab === "Vehicles") {
        textElement.textContent = "Hello, Let's see how much we can save you on car insurance.";
        updateProgressBar(33);
    } else if (selectedTab === "Drivers") {
        textElement.textContent = "Ok great! Let's get a few details about you.";
        updateProgressBar(66);
    } else if (selectedTab === "Details") {
        textElement.textContent = "Almost done, just a few final details.";
        updateProgressBar(100);
    }
    showSection(selectedTab);
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const tabsContainerTop = tabs.offsetTop;
    if (scrollY >= tabsContainerTop) {
        tabs.classList.add('fixed-tabs');
        progressBarFill.parentElement.classList.add('fixed-progress');
    } else {
        tabs.classList.remove('fixed-tabs');
        progressBarFill.parentElement.classList.remove('fixed-progress');
    }
});

function showSection(sectionName) {
    formSections.forEach(section => section.style.display = 'none');
    document.querySelector(`.${sectionName}`).style.display = 'block';
}

function updateProgressBar(newProgress) {
    progress = newProgress;
    progressBarFill.style.width = `${progress}%`;
}

// Update form visibility based on the current step
function updateForm() {
    carContainer.classList.toggle('hidden', __ < 2);
    engineContainer.classList.toggle('hidden', __ < 3);
    usageContainer.classList.toggle('hidden', __ < 4);
    milesContainer.classList.toggle('hidden', __ < 5);
    chevrContainer.classList.toggle('hidden', __ < 6);
    liabContainer.classList.toggle('hidden', __ < 7);
    continueButton1.classList.toggle('hidden', __ < 8);
}

function updateDriverForm() {
    document.getElementById('step-10').classList.toggle('hidden', __ < 10);
    document.getElementById('firstname-container').classList.toggle('hidden', __ < 10);
    document.getElementById('lastname-container').classList.toggle('hidden', __ < 11);
    document.getElementById('gender-container').classList.toggle('hidden', __ < 12);
    document.getElementById('married-container').classList.toggle('hidden', __ < 13);
    document.getElementById('education-container').classList.toggle('hidden', __ < 14);
    document.getElementById('occupation-container').classList.toggle('hidden', __ < 15);
    document.getElementById('credit-container').classList.toggle('hidden', __ < 16);
    document.getElementById('license-container').classList.toggle('hidden', __ < 17);
    document.getElementById('sr-22-container').classList.toggle('hidden', __ < 18);
    document.getElementById('incidents-container').classList.toggle('hidden', __ < 19);
    document.getElementById('drive-container').classList.toggle('hidden', __ < 20);
    continueButton2.classList.toggle('hidden', __ < 21);
}


function updateDetailsForm() {
    document.getElementById('insurance-container').classList.toggle('hidden', __ < 23);
    document.getElementById('coverage-container').classList.toggle('hidden', __ < 24);
    document.getElementById('military-container').classList.toggle('hidden', __ < 25);
    document.getElementById('rent-container').classList.toggle('hidden', __ < 26);
    document.getElementById('homeType-container').classList.toggle('hidden', __ < 27);
    document.getElementById('last-container').classList.toggle('hidden', __ < 28);
    document.getElementById('sub').classList.toggle('hidden', __ < 29);
    if (__ == 29) {
        document.getElementById('final').innerText = document.getElementById('final').innerText.replace('car', carsData[selectedCarIndex].make)
        document.getElementById('final').innerText = document.getElementById('final').innerText.replace('engine', enginesData[selectedEngineIndex])
    }
}

// Continue button
continueButton1.addEventListener('click', () => {
    __ = 10;
    updateForm();
    showSection('Drivers')
    document.querySelector('.tab[data-tab="Drivers"]')
});
continueButton2.addEventListener('click', () => {
    __ = 22;
    updateForm();
    updateDriverForm();
    showSection('Details')
    document.querySelector('.tab[data-tab="Details"]')
});

// Dropdown population and selection logic
document.addEventListener('DOMContentLoaded', () => {
    updateProgressBar(33);
    textElement.textContent = "Hello, Let's see how much we can save you on car insurance.";
    populateDropdown('yearDropdown', years, selectYear);
    fetch('https://freetestapi.com/api/v1/cars')
        .then(response => response.json())
        .then(cars => {
            carsData = cars
            populateDropdown('carDropdown', cars.map(car => car.make), selectCar)
        });
    populateDropdown('engineDropdown', enginesData, selectEngine);
    populateDropdown('occupationDropdown', occupation, selectOccupation);
});

yearContainer.addEventListener('click', e => {
    toggleDropdown(yearContainer.id, 'yearArrow')
})
carContainer.addEventListener('click', e => {
    toggleDropdown(carContainer.id, 'carArrow')
})
engineContainer.addEventListener('click', e => {
    toggleDropdown(engineContainer.id, 'engineArrow')
})
occupationDropdownContainer.addEventListener('click', e => {
    toggleDropdown(occupationDropdownContainer.id, 'occupationArrow')
})

function toggleDropdown(containerId, arrowId) {
    const container = document.getElementById(containerId);
    const arrow = document.getElementById(arrowId);
    if (container.classList.contains('active')) {
        arrow.classList.add('down');
        arrow.classList.remove('up');
        container.classList.remove('active');
    } else {
        arrow.classList.remove('down');
        arrow.classList.add('up');
        container.classList.add('active');
    }
}

function populateDropdown(dropdownId, data, clickHandler) {
    const dropdown = document.getElementById(dropdownId);
    data.forEach((item, index) => {
        const div = document.createElement('div');
        div.id = index;
        div.innerHTML = item;
        div.addEventListener('click', clickHandler);
        dropdown.appendChild(div);
    });
}

function selectYear(event) {
    selectedYearIndex = +event.target.id;
    document.getElementById('yearValue').innerText = years[selectedYearIndex];
    __ = 2;
    updateForm()
}

function selectCar(event) {
    selectedCarIndex = +event.target.id;
    document.getElementById('carValue').innerText = carsData[selectedCarIndex].make;
    __ = 3
    updateForm()

}

function selectEngine(event) {
    selectedEngineIndex = +event.target.id;
    document.getElementById('engineValue').innerText = enginesData[selectedEngineIndex];
    __ = 4
    updateForm()
    checkMarks[0].classList.remove('hidden')
}

function selectOccupation(event) {
    selectedOccupationIndex = +event.target.id;
    document.getElementById('occupationValue').innerText = occupation[selectedOccupationIndex];
    __ = 16
    checkMarks[10].classList.remove('hidden');
    updateDriverForm()
}

// Event listener for First Name input
document.getElementById('firstname').addEventListener('input', function (e) {
    selectedFirstname = e.target.value;
    if (selectedFirstname.trim() !== '') {
        __ = 11;
        updateDriverForm();
    }
});

// Event listener for Last Name input
document.getElementById('lastname').addEventListener('input', function (e) {
    selectedLastname = e.target.value;
    if (selectedLastname.trim() !== '') {
        __ = 12;
        checkMarks[6].classList.remove('hidden');
        updateDriverForm();
    }
});

document.getElementById('address-container').addEventListener('input', function (e) {
    selectedAddress = e.target.value;
    if (selectedAddress.trim() !== '') {
        __ = 29;
        checkMarks[21].classList.remove('hidden');
        updateDetailsForm();
    }
});


class RadioComponent {
    constructor() {
        this.radioGroups = {}; // Object to store radio groups
    }

    addRadioButtons(containerId, name, values, callback) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        values.forEach(value => {
            const id = `${name}-${Math.random()}`;
            container.innerHTML += `
          <label>
            <input type="radio" onchange="(${callback})()" name="${name}" value="${value}" />
            ${value}
          </label>
        `;
        });

        container.classList.remove('hidden');
        // Store the radio group
        this.radioGroups[name] = containerId;
    }
}

// Initialize the radio component
const radioComponent = new RadioComponent();

// Example of adding radio groups dynamically
function addRadioGroup(containerId, name, values, callback) {
    radioComponent.addRadioButtons(containerId, name, values, callback);
}

addRadioGroup('usage', 'usage', ['Getting to Work', 'Running Errands', 'Pleasure', 'Uber / Lyft',], e => { __ = 5; checkMarks[1].classList.remove('hidden'); updateForm() });
addRadioGroup('miles', 'miles', ['5', '10', '20', '30+'], e => { __ = 6; checkMarks[2].classList.remove('hidden'); updateForm() });
addRadioGroup('chevr', 'chevr', ['Own', 'Lease', 'Finance',], e => { __ = 7; checkMarks[3].classList.remove('hidden'); updateForm() });
addRadioGroup('liab', 'liab', ['Full Coverage', 'Liability Only'], e => { __ = 8; checkMarks[4].classList.remove('hidden'); updateForm() });
addRadioGroup('saving', 'saving', ['Yes', 'No'], e => { __ = 9; checkMarks[5].classList.remove('hidden'); updateForm() });

addRadioGroup('gender', 'gender', ['Male', 'Female', 'Other'], e => { __ = 13; checkMarks[7].classList.remove('hidden'); updateDriverForm() });

addRadioGroup('married', 'married', ['Yes', 'No'], e => { __ = 14; checkMarks[8].classList.remove('hidden'); updateDriverForm() });

addRadioGroup('education', 'education', ['Less than High School', 'Some or No High School', 'High School Diploma', 'Some College', 'Associate Degree', 'Bachelors Degree', 'Masters Degree', 'Doctorate Degree'], e => { __ = 15; checkMarks[9].classList.remove('hidden'); updateDriverForm() });

addRadioGroup('credit', 'credit', ['Excellent (700-850)', 'Good (600-700)', 'Average (400-600)', 'Poor (300-400)',], e => { __ = 17; checkMarks[11].classList.remove('hidden'); updateDriverForm() });

addRadioGroup('license', 'license', ['Active', 'Permit', 'Suspended', 'Foreign', 'Expired'], e => { __ = 18; checkMarks[12].classList.remove('hidden'); updateDriverForm() });

addRadioGroup('sr-22', 'sr-22', ['Yes', 'No'], e => { __ = 19; checkMarks[13].classList.remove('hidden'); updateDriverForm() });

addRadioGroup('incidents', 'incidents', ['Yes', 'No'], e => { __ = 20; checkMarks[14].classList.remove('hidden'); updateDriverForm() });

addRadioGroup('drive', 'drive', ['Yes', 'No'], e => { __ = 21; checkMarks[15].classList.remove('hidden'); updateDriverForm() });

addRadioGroup('insurance', 'insurance', ['Yes', 'No'], e => { __ = 24; checkMarks[16].classList.remove('hidden'); updateDetailsForm() });

addRadioGroup('military', 'military', ['Yes', 'No'], e => { __ = 26; checkMarks[18].classList.remove('hidden'); updateDetailsForm() });

addRadioGroup('rent', 'rent', ['Own', 'Rent'], e => { __ = 27; checkMarks[19].classList.remove('hidden'); updateDetailsForm() });

addRadioGroup('homeType', 'homeType', ['Single Family Home', 'Multi Family Home', 'Duplex', 'Apartment', 'Townhome', 'Condo', 'Mobile Home'], e => { __ = 28; checkMarks[20].classList.remove('hidden'); updateDetailsForm() });


// Variables to hold selected values
let selectedFirstname = '';
let selectedLastname = '';
let selectedGender = '';
let selectedMarried = '';
let selectedAddress = '';
let selectedOccupationIndex = -1;

function send(e) {
    e.preventDefault();
    let formData = new FormData(form)

    fetch("http://localhost:8081/api.php", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    })
        .then(e => e.json())
        .then(e =>
            alert(e.message)
        )
        .catch(error => {
            console.error('Error:', error);
        });
    return false
}