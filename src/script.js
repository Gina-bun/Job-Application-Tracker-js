const form = document.getElementById("application-form")
const companyName = document.getElementById("company-name")
const jobTitle = document.getElementById("job-title")
const date = document.getElementById("application-date")
const status = document.getElementById("status-select")
const notes = document.getElementById("application-notes")
const applicationsContainer = document.getElementById("applications-container")


const jobApplications = []

form.addEventListener("submit", (e) => {
    e.preventDefault()

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
        notes: newNotes
    }

    jobApplications.push(newJobApplication)

    form.reset()

    console.log(newCompanyName) 
    console.log('submitted!!!')
})









