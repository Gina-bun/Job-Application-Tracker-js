const form = document.getElementById("application-form");
const companyName = document.getElementById("company-name");
const jobTitle = document.getElementById("job-title");
const date = document.getElementById("application-date");
const status = document.getElementById("status-select");
const notes = document.getElementById("application-notes");
const applicationsContainer = document.getElementById("applications-container");

// const jobApplications = [];

//on page load, the saved job applications are loaded
const jobApplications = JSON.parse(localStorage.getItem('jobApplications'))

//creating container for saved job applications
jobApplications.forEach((job) => {
    const savedJob = document.createElement("div") 
    savedJob.classList.add('savedJobItem')
    
    //saved job item properties
    const theCompanyName = document.createElement("p")
    theCompanyName.textContent = job.companyName

    const jobName = document.createElement("p")
    jobName.textContent = job.jobTitle

     const theDateApplied = document.createElement("p")
     theDateApplied.textContent = job.date

      const appStatus = document.createElement("p")
    appStatus.textContent = job.status

    //Delete and edit buttons
  const theEditBtn = document.createElement("button")
  theEditBtn.classList.add('editBtn')
  theEditBtn.textContent = "Edit"

  const theDeleteBtn = document.createElement("button")
  theDeleteBtn.classList.add('deleteBtn')
  theDeleteBtn.textContent = "Delete"

    //appending properties to saved job item
    savedJob.appendChild(theCompanyName)
    savedJob.appendChild(jobName)
    savedJob.appendChild(theDateApplied)
    savedJob.appendChild(appStatus)

    //appending edit and delete button
    savedJob.appendChild(theEditBtn)
    savedJob.appendChild(theDeleteBtn)
    
    //appending job item to container
    applicationsContainer.appendChild(savedJob)
})

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
