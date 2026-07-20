const contacts = [
  {
    name: "Maya Chen",
    role: "Prospective member",
    status: "New",
    note: "Signed up at the activities fair."
  },
  {
    name: "Diego Rivera",
    role: "Event sponsor",
    status: "Contacted",
    note: "Asked for details about the spring showcase."
  },
  {
    name: "Ari Johnson",
    role: "Volunteer lead",
    status: "Interested",
    note: "Wants to help with check-in next month."
  }
];

const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name-input");
const roleInput = document.querySelector("#role-input");
const statusInput = document.querySelector("#status-input");
const noteInput = document.querySelector("#note-input");
const filterInput = document.querySelector("#filter-input");
const searchInput = document.querySelector("#search-input");
const contactList = document.querySelector("#contact-list");
const contactCount = document.querySelector("#contact-count");

function renderContacts() {
  const selectedStatus = filterInput.value;
  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleContacts = contacts.filter((contact) => {
    const matchesStatus = selectedStatus === "All" || contact.status === selectedStatus;
    const matchesName = contact.name.toLowerCase().includes(searchTerm);

    return matchesStatus && matchesName;
  });

  contactCount.textContent = `${visibleContacts.length} contact${visibleContacts.length === 1 ? "" : "s"}`;
  contactList.innerHTML = "";

  if (visibleContacts.length === 0) {
    contactList.innerHTML = `<p class="empty-state">No contacts match your search or filter.</p>`;
    return;
  }

  visibleContacts.forEach((contact) => {
    const card = document.createElement("article");
    card.className = "contact-card";

    const cardHeader = document.createElement("div");
    cardHeader.className = "contact-card-header";

    const titleGroup = document.createElement("div");
    const name = document.createElement("h3");
    const role = document.createElement("p");
    role.className = "role";

    const status = document.createElement("span");
    status.className = "status";

    const note = document.createElement("p");
    note.className = "note";

    name.textContent = contact.name;
    role.textContent = contact.role;
    status.textContent = contact.status;
    note.textContent = contact.note || "No note yet.";

    titleGroup.append(name, role);
    cardHeader.append(titleGroup, status);
    card.append(cardHeader, note);

    contactList.appendChild(card);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newContact = {
    name: nameInput.value.trim(),
    role: roleInput.value.trim(),
    status: statusInput.value,
    note: noteInput.value.trim()
  };

  contacts.unshift(newContact);
  form.reset();
  filterInput.value = "All";
  searchInput.value = "";
  renderContacts();
});

filterInput.addEventListener("change", renderContacts);
searchInput.addEventListener("input", renderContacts);

renderContacts();
