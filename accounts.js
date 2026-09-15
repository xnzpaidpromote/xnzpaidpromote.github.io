const accounts = [
  {
    id: 1,
    game: "MLBB",
    category: "mlbb",
    name: "MLBB Account #001",
    description: "Account sedang menerima paid promote.",
    price: "RM10",
    status: "AVAILABLE",
    image: ""
  },
  {
    id: 2,
    game: "FREE FIRE",
    category: "freefire",
    name: "Free Fire Account #001",
    description: "Account sedang menerima paid promote.",
    price: "RM10",
    status: "AVAILABLE",
    image: ""
  },
  {
    id: 3,
    game: "PUBG",
    category: "pubg",
    name: "PUBG Account #001",
    description: "Account sedang menerima paid promote.",
    price: "RM10",
    status: "AVAILABLE",
    image: ""
  },
  {
    id: 4,
    game: "LAIN",
    category: "lain",
    name: "Game Account #001",
    description: "Account sedang menerima paid promote.",
    price: "RM10",
    status: "AVAILABLE",
    image: ""
  }
];

const accountGrid = document.getElementById("accountGrid");
const accountCount = document.getElementById("accountCount");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter-btn");

function showAccounts(category = "all") {
  const list = category === "all"
    ? accounts
    : accounts.filter(account => account.category === category);

  accountGrid.innerHTML = "";

  accountCount.textContent =
    `${list.length} ACCOUNT`;

  if (!list.length) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  list.forEach(account => {

    const image = account.image
      ? `<img src="${account.image}" alt="${account.name}">`
      : `
        <div class="image-placeholder">
          <strong>${account.game.substring(0,3)}</strong>
          <span>PAID PROMOTE</span>
        </div>
      `;

    const card = document.createElement("article");

    card.className = "account-card";

    card.innerHTML = `
      <div class="account-image">

        <div class="account-status">
          <span class="account-status-dot"></span>
          ${account.status}
        </div>

        ${image}

      </div>

      <div class="account-info">

        <div class="account-game">
          ${account.game}
        </div>

        <h3 class="account-name">
          ${account.name}
        </h3>

        <p class="account-description">
          ${account.description}
        </p>

        <div class="account-bottom">

          <div class="account-price">
            ${account.price}
            <small>PAID PROMOTE</small>
          </div>

          <button
            class="account-button"
            onclick="contactAccount('${account.name}')">
            PROMOTE
          </button>

        </div>

      </div>
    `;

    accountGrid.appendChild(card);
  });
}

function contactAccount(accountName) {

  const text =
    `Hi XNZ, saya berminat dengan paid promote untuk ${accountName}. Saya ingin tahu maklumat lanjut.`;

  const url =
    `https://wa.me/60143783301?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
}

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    showAccounts(button.dataset.game);

  });

});

showAccounts();
