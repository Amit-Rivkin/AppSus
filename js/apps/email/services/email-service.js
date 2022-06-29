import { storageService } from "../../../general-service/async-storage-service.js"

const EMAILS_KEY = 'emails'
_createEmails()

export const emailService = {
  query,
  remove,
  save,
  get,
  getEmptyEmail,
  getLoggedUserEmail,
  getFilter,
  setFilter
}

const loggedinUser = {
  email: "ron@appsus.com",
  fullname: "Ron Elbaz",
}

const criteria = {
  status: "inbox", //'inbox/sent/trash/draft',
  txt: "", // no need to support complex text search
  isRead: null, // (optional property, if missing: show all)
  //isStared: true, // (optional property, if missing: show all)
  //lables: ["important", "romantic"], // has any of the labels
}


function query() {
  return storageService.query(EMAILS_KEY)
}

function remove(emailId) {
  return storageService.remove(EMAILS_KEY, emailId)
}

function get(emailId) {
  return storageService.get(EMAILS_KEY, emailId)
}

function save(email) {
  if (email.id) return storageService.put(EMAILS_KEY, email)
  else return storageService.post(EMAILS_KEY, email)
}

function _createEmails() {
  return query().then(emails=>{
      if (!emails || !emails.length) {
        emails = []
        emails.push(_createEmail()) //notes.push(..._createFunc())
        emails.push(_createEmail())
        emails.push(_createEmail())
        emails.push(_createEmail())
        storageService.postMany(EMAILS_KEY, emails)
      }
      return emails

  })
}

function _createEmail() {
  return {
    id: storageService._makeId(),
    subject: "Miss you!",
    body: "Would love to catch up sometimes",
    isRead: false,
    sentAt: 1551133930594,
    from: "momo@momo.com",
    to:'ron@appsus.com',
    inTrash: false,
  }
}

function getEmptyEmail(){
    return {
        id:'',
        subject: "",
        body: "",
        isRead: true,
        sentAt: Date.now(),
        to: "",
        from:"ron@appsus.com",
        inTrash: false,
      }
}

function getLoggedUserEmail(){
    return loggedinUser.email
}

function getFilter(){
    return criteria
}

function setFilter(type, value){
    criteria[type] = value
}