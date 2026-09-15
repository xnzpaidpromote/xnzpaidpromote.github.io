const API_URL =
  "https://xnzpaidpromote-api.xnzresellerbackup.workers.dev/api/accounts";

let accounts = [];

const accountGrid = document.getElementById("accountGrid");
const accountCount = document.getElementById("accountCount");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter-btn");

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getCategory(game) {
  const value = String(game || "").toUpperCase();

  if (value === "MLBB") return "mlbb";
  if (value === "FREE FIRE") return "freefire";
  if (value === "PUBG") return "pubg";

  return "lain";
}

async function loadAccounts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();

    accounts = (data.accounts || []).map(account => ({
      id: account.id,
      game: account.game || "LAIN",
      category: getCategory(account.game),
      name: account.account_name || "Game Account",
      description: account.details || "",
      price: "RM" + Number(account.price || 0),
      status: account.status || "AVAILABLE",
      image: account.image_url || "",
      username: account.username || ""
    }));

    showAccounts();
  } catch (error) {
    console.error("Gagal ambil account:", error);

    accounts = [];
    showAccounts();
  }
}

function showAccounts(category = "all") {
  const list =
    category === "all"
      ? accounts
      : accounts.filter(account => account.category === category);

  accountGrid.innerHTML = "";

  accountCount.textContent = `${list.length} ACCOUNT`;

  if (!list.length) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  list.forEach(account => {
    const image = account.image
      ? `<img src="${escapeHTML(account.image)}" alt="${escapeHTML(account.name)}">`
      : `
        <div class="image-placeholder">
          <strong>${escapeHTML(account.game.substring(0, 3))}</strong>
          <span>PAID PROMOTE</span>
        </div>
      `;

    const card = document.createElement("article");

    card.className = "account-card";

    card.innerHTML = `
      <div class="account-image">

        <div class="account-status">
          <span class="account-status-dot"></span>
          ${escapeHTML(account.status)}
        </div>

        ${image}

      </div>

      <div class="account-info">

        <div class="account-game">
          ${escapeHTML(account.game)}
        </div>

        <h3 class="account-name">
          ${escapeHTML(account.name)}
        </h3>

        <p class="account-description">
          ${escapeHTML(account.description)}
        </p>

        <div class="account-bottom">

          <div class="account-price">
            ${escapeHTML(account.price)}
            <small>PAID PROMOTE</small>
          </div>

          <button
            class="account-button"
            onclick="contactAccount('${escapeHTML(account.name)}')">
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

loadAccounts();
