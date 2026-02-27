const apiURL = "http://localhost:3000/quotes";
const container = document.getElementById("quotesContainer");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");

let allQuotes = [];

// Fetch Quotes
async function fetchQuotes() {
  const res = await fetch(apiURL);
  allQuotes = await res.json();
  displayQuotes(allQuotes);
}

// Display Quotes
function displayQuotes(quotes) {
  container.innerHTML = "";

  quotes.forEach(quote => {
    const card = document.createElement("div");
    card.classList.add("quote-card");

    card.innerHTML = `
      <p class="quote-text">"${quote.text}"</p>
      <h3 class="quote-author">- ${quote.author}</h3>
      <span class="badge ${quote.category.replace(/\s+/g, '')}">
        ${quote.category}
      </span>
      <br>
      <button class="delete-btn" onclick="deleteQuote(${quote.id})">
        Delete
      </button>
    `;

    container.appendChild(card);
  });
}

// Add Quote
addBtn.addEventListener("click", async () => {
  const text = document.getElementById("quoteText").value;
  const author = document.getElementById("quoteAuthor").value;
  const category = document.getElementById("quoteCategory").value;

  if (!text || !author || !category) {
    alert("Please fill all fields");
    return;
  }

  await fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, author, category })
  });

  document.getElementById("quoteText").value = "";
  document.getElementById("quoteAuthor").value = "";
  document.getElementById("quoteCategory").value = "";

  fetchQuotes();
});

// Delete Quote
async function deleteQuote(id) {
  await fetch(`${apiURL}/${id}`, { method: "DELETE" });
  fetchQuotes();
}

// Search
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = allQuotes.filter(q =>
    q.author.toLowerCase().includes(value)
  );
  displayQuotes(filtered);
});

// Filter
filterCategory.addEventListener("change", () => {
  const value = filterCategory.value;

  if (value === "all") {
    displayQuotes(allQuotes);
  } else {
    const filtered = allQuotes.filter(q =>
      q.category === value
    );
    displayQuotes(filtered);
  }
});

fetchQuotes();