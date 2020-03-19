const container = document.getElementById("output");
const selectdistrict = document.getElementById("district");
const selectcity = document.getElementById("city");

let mmcheckpoints = [];

// Fetching data from API

fetch("https://coronavirus-ph-api.now.sh/mm-checkpoints")
  .then(res => res.json())
  .then(data => {
    mmcheckpoints.push(data);
    data.forEach(checkpoint => {
      container.innerHTML += `
        <div class="bg-green-100 max-w-sm rounded overflow-hidden shadow-lg">
        <div class="h-56 px-6 py-4">
          <div class="font-bold text-gray-900">${checkpoint.location}</div>
          <p class="text-gray-600 capitalize mb-5">
          ${checkpoint.city}
          </p>
          <p class="text-gray-600 text-base italic">
          ${checkpoint.description}
          </p>
        </div>
        <div class="px-6 py-4">
    <a href="https://www.google.com/maps?q=${checkpoint.lat}+${checkpoint.lng}" target="_blank"><span class="inline-block bg-green-900 rounded-full px-4 py-2 text-sm font-bold text-white mr-2">View on Google Maps</span></a>
      </div>
        `;
    });
  })
  .catch(err => console.log(err));


// Sorting by District

selectdistrict.addEventListener("change", () => {
  let selected = selectdistrict.options[selectdistrict.selectedIndex].value;
  const filtereddistrict = mmcheckpoints[0].filter(checkpoint => {
    return checkpoint.district.includes(selected);
  });
  container.innerHTML =''
  viewfiltered(filtereddistrict);
});

function viewfiltered(checkpoints) {
  checkpoints.map(checkpoint => {
    container.innerHTML += `<div class="bg-green-100 max-w-sm rounded overflow-hidden shadow-lg">
    <div class="h-56 px-6 py-4">
      <div class="font-bold text-gray-900">${checkpoint.location}</div>
      <p class="text-gray-600 capitalize mb-5">
      ${checkpoint.city}
      </p>
      <p class="text-gray-600 text-base italic">
      ${checkpoint.description}
      </p>
    </div>
    <div class="px-6 py-4">
  <a href="https://www.google.com/maps?q=${checkpoint.lat}+${checkpoint.lng}" target="_blank"><span class="inline-block bg-green-900 rounded-full px-4 py-2 text-sm font-bold text-white mr-2">View on Google Maps</span></a>
  </div>
    `;
  });
}
