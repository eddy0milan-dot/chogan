const lista = document.getElementById("lista-prodotti");
const filtri = document.getElementById("filtri");
const ricerca = document.getElementById("ricerca");
const conteggio = document.getElementById("conteggio");

const modale = document.getElementById("modale");
const chiudiModale = document.getElementById("chiudi-modale");

let categoriaAttiva = "Tutti";

const categorie = ["Tutti", ...new Set(prodotti.map(prodotto => prodotto.categoria))];

function creaFiltri() {
  filtri.innerHTML = categorie.map(categoria => `
    <button class="${categoria === categoriaAttiva ? "attivo" : ""}"
      onclick="filtraCategoria('${categoria}')">
      ${categoria}
    </button>
  `).join("");
}

function filtraCategoria(categoria) {
  categoriaAttiva = categoria;
  creaFiltri();
  mostraProdotti();
}

function mostraProdotti() {
  const testoRicerca = ricerca.value.toLowerCase().trim();

  const prodottiFiltrati = prodotti.filter(prodotto => {
    const appartieneCategoria =
      categoriaAttiva === "Tutti" || prodotto.categoria === categoriaAttiva;

    const corrispondeRicerca =
      prodotto.nome.toLowerCase().includes(testoRicerca) ||
      prodotto.categoria.toLowerCase().includes(testoRicerca) ||
      prodotto.codice.toLowerCase().includes(testoRicerca);

    return appartieneCategoria && corrispondeRicerca;
  });

  conteggio.textContent = `${prodottiFiltrati.length} prodotti trovati`;

  lista.innerHTML = prodottiFiltrati.length
    ? prodottiFiltrati.map((prodotto, indice) => `
      <article class="prodotto">
        <img src="${prodotto.immagine}" alt="${prodotto.nome}">
        <div class="prodotto-info">
          <span>${prodotto.categoria}</span>
          <h2>${prodotto.nome}</h2>
          <p>${prodotto.codice}</p>
          <button onclick="apriProdotto(${prodotti.indexOf(prodotto)})">
            Scopri il prodotto
          </button>
        </div>
      </article>
    `).join("")
    : "<p>Nessun prodotto trovato. Scrivimi su WhatsApp per informazioni.</p>";
}

function apriProdotto(indice) {
  const prodotto = prodotti[indice];

  document.getElementById("modal-img").src = prodotto.immagine;
  document.getElementById("modal-img").alt = prodotto.nome;
  document.getElementById("modal-categoria").textContent = prodotto.categoria;
  document.getElementById("modal-nome").textContent = prodotto.nome;
  document.getElementById("modal-codice").textContent = prodotto.codice;
  document.getElementById("modal-descrizione").textContent = prodotto.descrizione;

  const messaggio = encodeURIComponent(
    `Ciao Natalia, vorrei informazioni sul prodotto: ${prodotto.nome}.`
  );

  document.getElementById("modal-whatsapp").href =
    `https://wa.me/393203661211?text=${messaggio}`;

  modale.classList.add("aperta");
}

chiudiModale.addEventListener("click", () => modale.classList.remove("aperta"));

modale.addEventListener("click", event => {
  if (event.target === modale) modale.classList.remove("aperta");
});

ricerca.addEventListener("input", mostraProdotti);

creaFiltri();
mostraProdotti();