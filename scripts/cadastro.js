document.addEventListener("DOMContentLoaded", function () {
    const ufSelect = document.querySelector("select[name=uf]");
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[type=hidden]");


  async function populateUFs() {
    const res = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    const states = await res.json();

    for(const state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
    }
  }

  populateUFs();

  async function populateCities(event) {
    const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`);
    const cities = await res.json();

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    citySelect.innerHTML = "";

    for(const city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      citySelect.disabled = false;
    }
  }

  ufSelect.addEventListener("change", (event) => {
    console.log(event.target.value);
    populateCities(event);
  });
});
