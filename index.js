async function loadPokemon() {
    const num = parseInt(document.getElementById("num").value);
    const category = document.getElementById("category").value;
    const container = document.getElementById("cards");
    const loader = document.getElementById("loading");
  
    container.innerHTML = "";
    loader.style.display = "block";
  
    let count = 0;
    let attempts = 0;
  
    while (count < num && attempts < 100) {
      const id = Math.floor(Math.random() * 150) + 1;
      attempts++;
  
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await res.json();
  
            const types = data.types.map(t => t.type.name);
            if (category !== "all" && !types.includes(category)) continue;
  
            const card = document.createElement("div");
            card.className = "card";

            const abilities = data.abilities.map(a=>a.ability.name).join(", ")

            const cardInner = document.createElement("div");
            cardInner.className = "card-inner";

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <h3>${data.name.toUpperCase()}</h3>
                        <img src="${data.sprites.front_default}" alt="${data.name}">
                        <p><strong>Type:</strong> ${types.join(", ")}</p>
                    </div>
                    <div class="card-back">
                        <p><strong>Height:</strong> ${data.height}</p>
                        <p><strong>Weight:</strong> ${data.weight}</p>
                        <p><strong>Base XP:</strong> ${data.base_experience}</p>
                        <p><strong>Abilities:</strong> ${abilities}</p>
                    </div>
                </div>
    `;
            container.appendChild(card);
            count++;
        } catch (err) {
            console.error("Failed to fetch Pokémon", err);
        }
    }
  
    if (count === 0) {
      container.innerHTML = "<p>No matching Pokémon found. Try a different category.</p>";
    }
  
    loader.style.display = "none";
  }
  
  // Clear Cards Button
  document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("cards").innerHTML = "";
    document.getElementById("loading").style.display = "none";
  });
  
  // Load Pokémon Button
  document.getElementById("loadPokemonBtn").addEventListener("click", loadPokemon);
  