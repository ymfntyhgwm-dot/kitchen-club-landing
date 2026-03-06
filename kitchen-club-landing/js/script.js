// === Календарь ===
const datesContainer = document.getElementById("dates");
const monthName = document.getElementById("month");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Пример событий
const events = {
  "2026-03-06": "Мастер-класс: шоколадные кексы 12:00-15:00",
  "2026-03-07": "Мастер-класс: украшение тортов 14:00-17:00",
  "2026-03-08": "Мастер-класс: пирожные 11:00-14:00",
  "2026-03-09": "Мастер-класс: круассаны 10:00-13:00",
  "2026-03-10": "Мастер-класс: пончики 12:00-15:00",
  "2026-03-11": "Мастер-класс: итальянская паста с креветками 13:00-16:30",
  "2026-03-12": "Мастер-класс: тарталетки со вкусом на ваш выбор 12:00-15:00",
  "2026-03-13": "Мастер-класс: лимонады 17:00-18:00"
};

function renderCalendar(month, year) {
  datesContainer.innerHTML = "";
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // пустые ячейки перед первым днём месяца
  let emptyDivs = (firstDay + 6) % 7;
  for (let i = 0; i < emptyDivs; i++) {
    const emptyDiv = document.createElement("div");
    datesContainer.appendChild(emptyDiv);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");

    const dateObj = new Date(year, month, i);
    const dateStr = year + "-" + String(month + 1).padStart(2,'0') + "-" + String(i).padStart(2,'0');

    if(dateObj < today){
      dayDiv.classList.add("past");
      dayDiv.dataset.event = "";
    } else {
      dayDiv.dataset.event = events[dateStr] || "Событие пока не выбрано";
      if(events[dateStr]) dayDiv.classList.add("event");
    }

    dayDiv.textContent = i;

    dayDiv.addEventListener("click", () => {
      if(dayDiv.dataset.event){
        alert(dayDiv.dataset.event);
      }
    });

    datesContainer.appendChild(dayDiv);
  }

  monthName.textContent = new Date(year, month).toLocaleString('ru-RU', { month: 'long' }) + " " + year;
}

// Листание месяцев
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if(currentMonth < 0){ currentMonth = 11; currentYear--; }
  renderCalendar(currentMonth, currentYear);
});
nextBtn.addEventListener("click", () => {
  currentMonth++;
  if(currentMonth > 11){ currentMonth = 0; currentYear++; }
  renderCalendar(currentMonth, currentYear);
});

// Инициализация календаря
renderCalendar(currentMonth, currentYear);

// === Рецепт дня ===
const recipes = [
  {
    title: "Шоколадные маффины",
    description: "Нежные маффины с кусочками темного шоколада. Отлично к кофе!",
    img: "img/5285242297987568999.png",
    ingredients: ["Мука — 150 г", "Сахар — 100 г", "Шоколад — 50 г", "Яйца — 2 шт", "Молоко — 100 мл"]
  },
  {
    title: "Паста с креветками",
    description: "Итальянская паста с креветками и сливочным соусом.",
    img: "img/convertio.in_5285242297987569121.png",
    ingredients: ["Паста — 200 г", "Креветки — 150 г", "Чеснок — 2 зубчика", "Сливки — 100 мл", "Оливковое масло — 1 ст.л."]
  },
  {
    title: "Салат Цезарь",
    description: "Классический салат с курицей и соусом Цезарь.",
    img: "img/convertio.in_5285242297987569046",
    ingredients: ["Куриное филе — 150 г", "Листья салата — 100 г", "Сухарики — 50 г", "Сыр Пармезан — 30 г", "Соус Цезарь — 2 ст.л."]
  }
];

function showDailyRecipe() {
  const todayIndex = new Date().getDate() % recipes.length;
  const recipe = recipes[todayIndex];

  const card = document.querySelector(".recipe-card");
  if(!card) return;

  const imgEl = card.querySelector("img");
  const titleEl = card.querySelector(".recipe-info h3");
  const descEl = card.querySelector(".recipe-info p");
  const ulEl = card.querySelector(".recipe-info ul");

  imgEl.src = recipe.img;
  titleEl.textContent = recipe.title;
  descEl.textContent = recipe.description;

  ulEl.innerHTML = "";
  recipe.ingredients.forEach(ing => {
    const li = document.createElement("li");
    li.textContent = ing;
    ulEl.appendChild(li);
  });
// Анимация рецепта при скролле
function animateOnScroll(element) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.3 } // появление, когда 30% блока в зоне видимости
  );
  observer.observe(element);
}

// Применяем к рецепту дня
const dailyRecipeSection = document.querySelector('.daily-recipe');
if(dailyRecipeSection) animateOnScroll(dailyRecipeSection);
  // Добавляем анимацию
  card.classList.add("fade-in");
}
showDailyRecipe();

// === Отзывы ===
const reviewEls = document.querySelectorAll(".review");

function animateOnScroll() {
  const revealElements = document.querySelectorAll(".fade-in, .review");
  const windowBottom = window.innerHeight + window.scrollY;

  revealElements.forEach(el => {
    if(el.offsetTop < windowBottom - 50){
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    } else {
      el.style.opacity = 0;
      el.style.transform = "translateY(30px)";
    }
  });
}

// Начальное состояние для анимации
document.querySelectorAll(".fade-in, .review").forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
});

// Отслеживание скролла
window.addEventListener("scroll", animateOnScroll);
animateOnScroll(); // проверка при загрузке страницы