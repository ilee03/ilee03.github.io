// Constants for calculations
const CO2_PER_GB = 0.00042; // kg of CO2 produced per GB of data transferred
const DATA_PER_PAGE_LOAD = 2; // Average data transferred per page load in MB

// Function to show the pop-up
function showPopup(event) {
    const popup = document.getElementById('carbonPopup');
    const carbonAmount = document.getElementById('carbonAmount');
    
    // Calculate carbon emissions based on the current page
    carbonAmount.innerText = calculateCarbonEmission();

    popup.style.display = 'block';
    popup.style.left = `${event.clientX}px`;
    popup.style.top = `${event.clientY}px`;
    popup.classList.add('visible');
}

// Function to hide the pop-up
function hidePopup() {
    const popup = document.getElementById('carbonPopup');
    popup.classList.remove('visible');
    popup.style.display = 'none';
}

// Function to calculate carbon emissions based on data transferred
function calculateCarbonEmission() {
    // Estimate data transferred for the current page load
    const dataTransferredMB = DATA_PER_PAGE_LOAD; // in MB
    const dataTransferredGB = dataTransferredMB / 1024; // Convert MB to GB

    // Calculate CO2 emissions
    const carbonEmission = (dataTransferredGB * CO2_PER_GB).toFixed(4); // kg
    return carbonEmission;
}

// Event listeners for mouse hover
document.addEventListener('mousemove', showPopup);
document.addEventListener('mouseleave', hidePopup);
