const flowerField = document.getElementById('flower-field');
const tempValue = document.getElementById('temp-value');
const windspeedValue = document.getElementById('windspeed-value');

// Starting page transition
document.getElementById('start-btn').addEventListener('click', () => {
  const splashScreen = document.getElementById('splash-screen');
  const mainContent = document.getElementById('main-content');

  // Hide splash screen and show main content with smooth transition
  splashScreen.style.display = 'none';
  mainContent.style.display = 'block';

  // Fade in main content after it is shown
  setTimeout(() => {
    mainContent.style.opacity = 1;
  }, 100);
});

// Your original functionality code

// Create flower with tooltip to exclude country name
function createFlower(x, y, size, climateData, countryName) {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;
  flower.style.width = `${size}px`;
  flower.style.height = `${size}px`;
  flower.style.opacity = `${Math.random() * 0.5 + 0.5}`; // Random opacity for variation
  flower.style.background = `radial-gradient(circle, 
    ${randomColor()} 20%, 
    ${randomColor()} 60%, 
    transparent 100%)`; // Dynamic colors for flowers

  // Add hover events for tooltip excluding the country name
  flower.addEventListener('mouseover', (e) => {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'block';
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
    tooltip.innerText = `Temperature: ${climateData.temp.toFixed(1)}°F\nWind Speed: ${climateData.windSpeed.toFixed(1)} mph`;
  });

  flower.addEventListener('mouseout', () => {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
  });

  flowerField.appendChild(flower);
}


// Function to generate flowers with correct position and tooltip data
function generateFlowers(climateData, countryName) {
  flowerField.innerHTML = ''; // Clear existing flowers

  const flowerCount = 100;
  const maxTemp = 100; // max temperature for scaling
  const minTemp = 30; // min temperature for scaling

  for (let i = 0; i < flowerCount; i++) {
    const size = Math.random() * 30 + 10;

    // Calculate position based on temperature, with higher temperature influencing vertical position
    const tempFactor = (climateData.temp - minTemp) / (maxTemp - minTemp); // Normalize temperature between 0 and 1
    const y = Math.random() * (window.innerHeight - 100) + 100; // Start slightly below offsetTop
    const x = Math.random() * window.innerWidth; // Random x position across the screen

    createFlower(x, y, size, climateData, countryName); // Pass the countryName here
  }
}
// Select all location buttons
const locationButtons = document.querySelectorAll('.location-btn');

// Attach click event listener to all buttons
locationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const countryName = button.innerText; // Get the name of the location from the button text
    const latLong = getLatLongFromCountry(countryName); // Fetch latitude and longitude for the location

    updateVisualization(latLong.lat, latLong.lon, countryName); // Update data visualization
    handleButtonColorChange(button); // Change the color of the clicked button
  });
});

// Function to map country name to latitude and longitude
function getLatLongFromCountry(countryName) {
  const countryCoords = {
    "Berlin, Germany": { lat: 52.52, lon: 13.41 },
    "New York, USA": { lat: 40.7128, lon: -74.0060 },
    "Los Angeles, USA": { lat: 34.0522, lon: -118.2437 },
    "London, UK": { lat: 51.5074, lon: -0.1278 },
    "Rhode Island, USA": { lat: 41.6809, lon: -71.5118 },
    "Tokyo, Japan": { lat: 35.6762, lon: 139.6503 },
    "Zurich, Switzerland": { lat: 47.3769, lon: 8.5417 },
    "Virginia, USA": { lat: 37.4316, lon: -78.6569 },
    "Sydney, Australia": { lat: -33.8688, lon: 151.2093 },
    "Mumbai, India": { lat: 19.0760, lon: 72.8777 },
    "Cape Town, South Africa": { lat: -33.9249, lon: 18.4241 },
    "Paris, France": { lat: 48.8566, lon: 2.3522 },
    "Buenos Aires, Argentina": { lat: -34.6037, lon: -58.3816 },
    "Beijing, China": { lat: 39.9042, lon: 116.4074 },
    "Moscow, Russia": { lat: 55.7558, lon: 37.6173 },
    "Cairo, Egypt": { lat: 30.0444, lon: 31.2357 },
    "Mexico City, Mexico": { lat: 19.4326, lon: -99.1332 },
    "Rome, Italy": { lat: 41.9028, lon: 12.4964 },
    "Chicago, USA": { lat: 41.8781, lon: -87.6298 },
    "Seattle, USA": { lat: 47.6062, lon: -122.3321 },
    "Dallas, USA": { lat: 32.7767, lon: -96.7970 },
    "Miami, USA": { lat: 25.7617, lon: -80.1918 },
    "Seoul, South Korea": { lat: 37.5665, lon: 126.9780 },
    "Singapore": { lat: 1.3521, lon: 103.8198 },
    "Madrid, Spain": { lat: 40.4168, lon: -3.7038 },
    "Nairobi, Kenya": { lat: -1.2867, lon: 36.8219 }
  };

  // Return the coordinates for the selected location, default to {lat: 0, lon: 0} if not found
  return countryCoords[countryName] || { lat: 0, lon: 0 };
}// Get all button elements
const buttons = document.querySelectorAll('button');

// Add hover effect for buttons (except the selected one)
buttons.forEach(button => {
  button.addEventListener('mouseover', () => {
    if (!button.classList.contains('selected')) {
      button.style.backgroundColor = '#00bbff'; // Set hover color
    }
  });

  button.addEventListener('mouseout', () => {
    if (!button.classList.contains('selected')) {
      button.style.backgroundColor = ''; // Reset to original color if not selected
    }
  });
});

// Function to change the color of the selected button
function handleButtonColorChange(clickedButton) {
  const buttons = document.querySelectorAll('.location-btn'); // Get all location buttons
  buttons.forEach((button) => {
    if (button === clickedButton) {
      button.style.backgroundColor = 'lightpink'; // Change color of clicked button to light pink
      button.classList.add('selected'); // Mark button as selected
    } else {
      button.style.backgroundColor = ''; // Reset color for other buttons
      button.classList.remove('selected'); // Remove selected class
    }
  });
}



// Update the visualization with weather data or other info
function updateVisualization(latitude, longitude, countryName) {
  const data = fetchWeatherData(latitude, longitude); // Get data based on latitude and longitude
  tempValue.innerText = data.temp.toFixed(1); // Set temperature value in display
  windspeedValue.innerText = data.windSpeed.toFixed(1); // Set wind speed value in display
  updateCountryName(countryName); // Update the country name on the tooltip and the info box
  generateFlowers(data, countryName); // Generate flowers based on data (optional visual element)
}

// Function to generate flowers based on climate data (for visual effect)
function generateFlowers(climateData, countryName) {
  flowerField.innerHTML = ''; // Clear existing flowers

  const flowerCount = 100;
  const maxTemp = 100;
  const minTemp = 30;

  for (let i = 0; i < flowerCount; i++) {
    const size = Math.random() * 30 + 10;
    const tempFactor = (climateData.temp - minTemp) / (maxTemp - minTemp);
    const y = Math.random() * (window.innerHeight - 100) + 100;
    const x = Math.random() * window.innerWidth;

    createFlower(x, y, size, climateData, countryName);
  }
}


// Helper function to generate random colors
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.8)`; // Semi-transparent colors
}

// Fetch real weather data from Open-Meteo API
async function fetchWeatherData(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`
    );
    const data = await response.json();
    console.log(data); // Log the data to check if it's being fetched correctly

    // Extract temperature and wind speed data (using the first available hourly data)
    const temp = data.hourly.temperature_2m[0]; // Temperature in Fahrenheit
    const windSpeed = data.hourly.wind_speed_10m[0]; // Wind speed in mph
    return { temp, windSpeed };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      temp: 68, // Default temperature in Fahrenheit
      windSpeed: 10, // Default wind speed in mph
    };
  }
}

// async function generateFlowers(climateData) {
//   flowerField.innerHTML = ''; // Clear existing flowers

//   // Dynamically set animation speed and sway based on wind speed
//   const swaySpeed = climateData.windSpeed > 5 ? 1 / climateData.windSpeed : 2; // Faster wind -> Faster sway
//   const swayRange = climateData.windSpeed > 2 ? '-15deg' : '20deg'; // Greater sway for faster wind
//   const styleTag = document.createElement('style');
//   styleTag.innerHTML = `
//     @keyframes sway {
//       0% { transform: rotate(0deg); }
//       50% { transform: rotate(${swayRange}); }
//       100% { transform: rotate(0deg); }
//     }
//     .flower {
//       animation: sway ${swaySpeed}s infinite ease-in-out;
//     }
//   `;
//   document.head.appendChild(styleTag);

//   // Calculate the offset to push flowers below the first section
//   const offsetTop = document.querySelector('#climate-info').offsetHeight + 
//                     document.querySelector('div').offsetHeight - 90; // Reduced padding to 20px

//   // Set flower position based on temperature
//   const flowerCount = 100;
//   const maxTemp = 100; // max temperature for scaling
//   const minTemp = 30; // min temperature for scaling

//   for (let i = 0; i < flowerCount; i++) {
//     const size = Math.random() * 30 + 10;

//     // Calculate position based on temperature, with higher temperature influencing vertical position
//     const tempFactor = (climateData.temp - minTemp) / (maxTemp - minTemp); // Normalize temperature between 0 and 1
//     const y = Math.random() * (window.innerHeight - offsetTop) + offsetTop; // Start slightly below offsetTop
//     const x = Math.random() * window.innerWidth; // Random x position across the screen

//     createFlower(x, y, size, climateData);
//   }
// }


async function generateFlowers(climateData) {
  flowerField.innerHTML = ''; // Clear existing flowers

  // Dynamically set animation speed and sway based on wind speed
  const swaySpeed = climateData.windSpeed > 5 ? 1 / climateData.windSpeed : 2; // Faster wind -> Faster sway
  const swayRange = climateData.windSpeed > 2 ? '-15deg' : '20deg'; // Greater sway for faster wind
  const styleTag = document.createElement('style');
  styleTag.innerHTML = `
    @keyframes sway {
      0% { transform: rotate(0deg); }
      50% { transform: rotate(${swayRange}); }
      100% { transform: rotate(0deg); }
    }
    .flower {
      animation: sway ${swaySpeed}s infinite ease-in-out;
    }
  `;
  document.head.appendChild(styleTag);

  // Calculate the offset to push flowers below the first section
  const offsetTop = document.querySelector('#climate-info').offsetHeight + 
                    document.querySelector('div').offsetHeight - 90; // Reduced padding to 20px

  // Set flower position based on temperature
  const flowerCount = 100;
  const maxTemp = 100; // max temperature for scaling
  const minTemp = 30; // min temperature for scaling

  // Divide the area into 5 sections
  const sections = 5;
  const sectionHeight = window.innerHeight / sections;

  // Normalize the temperature
  const tempFactor = (climateData.temp - minTemp) / (maxTemp - minTemp); // Normalize temperature between 0 and 1
  const numSections = Math.floor(tempFactor * sections) + 1; // Number of sections to cover (1 to 5 sections)

  // If temperature is low, use only section 2
  const sectionsToCover = numSections === 1 ? [1] : Array.from({ length: numSections }, (_, i) => i + 1);

  for (let i = 0; i < flowerCount; i++) {
    const size = Math.random() * 30 + 10;

    // Randomly choose a section within the range of covered sections
    const section = sectionsToCover[Math.floor(Math.random() * sectionsToCover.length)];

    // Calculate y position based on section
    const y = (section - 1) * sectionHeight + Math.random() * sectionHeight;

    // Random x position
    const x = Math.random() * window.innerWidth;

    // Create flower based on calculated positions
    createFlower(x, y, size, climateData);
  }
}


async function updateVisualization(latitude, longitude) {
  const data = await fetchWeatherData(latitude, longitude);

  // Update the temperature and wind speed on the page
  tempValue.innerText = data.temp.toFixed(1);
  windspeedValue.innerText = data.windSpeed.toFixed(1);

  // Generate flowers based on the fetched data
  generateFlowers(data);
}

// Function to repeatedly fetch the weather data and update the visualization
function startContinuousUpdate(latitude, longitude, intervalTime = 1800000) {
  // Fetch and update immediately
  updateVisualization(latitude, longitude);

  // Set interval to fetch and update every 'intervalTime' milliseconds (e.g., 30 minutes)
  setInterval(() => {
    updateVisualization(latitude, longitude);
  }, intervalTime);
}


// Location click event listeners
document.getElementById('location-berlin').addEventListener('click', () => {
  updateVisualization(52.52, 13.41); // Berlin coordinates
});

document.getElementById('location-nyc').addEventListener('click', () => {
  updateVisualization(40.7128, -74.0060); // New York coordinates
});

document.getElementById('location-la').addEventListener('click', () => {
  updateVisualization(34.0522, -118.2437); // Los Angeles coordinates
});

document.getElementById('location-london').addEventListener('click', () => {
  updateVisualization(51.5074, -0.1278); // London coordinates
});

document.getElementById('location-ri').addEventListener('click', () => {
  updateVisualization(41.5801, -71.5118); // Rhode Island, USA coordinates
});

document.getElementById('location-tokyo').addEventListener('click', () => {
  updateVisualization(35.6762, 139.6503); // Tokyo, Japan coordinates
});

document.getElementById('location-zurich').addEventListener('click', () => {
  updateVisualization(47.3769, 8.5417); // Zurich, Switzerland coordinates
});

document.getElementById('location-virginia').addEventListener('click', () => {
  updateVisualization(37.4316, -78.6569); // Virginia, USA coordinates
});

// Add event listeners for the new countries
document.getElementById('location-sydney').addEventListener('click', () => {
  updateVisualization(-33.8688, 151.2093); // Sydney, Australia coordinates
});

document.getElementById('location-mumbai').addEventListener('click', () => {
  updateVisualization(19.0760, 72.8777); // Mumbai, India coordinates
});

document.getElementById('location-cape-town').addEventListener('click', () => {
  updateVisualization(-33.9249, 18.4241); // Cape Town, South Africa coordinates
});

document.getElementById('location-paris').addEventListener('click', () => {
  updateVisualization(48.8566, 2.3522); // Paris, France coordinates
});

document.getElementById('location-buenos-aires').addEventListener('click', () => {
  updateVisualization(-34.6037, -58.3816); // Buenos Aires, Argentina coordinates
});

document.getElementById('location-beijing').addEventListener('click', () => {
  updateVisualization(39.9042, 116.4074); // Beijing, China coordinates
});

document.getElementById('location-moscow').addEventListener('click', () => {
  updateVisualization(55.7558, 37.6173); // Moscow, Russia coordinates
});

document.getElementById('location-cairo').addEventListener('click', () => {
  updateVisualization(30.0444, 31.2357); // Cairo, Egypt coordinates
});

document.getElementById('location-mexico-city').addEventListener('click', () => {
  updateVisualization(19.4326, -99.1332); // Mexico City, Mexico coordinates
});

document.getElementById('location-rome').addEventListener('click', () => {
  updateVisualization(41.9028, 12.4964); // Rome, Italy coordinates
});
// Additional USA Locations
document.getElementById('location-chicago').addEventListener('click', () => {
  updateVisualization(41.8781, -87.6298); // Chicago, USA coordinates
});

document.getElementById('location-seattle').addEventListener('click', () => {
  updateVisualization(47.6062, -122.3321); // Seattle, USA coordinates
});

document.getElementById('location-dallas').addEventListener('click', () => {
  updateVisualization(32.7767, -96.7970); // Dallas, USA coordinates
});

document.getElementById('location-miami').addEventListener('click', () => {
  updateVisualization(25.7617, -80.1918); // Miami, USA coordinates
});

// Additional International Locations
document.getElementById('location-seoul').addEventListener('click', () => {
  updateVisualization(37.5665, 126.9780); // Seoul, South Korea coordinates
});

document.getElementById('location-singapore').addEventListener('click', () => {
  updateVisualization(1.3521, 103.8198); // Singapore coordinates
});

document.getElementById('location-madrid').addEventListener('click', () => {
  updateVisualization(40.4168, -3.7038); // Madrid, Spain coordinates
});

document.getElementById('location-nairobi').addEventListener('click', () => {
  updateVisualization(-1.286389, 36.817223); // Nairobi, Kenya coordinates
});




// Capture button event listener
document.getElementById('capture-button').addEventListener('click', () => {
  captureAndCreateArt();
});

// Function to capture and apply art effect
function captureAndCreateArt() {
  const flowerField = document.getElementById('flower-field');
  
  // Use html2canvas to capture just the flower field
  html2canvas(flowerField).then(canvas => {
    // Apply a filter to turn the captured image into art
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Apply a filter to create an art effect (e.g., invert colors for an artistic look)
    applyArtEffect(imageData, ctx);

    // Show the art canvas on the page or save it as an image
    document.body.appendChild(canvas); // Append the canvas to the body or use it elsewhere

    // Optionally, allow saving the image
    const link = document.createElement('a');
    link.href = canvas.toDataURL(); // Image as base64
    link.download = 'flower-art.png'; // Set the download file name
    link.click(); // Trigger download
  });
}

// Function to apply an art effect to the captured image (e.g., invert colors)
function applyArtEffect(imageData, ctx) {
  const data = imageData.data;

  // Example: Invert colors for an art effect
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // Red
    data[i + 1] = 255 - data[i + 1]; // Green
    data[i + 2] = 255 - data[i + 2]; // Blue
    // Alpha (data[i + 3]) is left unchanged
  }

  // Put the modified image data back onto the canvas
  ctx.putImageData(imageData, 0, 0);
}
// Capture button event listener
document.getElementById('capture-button').addEventListener('click', () => {
  captureAndCreateArt();
});
