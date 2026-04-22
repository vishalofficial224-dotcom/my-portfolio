let partToEdit = ""
function maskEmail (email) {

  for (let i in email) {
    if(email[i] !== "@") {
      partToEdit += email[i];
    } else {
      break
    }
  }
  console.log(partToEdit)

  const astreekChange = partToEdit.slice(1, partToEdit.length-1)

  const fullReady = partToEdit.replace(astreekChange, "*".repeat(astreekChange.length))

  const emailPart = email.slice(partToEdit.length)

  return fullReady + emailPart;

}



console.log(maskEmail("dlsalsjd@gmail.com"))