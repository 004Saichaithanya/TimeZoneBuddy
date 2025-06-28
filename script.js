const { DateTime, Interval } = luxon;

// Supported cities with their IANA timezones
const cityTimeZones = {
  "new york": "America/New_York",
  "london": "Europe/London",
  "mumbai": "Asia/Kolkata",
  "hyderabad": "Asia/Kolkata",
  "tokyo": "Asia/Tokyo",
  "sydney": "Australia/Sydney",
  "los angeles": "America/Los_Angeles",
  "paris": "Europe/Paris",
  "dubai": "Asia/Dubai",
  "singapore": "Asia/Singapore"
};

function findMeetingTimes() {
  const input = document.getElementById("citiesInput").value.toLowerCase();
  const cities = input.split(",").map(city => city.trim());

  if (cities.length < 2) {
    alert("Please enter at least two city names.");
    return;
  }

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  const allAvailabilityWindows = [];

  for (let city of cities) {
    const timezone = cityTimeZones[city];
    if (!timezone) {
      resultsDiv.innerHTML = `❌ Unknown city: "${city}". Please use a supported city.`;
      return;
    }

    const startLocal = DateTime.now().setZone(timezone).set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
    const endLocal   = DateTime.now().setZone(timezone).set({ hour: 20, minute: 0, second: 0, millisecond: 0 });

    allAvailabilityWindows.push(Interval.fromDateTimes(startLocal.toUTC(), endLocal.toUTC()));
  }

  // Find common overlap by intersecting windows progressively
  let commonOverlap = allAvailabilityWindows[0];
  for (let i = 1; i < allAvailabilityWindows.length; i++) {
    commonOverlap = commonOverlap.intersection(allAvailabilityWindows[i]);
    if (!commonOverlap || commonOverlap.isEmpty()) break;
  }

  if (!commonOverlap || commonOverlap.isEmpty()) {
    resultsDiv.innerHTML = `<p>❌ No overlapping availability found for all cities between 9:00 AM and 8:00 PM.</p>`;
    return;
  }

  // Midpoint of overlap as the suggested meeting time
  const suggestedMeetingUTC = commonOverlap.start.plus({
    minutes: commonOverlap.toDuration().as('minutes') / 2
  });

  let outputHTML = `
    <h3>✅ Common Available Time (UTC): ${commonOverlap.start.toFormat('HH:mm')} - ${commonOverlap.end.toFormat('HH:mm')}</h3>
    <h4>📅 Suggested Meeting Time in Each Local Time:</h4>
    <ul>
  `;

  for (let city of cities) {
    const timezone = cityTimeZones[city];
    const localTime = suggestedMeetingUTC.setZone(timezone).toFormat('hh:mm a');
    outputHTML += `<li><strong>${capitalize(city)}:</strong> ${localTime}</li>`;
  }

  outputHTML += `</ul>`;
  resultsDiv.innerHTML = outputHTML;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
