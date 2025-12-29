const form = document.getElementById("application-form");
const companyName = document.getElementById("company-name");
const jobTitle = document.getElementById("job-title");
const date = document.getElementById("application-date");
const status = document.getElementById("status-select");
const notes = document.getElementById("application-notes");
const applicationsContainer = document.getElementById("applications-container");

const jobApplications = [];

//on page load, the saved job applications are loaded
const savedJobApp = JSON.parse(localStorage.getItem('jobApplications'))
console.log(savedJobApp)

//creating container for saved job applications
const savedJobItem = document.createElement("div")
savedJobItem.classList.add('savedJobItem')

savedJobItem.textContent = savedJobApp.map((job) => job.companyName)

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCompanyName = companyName.value;
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
 localStorage.setItem('jobApplications', JSON.stringify(jobApplications))

  //one job application
  const jobItem = document.createElement("div");
  jobItem.classList.add('jobItem')
  jobItem.id = newJobApplication.id;
  
  //job application properties (individual)
  const jobCompany = document.createElement("p")
  jobCompany.textContent = newJobApplication.companyName

  const role = document.createElement("p")
  role.textContent = newJobApplication.jobTitle

  const dateApplied = document.createElement("p")
  dateApplied.textContent = newJobApplication.date

  const applicationStatus = document.createElement("p")
  applicationStatus.textContent = newJobApplication.status

  //Delete and edit buttons
  const editBtn = document.createElement("button")
  editBtn.classList.add('editBtn')
  editBtn.textContent = "Edit"

  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add('deleteBtn')
  deleteBtn.textContent = "Delete"

  //adding job application properties to job application item
  jobItem.appendChild(jobCompany)
  jobItem.appendChild(role)
  jobItem.appendChild(dateApplied)
  jobItem.appendChild(applicationStatus)
  jobItem.appendChild(editBtn)
  jobItem.appendChild(deleteBtn)


  applicationsContainer.appendChild(jobItem);

  form.reset();

  console.log(newCompanyName);
  console.log("submitted!!!");
});
