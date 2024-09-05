import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RadioComponent } from './components/radio/radio.component';
import { InputComponent } from './components/input/input.component';
import 'mdui/components/linear-progress'
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastComponent } from './components/toast/toast.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RadioComponent, InputComponent, CommonModule, ToastComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild("tabs") tabs: any;
  @ViewChild('tabs') tabsContainer: any;
  @ViewChild('form') form: any;

  title = 'survay';
  text = "Hello, Let's see how much we can save you on car insurance."
  progress = 0.33;
  carsJson: any
  cars: any
  years = JSON.stringify([2024,
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
    1986])
  engines = JSON.stringify([
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
  ])

  occupation = JSON.stringify([
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
  ])

  unk = JSON.stringify(
    [

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
  )

  __ = 1;

  selectedYearIndex = -1;
  selectedCarIndex = -1;
  selectedEngineIndex = -1;
  selectedUsage = "";
  selectedMiles = "";
  selectedChevr = "";
  selectedLiab = "";
  selectedSaving = "";

  selectedFirstname = "";
  selectedLastname = "";
  selectedGender = "";
  selectedMarried = "";
  selectedOccupationIndex = -1;
  selectedCredit = "";
  selectedEducation = "";
  selectedLicense = "";
  selectedSr = "";
  selectedIncidents = "";
  selectedDriver = "";

  selectedInsurance = "";
  selectedCoverage = "";
  selectedMilitary = "";
  selectedRent = "";
  selectedHomeType = "";
  selectedAddress = "";
  selectedUnit = "";
  selectedCity = "";
  selectedUnk = "";
  selectedZip = "";

  done = [false, false, false]
  data = new FormData()
  names = [
    [
      "year",
      "cars",
      "engine",
      "usage",
      "miles",
      "chevr",
      "liab",
      "saving"
    ],
    [
      "firstname",
      "lastname",
      "gender",
      "married",
      "education",
      "occupation",
      "credit",
      "license",
      "sr-22",
      "incidents",
      "drive"
    ],
    [
      "insurance",
      "coverage",
      "military",
      "rent",
      "homeType",
      "address",
      "unit",
      "city",
      "unk",
      "zip"
    ]
  ]

  toasts: { message: string; type: string }[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const tabsContainerTop = this.tabsContainer.nativeElement.offsetTop;

      if (scrollY >= tabsContainerTop) {
        this.tabsContainer.nativeElement.classList.add('fixed-tabs');
        document.querySelector('mdui-linear-progress')!.classList.add('fixed-progress');
      } else {
        this.tabsContainer.nativeElement.classList.remove('fixed-tabs');
        document.querySelector('mdui-linear-progress')!.classList.remove('fixed-progress');
      }
    });

    this.http.get('https://freetestapi.com/api/v1/cars').subscribe({
      next: e => {
        this.carsJson = e
        this.cars = JSON.stringify(e)
      }
    })

  }

  switchTab(e: Event, s: string, fromButton = false) {
    let data = new FormData(this.form.nativeElement)
    Object.entries(Object.fromEntries(data.entries())).forEach(([key, value]) => {
      this.data.append(key, value);
    });

    if (s == "Vehicles") {
      this.text = "Hello, Let's see how much we can save you on car insurance."
      this.progress = 0.33;
    } else if (s == "Drivers") {
      if (!hasSameElements(Object.keys(Object.fromEntries(data.entries())), this.names[0])) {
        let d = getDifferingElements(Object.keys(Object.fromEntries(data.entries())), this.names[0])
        this.showToast("You need to check " + d.join(','), 'error');
        // return;
      }
      this.text = "Ok great! Let's get a few details about you."
      this.progress = 0.66
    } else if (s == "Details") {
      if (!hasSameElements(Object.keys(Object.fromEntries(data.entries())), this.names[1])) {
        let d = getDifferingElements(Object.keys(Object.fromEntries(data.entries())), this.names[1])
        this.showToast("You need to check " + d.join(','), 'error');
        // return;
      }
      this.text = "Almost done, Kevin Just a few final details."
      this.progress = 1
    }


    for (const element of this.tabs.nativeElement!.children) {
      element.classList.remove("active")
    }
    if (!fromButton) {
      (e.target as HTMLDivElement).classList.add("active")
    } else {
      for (let i of this.tabs.nativeElement!.children) {
        if (i.innerText.toLowerCase().includes(s.toLowerCase())) {
          i.classList.add("active")
        }
      }
    }
  }

  showToast(message: string, type: string = 'info') {
    this.toasts.push({ message, type });
    setTimeout(() => {
      this.toasts = this.toasts.filter(toast => toast !== toast);
    }, 3000);
  }

  submit() {
    this.http.post("http://localhost:8081/api", { data: JSON.stringify(Object.fromEntries(this.data.entries())) }).subscribe({
      next: (e: any) => {
        if (e.code == 200)
          this.showToast(e.message, 'success')
      },
      error: e => {
        this.showToast(e.message, 'error')
      }
    })
  }

  log(e:any){console.log(e);
  }
  
}

function hasSameElements(array1: any, array2: any) {
  const set1 = new Set(array1);
  const set2 = new Set(array2);
  return set1.size === set2.size && [...set1].every(element => set2.has(element));
}

function getDifferingElements(array1: any, array2: any): any[] {
  const set1 = new Set(array1);
  const set2 = new Set(array2);
  const differingElementsInArray1 = [...set1].filter(element => !set2.has(element));
  const differingElementsInArray2 = [...set2].filter(element => !set1.has(element));
  return [...differingElementsInArray1, ...differingElementsInArray2];
}