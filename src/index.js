import { format, addDays } from "date-fns";
import "./style.scss";
import iconMap from "./icons";

const button_find = document.querySelector("button#search");
const button_gif_find = document.querySelector("button#gif_search");
const text_find = document.querySelector("input#search");
const button_c = document.querySelector("button#c");
const button_f = document.querySelector("button#f");
const loading = document.querySelector("dialog#loading");
const container = document.querySelector("div#infos")
const description_general = document.querySelector("h1#general_desc");

let loading_text = document.querySelector("dialog#loading h1");
let unit = "metric";
let weather = {};

async function find_weather(place, unit) {  
  try {
    container.textContent = "";
    description_general.textContent = "";
    loading.showModal();
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/next7days?unitGroup=${unit}&key=BF3M7227BV3YDJD9YV93QP2BM`,
      { mode: "cors" }
    );

    if (!response.ok && response.status === 400) {
      throw new Error("Did not find the city. Please check your input.");
    }

    const datas = await response.json();
    console.log(datas);

    for (let i = 0; i < 8; i++) {
      const weather = {
        icon: datas.days[i].icon,
        temp: datas.days[i].temp,
        temp_max: datas.days[i].tempmax,
        temp_min: datas.days[i].tempmin,
        humidity: datas.days[i].humidity,
        precipprob: datas.days[i].precipprob,
        description: datas.days[i].description,
        description_general: datas.description,
      };
      display_weather(weather, i, unit);
    }

  } catch (error) {
    showLoadingMessage(error.message);
  } finally {
    loading.close();
    loading_text.textContent = "loading...";

  }
}

async function find_img(text) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=eCVJCElMiCVVVUjPJl3b0wjsAC3lb5PJ&s=${text}`,
      { mode: "cors" }
    );

    const datas = await response.json();
    console.log(datas);

    if (!datas.data.images) {
      throw new Error(datas.meta.msg);
    }

    return datas.data.images.original.url;

  } catch (error) {
    showLoadingMessage(error.message + ", please use normal search");
    return null;
  }
}


async function display_weather(obj, i, unit) {
  const info = document.createElement("div");
  const img = document.createElement("img");
  const temp = document.createElement("h1");
  const temp_group = document.createElement("div");
  const temp_max = document.createElement("h2");
  const temp_min = document.createElement("h2");
  const humidity = document.createElement("h2");
  const precipprob = document.createElement("h1");
  const description = document.createElement("p");
  info.className = "info";
  temp_group.className = "temp_min_max";
  temp_max.className = "temp_min_max";
  temp_min.className = "temp_min_max";
  humidity.className = "humidity";

  description_general.textContent = obj.description_general;

  if (unit == "metric") {
    unit = "C";
  }else if(unit == "us"){
    unit = "F";
  }

  for (const key in obj) {
    switch (key) {
      case "icon":
        if (button_gif_find.classList.contains("click")) {
          const imgUrl = await find_img(obj[key]);
          if (imgUrl) {
            // check if imgUrl is valid before assigning
            img.src = imgUrl;
          }
        } else {
          img.src = iconMap[obj[key]];
        }
        break;
      case "temp":
        temp.textContent = `Temp: ${obj[key]}°${unit}`;
        break;
      case "temp_max":
        temp_max.textContent = `Temp_max ${obj[key]}°${unit}`;
        break;
      case "temp_min":
        temp_min.textContent = `Temp_min ${obj[key]}°${unit}`;
        break;
      case "humidity":
        humidity.textContent = `Humidity: ${obj[key]}%`;
        break;
      case "precipprob":
        precipprob.textContent = `Precipitation: ${obj[key]}%`;
        break;
      case "description":
        description.textContent = obj[key];
        break;
    }
  }

  display_date(i, info);
  
  temp_group.append(temp_max, temp_min);
  container.append(info);
  info.append(img, temp, temp_group, humidity, precipprob, description);
}

function display_date(i, info) {
  const date = document.createElement("h1");
  const today = new Date();
  date.id = "date";
  date.textContent = format(addDays(today, i), "yyyy-MM-dd");

  info.append(date);
}

function showLoadingMessage(message) {
  setTimeout(() => {
    loading.showModal()
    loading_text.textContent = message;
    setTimeout(() => {
      loading.close();
      loading_text.textContent = "loading...";
    }, 3000);
  }, 0); }

button_find.addEventListener("click", () => {
  let text = text_find.value;
  button_gif_find.classList.remove("click");

  find_weather(text, unit);
});

button_gif_find.addEventListener("click", () => {
  let text = text_find.value;
  button_gif_find.classList.add("click");

  find_weather(text, unit);
});

button_c.addEventListener("click", () => {
  unit = "metric";
  button_c.classList.add("click");
  button_f.classList.remove("click");
});
button_f.addEventListener("click", () => {
  unit = "us";
  button_f.classList.add("click");
  button_c.classList.remove("click");
});
