// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestrore
const db = firebase.firestore();

// Getting data
db.collection("user")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach((doc, index) => {
      displayData(doc, index);
    });
  });

const tbody = document.querySelector("tbody");

/*
 * Displaying data
 * @param doc - array value
 * @param index - array index
 */
function displayData(doc, index) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", doc.id); // id is generated automatically

  const td0 = document.createElement("td");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");

  const del = document.createTextNode("delete");
  const name = document.createTextNode(doc.data().name);
  const surname = document.createTextNode(doc.data().surname);
  const email = document.createTextNode(doc.data().email);
  const nation = document.createTextNode(doc.data().nationality);

  td0.append(index);
  td1.append(name);
  td2.append(surname);
  td3.append(email);
  td4.append(nation);
  td5.append(del);

  td5.addEventListener("click", e => {
    e.stopPropagation;
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("user")
      .doc(id)
      .delete();
  });

  // Adds new user
  function add() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const national = document.getElementById("nationality").value;

    db.collection("user").add({
      name: name,
      surname: surname,
      email: email,
      nationality: national
    });
  }

  tr.append(td0, td1, td2, td3, td4, td5);
  tbody.append(tr);
}

const search = document.getElementById("search");
search.addEventListener("click", search => {
  tbody.innerHTML = "";
  
  const nameSeach = document.getElementById("findName");
  
  db.collection("user")
    .where("name", "==", nameSeach.value)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc, index) {
        displayData(doc, index);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
});
