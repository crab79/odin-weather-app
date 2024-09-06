import "./style.scss";
const button_find = document.querySelector('button#search');
const text_find = document.querySelector('input#search');
const button_c = document.querySelector('button#c');
const button_f = document.querySelector('button#f');
const loading = document.querySelector('dialog#loading');
let loading_text = document.querySelector('dialog#loading h1');
let unit = "metric";


async function find_weather(place, unit) {
    loading.showModal();
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}/next7days?unitGroup=${unit}&key=BF3M7227BV3YDJD9YV93QP2BM`, { mode: 'cors' });
    if (!response.ok && response.status === 400) {
        setTimeout(() => {
            loading_text.textContent = "Did not find the city. Please check your input.";
            setTimeout(() => {
                loading.close();
                loading_text.textContent = "loading...";
            }, 1000);
        }, 0); // Display the message immediately
        return;
    }
    const datas = await response.json();
    console.log(datas);
    let description_general = datas.description;
    for(let i = 0; i < 8; i++){
        let icon = datas.days[i].icon; //text --> img
        let description = datas.days[i].description;
        let humidity = datas.days[i].humidity;
        let temp = datas.days[i].temp;
        let temp_max = datas.days[i].tempmax;
        let temp_min = datas.days[i].tempmin;
        let precipprob = datas.days[i].precipprob;
        console.log(icon, description, humidity, temp);
    }
    console.log(description_general);
    loading.close();
    // if (datas.data.images === undefined) {
    //   alert(datas.meta.msg);
    //   return;
    // } else {
    //   img.src = datas.data.images.original.url;
    // }
  }

// async function find_img(text) {
//     const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=eCVJCElMiCVVVUjPJl3b0wjsAC3lb5PJ&s=${text}`, { mode: 'cors' })
//     const datas = await response.json();
//     console.log(datas);
//     if (datas.data.images === undefined) {
//       alert(datas.meta.msg);
//       return;
//     } else {
//       img.src = datas.data.images.original.url;
//     }
//   }

async function display_weather(){
    
}

button_find.addEventListener('click', () => {
    let text = text_find.value;
    find_weather(text, unit);  
})

button_c.addEventListener('click', () =>{
    unit = "metric";
    button_c.classList.add("click"); 
    button_f.classList.remove("click"); 
})
button_f.addEventListener('click', () =>{
    unit = "us";
    button_f.classList.add("click"); 
    button_c.classList.remove("click");  
})
