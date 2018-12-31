const params = (new URL(document.location)).searchParams;

let selectedProfile = {
  appendMode: false,
  headers: [],
  respHeaders: [],
  filters: []
};
if (localStorage.profile) {
  selectedProfile = JSON.parse(localStorage.profile);
}

for(const entry of params.entries()) {
  selectedProfile.headers.push({
    name: entry[0], value: entry[1], enabled: true
  })
}

localStorage.profile = JSON.stringify(selectedProfile);
document.title = 'Done';
