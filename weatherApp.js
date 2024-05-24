document.addEventListener("DOMContentLoaded", function () {
  const apiKey = '37424a67eade43c5a2f234512231603';
  const button = document.getElementById('button');
  const button1 = document.getElementById('button1');
  button1.style.visibility = 'hidden';

  button.addEventListener('click', function () {
    const country = document.getElementsByName('Country')[0].value;
    const state = document.getElementsByName('State')[0].value;
    const city = document.getElementsByName('City-County')[0].value;
    const query = `${city},${state},${country}`;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weather = data.current;
        const temperature = weather.temp_c;
        const feelsLike = weather.feelslike_c;
        const windChill = weather.windchill_c;
        const isCloudy = weather.cloud > 50 ? "cloudy" : "not cloudy";
        const isSunny = weather.is_day ? "sunny" : "not sunny";

        // Generate outfit suggestions based on weather and clothing preferences
        const outfitSuggestions = generateOutfitSuggestions(temperature, isCloudy, isSunny);

        // Save the weather information and outfit suggestions in a global variable
        window.weatherInfo = {
          temperature,
          feelsLike,
          windChill,
          isCloudy,
          isSunny,
          outfitSuggestions
        };

        // Show the "Suggestions?" button
        document.getElementById('button').style.display = 'none';
        document.getElementById('button1').style.visibility = 'visible';
      })
      .catch(error => {
        console.error(error);
        alert("Failed to get weather data. Please check your input and try again.");
      });
  });

  button1.addEventListener('click', function () {
    // Retrieve the weather information and outfit suggestions from the global variable
    const weatherInfo = window.weatherInfo;

    if (weatherInfo) {
      const gender = prompt("Please enter your gender (male or female):");
      const clothingPref = prompt("Please enter your clothing preferences (e.g., shirt, shorts):");

      // Use the weather information and outfit suggestions to generate a complete report
      const report = generateCompleteReport(weatherInfo, gender, clothingPref);

      const newTab = window.open('about:blank', '_blank');
      newTab.document.write(report);
    } else {
      alert("Please click the 'Get Weather' button first to fetch weather data.");
    }
  });

  function generateOutfitSuggestions(temperature, isCloudy, isSunny) {
    let suggestions = "Outfit Suggestions: ";

    // Temperature-based suggestions
    if (temperature > 25) {
      suggestions += "It's hot! Wear light clothing like shorts and a T-shirt.";
    } else if (temperature > 10) {
      suggestions += "It's warm. Consider wearing jeans and a light top.";
    } else {
      suggestions += "It's cold. Bundle up with a jacket, sweater, and pants.";
    }

    // Weather condition-based suggestions
    if (isSunny === "sunny") {
      suggestions += " Don't forget sunglasses and sunscreen!";
    } else if (isCloudy === "cloudy") {
      suggestions += " Bring an umbrella just in case of rain.";
    }

    return suggestions;
  }

  function generateCompleteReport(weatherInfo, gender, clothingPref) {
    // Generate a complete report combining weather information, outfit suggestions, gender, and clothing preferences
    const report = `
      <h1>Weather-App Outfit Generator</h1>
      <p>Temperature: ${weatherInfo.temperature}°C</p>
      <p>Feels Like: ${weatherInfo.feelsLike}°C</p>
      <p>Wind Chill: ${weatherInfo.windChill}°C</p>
      <p>Cloudy: ${weatherInfo.isCloudy}</p>
      <p>Sunny: ${weatherInfo.isSunny}</p>
      <p>Outfit Suggestions: ${weatherInfo.outfitSuggestions}</p>
      <p>Gender: ${gender}</p>
      <p>Clothing Preferences: ${clothingPref}</p>
    `;

    return report;
  }
});
