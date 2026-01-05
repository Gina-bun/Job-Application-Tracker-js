const openModalBtn = document.getElementById("newApp");
const modal = document.getElementById("jobModal");
const closeModalBtn = document.getElementById("closeBtn");
const form = document.getElementById("application-form");
const companyName = document.getElementById("company-name");
const jobTitle = document.getElementById("job-title");
const date = document.getElementById("application-date");
const status = document.getElementById("status-select");
const applicationsContainer = document.getElementById("applications-container");
const searchFilter = document.getElementById("search-filter");
const numberOfJobs = document.getElementById("number-of-jobs")




//open the modal/pop-up
openModalBtn.addEventListener("click", () => {
  // console.log("display modal")
  modal.style.display = "block";
});

//close the modal/pop-up
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

//close if clicking outside the modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

//convert date into UI-friendly format
function formatDateReadable(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

//Debounce function**************************
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// const jobApplications = [];

//on page load, the saved job applications are loaded************
const jobApplications =
  JSON.parse(localStorage.getItem("jobApplications")) || [];

      //numberOfJobs.textContent = `${jobApplications.length} total applications`
  console.log(jobApplications.length)

//SEARCH FILTER FEATURE(filter by company name)*************
function handleSearchFilter(e) {
  applicationsContainer.innerHTML = ""
  console.log("input changed!!!!");

  let searchInput = e.target.value;
  //render full job application list if search bar is empty
  if (!searchInput) {
    applicationsContainer.innerHTML = ""
    renderSavedApplications();
    return;
  }

  //find matching applications(THE FILTERING part)
  const matchingJobs = jobApplications.filter((job) =>
    job.companyName.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (matchingJobs.length === 0) {
    numberOfJobs.innerHTML = ""
    applicationsContainer.innerHTML =
      "<p>No matching job applications found</p>";
    return;
  }

  applicationsContainer.innerHTML = ""; //empty the job application containser

  matchingJobs.forEach((job) => {
    const jobItem = document.createElement("div");
    jobItem.classList.add("jobItem");
    jobItem.id = job.id;

    //create elements for company name, job title, application date, status
    const jobCompany = document.createElement("p");
    jobCompany.textContent = job.companyName;

    const role = document.createElement("p");
    role.classList.add("role")
    role.textContent = job.jobTitle;

    const dateApplied = document.createElement("p");
    dateApplied.textContent = job.date;

    const applicationStatus = document.createElement("p");
    applicationStatus.textContent = job.status;

    //Delete and edit buttons
    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "Delete";

    //adding job application properties to job application item
    jobItem.appendChild(jobCompany);
    jobItem.appendChild(role);
    jobItem.appendChild(dateApplied);
    jobItem.appendChild(applicationStatus);
    jobItem.appendChild(editBtn);
    jobItem.appendChild(deleteBtn);

    applicationsContainer.appendChild(jobItem);

         (function (){
      numberOfJobs.textContent = `${matchingJobs.length} matching applications`
  console.log(jobApplications.length)
  })()
  });
}

//debounce filtered searching
const debouncedSearch = debounce(handleSearchFilter, 400);
searchFilter.addEventListener("input", debouncedSearch);

//CREATE CONTAINER FOR SAVED JOB APPLICATIONS(for persistence)****************
function renderSavedApplications() {
  jobApplications.forEach((job) => {
    const savedJob = document.createElement("div");
    savedJob.classList.add("savedJobItem");
    savedJob.id = job.id;

    //saved job item properties
    const companyNameContainer = document.createElement("div");
    companyNameContainer.classList.add("company-name-container");

    const companyIcon = document.createElement("div");
    companyIcon.innerHTML = `<i data-lucide="building-2" class="company-icon"></i>`;
    lucide.createIcons();

    const theCompanyName = document.createElement("p");
    theCompanyName.textContent =
      job.companyName.charAt(0).toUpperCase() + job.companyName.slice(1);

    companyNameContainer.appendChild(companyIcon);
    companyNameContainer.appendChild(theCompanyName);

    //container for flex display of role and date
    const jobDetails = document.createElement("div");
    jobDetails.classList.add("job-details");

    const jobName = document.createElement("p"); //name of role applied for
    jobName.textContent = 
                    job.jobTitle.charAt(0).toUpperCase() + job.jobTitle.slice(1);

    const theDateApplied = document.createElement("p");
      theDateApplied.textContent = formatDateReadable(job.date);

   

    jobDetails.appendChild(jobName);
    jobDetails.appendChild(theDateApplied);

    let appStatus = document.createElement("p");
    appStatus.classList.add("status")
    appStatus.textContent = job.status;

    //Delete and edit buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("job-application-btns");

    const theEditBtn = document.createElement("button");
    theEditBtn.classList.add("editBtn");
    theEditBtn.innerHTML = `<i data-lucide="pencil"></>`

    const theDeleteBtn = document.createElement("button");
    theDeleteBtn.classList.add("deleteBtn");
    theDeleteBtn.innerHTML = `<i data-lucide="trash-2"></>`

    //appending properties to saved job item
    savedJob.appendChild(companyNameContainer);
    savedJob.appendChild(jobDetails);
    savedJob.appendChild(appStatus);

    //appending edit and delete button
    buttonContainer.appendChild(theEditBtn);
    buttonContainer.appendChild(theDeleteBtn);

    savedJob.appendChild(buttonContainer);

    //appending job item to container
    applicationsContainer.appendChild(savedJob);

       (function (){
      numberOfJobs.textContent = `${jobApplications.length} total applications`
  console.log(jobApplications.length)
  })()

  });
}

renderSavedApplications();

//CREATING A NEW JOB APPLICATION*****************************
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCompanyName =
    companyName.value.charAt(0).toUpperCase() + companyName.value.slice(1);
  const newJobTitle = 
      jobTitle.value.charAt(0).toUpperCase() + jobTitle.value.slice(1);
  const newDate = date.value;
  const newStatus = 
          status.value.charAt(0).toUpperCase() + status.value.slice(1);

  const newJobApplication = {
    id: crypto.randomUUID(),
    companyName: newCompanyName,
    jobTitle: newJobTitle,
    date: newDate,
    status: newStatus,
  };

  jobApplications.push(newJobApplication);

  //saving the array to localStorage
  localStorage.setItem("jobApplications", JSON.stringify(jobApplications));

  //one job application
  const jobItem = document.createElement("div");
  jobItem.classList.add("jobItem");
  jobItem.id = newJobApplication.id;

  //job application properties (individual)
  const companyNameContainer = document.createElement("div");
  companyNameContainer.classList.add("company-name-container");

  const companyIcon = document.createElement("div");
  companyIcon.innerHTML = `<i data-lucide="building-2" class="company-icon"></i>`;
  lucide.createIcons();

  const jobCompany = document.createElement("p");
  jobCompany.textContent = newJobApplication.companyName;

  companyNameContainer.appendChild(companyIcon);
  companyNameContainer.appendChild(jobCompany);

  //container for flex display of role and date
  const jobDetails = document.createElement("div");
  jobDetails.classList.add("job-details");

  const role = document.createElement("p");
  role.textContent = newJobApplication.jobTitle;

  const dateApplied = document.createElement("p");
  dateApplied.textContent = formatDateReadable(newJobApplication.date);

  jobDetails.appendChild(role)
  jobDetails.appendChild(dateApplied)

  const applicationStatus = document.createElement("p");
  applicationStatus.classList.add("status")
  applicationStatus.textContent = newJobApplication.status;

  //Delete and edit buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("job-application-btns");

  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.innerHTML = `<i data-lucide="pencil"></>`
   lucide.createIcons();

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.innerHTML = `<i data-lucide="trash-2"></>`
   lucide.createIcons();

  buttonContainer.appendChild(editBtn)
  buttonContainer.appendChild(deleteBtn)

  //adding job application properties to job application item
  jobItem.appendChild(companyNameContainer);
  jobItem.appendChild(jobDetails);
  jobItem.appendChild(applicationStatus);
  jobItem.appendChild(buttonContainer);

  applicationsContainer.appendChild(jobItem);

  (function (){
      numberOfJobs.textContent = `${jobApplications.length} total applications`
  console.log(jobApplications.length)
  })()

  form.reset();

  //close modal after submission
  modal.style.display = "none";

  console.log(newCompanyName);
  console.log("submitted!!!");

   lucide.createIcons();
});

//edit feature*******************************
//grabbing edit button
applicationsContainer.addEventListener("click", (e) => {
  //check if edit button is clicked
  if (!e.target.closest(".editBtn")) return;

  //find the job container
  const jobItem = e.target.closest(".jobItem, .savedJobItem");

  //edit button becomes save button
  const clickedEditButton = jobItem.querySelector("button:nth-of-type(1)");
  const saveBtn = document.createElement("button"); //new save button
  saveBtn.innerHTML = `<i data-lucide="save"></i>`
  lucide.createIcons();
  saveBtn.classList.add("saveBtn");

  clickedEditButton.replaceWith(saveBtn);

  //get job id
  const jobId = jobItem.id;

  //find matching job object
  const job = jobApplications.find((job) => job.id === jobId);

  const select = document.createElement("select");
  const selectOption = document.createElement("option");
  selectOption.textContent = "Select";

  const appliedOption = document.createElement("option");
  appliedOption.textContent = "Applied";

  const interviewOption = document.createElement("option");
  interviewOption.textContent = "Interview";

  const rejectedOption = document.createElement("option");
  rejectedOption.textContent = "Rejected";

  const offerOption = document.createElement("option");
  offerOption.textContent = "Offer";

  select.appendChild(selectOption);
  select.appendChild(appliedOption);
  select.appendChild(interviewOption);
  select.appendChild(rejectedOption);
  select.appendChild(offerOption);

  //grabbing job item status
  const oldStatusElement = jobItem.querySelector(".status");
  // console.log(oldStatusElement)

  // oldStatusElement.replaceWith(select);
  oldStatusElement.innerHTML = ""
  oldStatusElement.appendChild(select)
  lucide.createIcons()
});

//save feature****************************
applicationsContainer.addEventListener("click", (e) => {
  if (!e.target.closest(".saveBtn")) return;

  //find the job item
  const jobItem = e.target.closest(".jobItem, .savedJobItem");

  //find job id
  const jobId = jobItem.id;

  //find matching job object
  const job = jobApplications.find((job) => job.id === jobId);

  const select = jobItem.querySelector("select:nth-of-type(1)");
  console.log(select);

  const newStatus = document.createElement("p");
  newStatus.textContent = select.value;

  //job object update
  job.status = select.value;

  //localStorage update
  localStorage.setItem("jobApplications", JSON.stringify(jobApplications));

  //UI update
  select.replaceWith(newStatus);

  //change save button back to edit button
  const clickedSaveButton = jobItem.querySelector("button:nth-of-type(1)");
  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  //new edit button
  editBtn.innerHTML = `<i data-lucide="pencil"></i>`
  lucide.createIcons();

  clickedSaveButton.replaceWith(editBtn);
  lucide.createIcons();
});

//delete feature**************************
applicationsContainer.addEventListener("click", (e) => {
  if (!e.target.closest(".deleteBtn")) return;

  //get job item
  const jobItem = e.target.closest(".jobItem, .savedJobItem");

  //get job id
  const jobId = jobItem.id;

  //find matching job object
  const job = jobApplications.find((job) => job.id === jobId);

  //remove job obj from job application array
  const index = jobApplications.indexOf(job);

  if (index !== -1) {
    jobApplications.splice(index, 1);
  }

  //update in localStorage
  localStorage.setItem("jobApplications", JSON.stringify(jobApplications));

    (function (){
      numberOfJobs.textContent = `${jobApplications.length} total applications`
  console.log(jobApplications.length)
  })()

  //update UI to show deletion
  jobItem.remove();
});
