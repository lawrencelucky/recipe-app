const recipeContainer = document.querySelector('.recipe-container');
const popup = document.querySelector('.modal-popup');
const closeBtn = document.querySelector('.close-container');
const video = document.querySelector('video');

recipeContainer.addEventListener('click', openVideoModal);
closeBtn.addEventListener('click', closeModal);

function openVideoModal(event) {
  if (event.target.classList.contains('recipe-card')) {
    const card = event.target;
    const videoSrc = card.querySelector('span').innerText;
    video.src = videoSrc;
    popup.style.display = 'grid';
  }
}

function closeModal() {
  popup.style.display = 'none';
  video.pause();
}

fetch(
  'https://tasty.p.rapidapi.com/recipes/list?from=0&size=50&tags=under_30_minutes',
  {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'tasty.p.rapidapi.com',
      'x-rapidapi-key': '14b34c8444msh9765a1af2d16595p101a55jsn7d520d73032c',
    },
  }
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const recipes = data.results;
    const recipeMarkup = recipes
      .map((recipe) => {
        return `
      <div class="recipe-card">
        <p hidden>${recipe.original_video_url || recipe.video_url}</p>
        <div class="recipe-header">
          <img
            src="${recipe.thumbnail_url}"
            alt="recipe"
            class="recipe-image"
          />
        </div>
        <div class="recipe-body">
          <h2 class="recipe-title">
            ${recipe.name}
          </h2>
          <p class="recipe-description">${
            recipe.instructions[0].display_text
          }</p>
        </div>
      </div>
      `;
      })
      .join(' ');

    recipeContainer.insertAdjacentHTML('beforeend', recipeMarkup);
  })
  .catch((err) => {
    console.error(err);
  });
