var City = document.getElementById("city");
var Searchbtn = document.getElementById("Searchbtn");

var Temp = document.getElementById("temp");
var Decrip = document.getElementById("description");
var Icon = document.getElementById("ic");

const API_Key = "42ce272a206b219a536f715aa6281f86";

function convertion(val) {
  return (val - 273.15).toFixed(0);
}

let count = 0;

Searchbtn.addEventListener("click", function () {
  if (!City.value) {
    alert("Please Enter the city Name");
  } else {
    count++;
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        City.value +
        "&appid=" +
        API_Key
    )
      .then((res) => res.json())
      .then((data) => {
        var Tempval = data["main"]["temp"];
        var Descripval = data["weather"]["0"]["main"];

        Temp.innerHTML = convertion(Tempval) + "\u00B0" + "C";
        Decrip.innerHTML = Descripval;

        // Remove existing icon before adding a new one
        while (Icon.firstChild) {
          Icon.removeChild(Icon.firstChild);
        }

        // Add new icon based on weather description
        var Span = document.createElement("span");
        Span.setAttribute("class", "sourceText");
        if (Descripval == "Clouds") {
          Span.innerHTML = '<i class="fa-solid fa-cloud"></i></i>';
        } else if (Descripval == "Clear") {
          Span.innerHTML = '<i class="fa-solid fa-cloud-sun"></i>';
        } else if (Descripval == "Haze") {
          Span.innerHTML = '<i class="fa-solid fa-smog"></i>';
          // Reload the page if city value changes and description is Haze
          if (City.value !== City.value) window.location.reload();
        }
        Icon.appendChild(Span);
      })
      .catch((err) => alert("Something Wrong!!! \u{1F622}"));
  }
});
