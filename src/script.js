const newApplicationBtn = document.getElementById("newApp")
const form = document.getElementById("application-form");
const companyName = document.getElementById("company-name");
const jobTitle = document.getElementById("job-title");
const date = document.getElementById("application-date");
const status = document.getElementById("status-select");
const notes = document.getElementById("application-notes");
const applicationsContainer = document.getElementById("applications-container");
const searchFilter = document.getElementById("search-filter");

//Debounce function
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

//SEARCH FILTER FEATURE(filter by company name)*************
function handleSearchFilter(e) {
  console.log("input changed!!!!");

  let searchInput = e.target.value;
  if (!searchInput) {
    renderSavedApplications();
    return;
  }

  //find matching applications(THE FILTERING part)
  const matchingJobs = jobApplications.filter((job) =>
    job.companyName.toLowerCase().includes(searchInput.toLowerCase())
  );

  applicationsContainer.innerHTML = ""; //empty the job application containser

  matchingJobs.forEach((job) => {
    const jobItem = document.createElement("div");
    jobItem.classList.add("jobItem");
    jobItem.id = job.id;

    //create elements for company name, job title, application date, status
    const jobCompany = document.createElement("p");
    jobCompany.textContent = job.companyName;

    const role = document.createElement("p");
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
    const theCompanyName = document.createElement("p");
    theCompanyName.textContent =
      job.companyName.charAt(0).toUpperCase() + job.companyName.slice(1);

    const jobName = document.createElement("p");
    jobName.textContent = job.jobTitle;

    const theDateApplied = document.createElement("p");
    theDateApplied.textContent = job.date;

    let appStatus = document.createElement("p");
    appStatus.textContent = job.status;

    //Delete and edit buttons
    const theEditBtn = document.createElement("button");
    theEditBtn.classList.add("editBtn");
    theEditBtn.textContent = "Edit";

    const theDeleteBtn = document.createElement("button");
    theDeleteBtn.classList.add("deleteBtn");
    theDeleteBtn.textContent = "Delete";

    //appending properties to saved job item
    savedJob.appendChild(theCompanyName);
    savedJob.appendChild(jobName);
    savedJob.appendChild(theDateApplied);
    savedJob.appendChild(appStatus);

    //appending edit and delete button
    savedJob.appendChild(theEditBtn);
    savedJob.appendChild(theDeleteBtn);

    //appending job item to container
    applicationsContainer.appendChild(savedJob);
  });
}

renderSavedApplications();

//CREATING A NEW JOB APPLICATION*****************************
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCompanyName =
    companyName.value.charAt(0).toUpperCase() + companyName.value.slice(1);
  const newJobTitle = jobTitle.value;
  const newDate = date.value;
  const newStatus = status.value;
  const newNotes = notes.value;

  const newJobApplication = {
    id: crypto.randomUUID(),
    companyName: newCompanyName,
    jobTitle: newJobTitle,
    date: newDate,
    status: newStatus,
    notes: newNotes,
  };

  jobApplications.push(newJobApplication);

  //saving the array to localStorage
  localStorage.setItem("jobApplications", JSON.stringify(jobApplications));

  //one job application
  const jobItem = document.createElement("div");
  jobItem.classList.add("jobItem");
  jobItem.id = newJobApplication.id;

  //job application properties (individual)
  const jobCompany = document.createElement("p");
  jobCompany.textContent = newJobApplication.companyName;

  const role = document.createElement("p");
  role.textContent = newJobApplication.jobTitle;

  const dateApplied = document.createElement("p");
  dateApplied.textContent = newJobApplication.date;

  const applicationStatus = document.createElement("p");
  applicationStatus.textContent = newJobApplication.status;

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

  form.reset();

  console.log(newCompanyName);
  console.log("submitted!!!");
});

//edit feature*******************************
//grabbing edit button
applicationsContainer.addEventListener("click", (e) => {
  //check if edit button is clicked
  if (!e.target.classList.contains("editBtn")) return;

  //find the job container
  const jobItem = e.target.closest(".jobItem, .savedJobItem");

  //edit button becomes save button
  const clickedEditButton = jobItem.querySelector("button:nth-of-type(1)");
  const saveBtn = document.createElement("button"); //new save button
  saveBtn.textContent = "save";
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
  const oldStatusElement = jobItem.querySelector("p:nth-of-type(4)");
  // console.log(oldStatusElement)

  oldStatusElement.replaceWith(select);
});

//save feature****************************
applicationsContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("saveBtn")) return;

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
  editBtn.textContent = "edit";

  clickedSaveButton.replaceWith(editBtn);
});

//delete feature**************************
applicationsContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("deleteBtn")) return;

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

  //update UI to show deletion
  jobItem.remove();
});
