async function getCats() {
  try {
    const response = await fetch("http://localhost:8010/cats");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch data. Try refreshing the page!");
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

let isLoading = false;

const section = document.querySelector(`.gallery`);

async function run() {
  isLoading = true;
  const loadingScreen = document.createElement(`h1`);
  loadingScreen.innerText = "Loading...";

  section.appendChild(loadingScreen);
  const result = await getCats();

  if (result.data) {
    isLoading = false;
    loadingScreen.style.display = `none`;
    result.data.forEach((d) => {
      const card = document.createElement(`div`);
      const img = document.createElement(`img`);
      const title = document.createElement(`h2`);
      const description = document.createElement(`p`);

      card.classList.add(`card`);

      img.src = d.image;
      title.innerText = d.title;
      description.innerText = d.description;

      card.append(img, title, description);

      section.appendChild(card);
    });
  } else {
    loadingScreen.innerText = "Failed to fetch Please try again later";
  }
}

run();
