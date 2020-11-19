import axios from "axios";

const userList = document.querySelector("#user-list");
const restaurantList = document.querySelector("#restaurants-list");
const reservationsList = document.querySelector("#reservations-list");

const renderUsers = (users) => {
  const html = users
    .map(
      (user) => `
    <li>
        <a href='#${user.id}'>
            ${user.name}
        </a>
    </li>
    `
    )
    .join("");
  userList.innerHTML = html;
};

const renderRestaurants = (restaurants) => {
  const html = restaurants
    .map(
      (restaurant) => `
      <li>
        ${restaurant.name}
      </li>
      `
    )
    .join("");
  restaurantList.innerHTML = html;
};

//dont really know what is happening with line 41...
const renderReservations = (reservations) => {
  const html = reservations
    .map(
      (reservation) => `
        <li>
          ${reservation}
        </li>
        `
    )
    .join("");
  reservationsList.innerHTML = html;
};

const init = async () => {
  try {
    const users = (await axios.get("/api/users")).data;
    const restaurants = (await axios.get("/api/restaurants")).data;
    renderUsers(users);
    renderRestaurants(restaurants);
    renderReservations(reservations);
  } catch (ex) {
    console.log(ex);
  }
};

window.addEventListener("hashchange", async () => {
  const userId = window.location.hash.slice(1);
  const url = `/api/users/${userId}/reservations`;
  const reservations = (await axios(url)).data;
  renderReservations(reservations);
});

init();
