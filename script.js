const contacts = [
  {
    name: "Maya Chen",
    role: "Prospective member",
    status: "New",
    followUpDate: "2026-08-01",
    note: "Signed up at the activities fair."
  },
  {
    name: "Diego Rivera",
    role: "Event sponsor",
    status: "Contacted",
    followUpDate: "2026-08-05",
    note: "Asked for details about the spring showcase."
  },
  {
    name: "Ari Johnson",
    role: "Volunteer lead",
    status: "Interested",
    followUpDate: "2026-08-12",
    note: "Wants to help with check-in next month."
  }
];

const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name-input");
const roleInput = document.querySelector("#role-input");
const statusInput = document.querySelector("#status-input");
const followUpInput = document.querySelector("#follow-up-input");
const noteInput = document.querySelector("#note-input");
const filterInput = document.querySelector("#filter-input");
const contactList = document.querySelector("#contact-list");
const contactCount = document.querySelector("#contact-count");

function formatDate(dateValue) {
  if (!dateValue) {
    return "Not scheduled";
  }

  const [year, month, day] = dateValue.split("-");
  return `${month}/${day}/${year}`;
}

function renderContacts() {
  const selectedStatus = filterInput.value;
  const visibleContacts = contacts.filter((contact) => {
    return selectedStatus === "All" || contact.status === selectedStatus;
  });

  contactCount.textContent = `${visibleContacts.length} contact${visibleContacts.length === 1 ? "" : "s"}`;
  contactList.innerHTML = "";

  if (visibleContacts.length === 0) {
    contactList.innerHTML = `<p class="empty-state">No contacts match this filter.</p>`;
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

    const followUp = document.createElement("p");
    followUp.className = "follow-up";

    const note = document.createElement("p");
    note.className = "note";

    name.textContent = contact.name;
    role.textContent = contact.role;
    status.textContent = contact.status;
    followUp.textContent = `Next follow-up: ${formatDate(contact.followUpDate)}`;
    note.textContent = contact.note || "No note yet.";

    titleGroup.append(name, role);
    cardHeader.append(titleGroup, status);
    card.append(cardHeader, followUp, note);

    contactList.appendChild(card);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newContact = {
    name: nameInput.value.trim(),
    role: roleInput.value.trim(),
    status: statusInput.value,
    followUpDate: followUpInput.value,
    note: noteInput.value.trim()
  };

  contacts.unshift(newContact);
  form.reset();
  filterInput.value = "All";
  renderContacts();
});

filterInput.addEventListener("change", renderContacts);

renderContacts();
