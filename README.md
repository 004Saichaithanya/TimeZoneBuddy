# 🌐 Time Zone Meeting Scheduler

A simple, web-based tool to help users from different time zones find a suitable time for virtual meetings. The app takes two or more city names and calculates overlapping time windows where all participants are available between **9:00 AM and 8:00 PM** in their local timezones. It then suggests an ideal meeting time and displays it in each participant's local time.

---

## 📌 Features

- Supports multiple cities across different time zones
- Calculates overlapping time windows based on local working hours (9:00 AM – 8:00 PM)
- Suggests a suitable meeting time at the midpoint of the common availability
- Displays the meeting time in each participant's local time zone
- Purely browser-based — no backend or server needed

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- [Luxon](https://moment.github.io/luxon/) — for reliable time zone conversions and date-time operations

---

## 🌍 Supported Cities

- New York
- London
- Mumbai
- Hyderabad
- Tokyo
- Sydney
- Los Angeles
- Paris
- Dubai
- Singapore

*(You can easily add more in the `cityTimeZones` object in `script.js`)*

---

## 🚀 How to Run

1. Clone or download this repository.
2. Open the `index.html` file in your browser.
3. Enter two or more supported city names separated by commas (e.g., `New York, London, Mumbai`).
4. Click **"Find Overlapping Times"**.
5. See the overlapping time window and suggested meeting time in each local timezone.

---

## 📸 Example

**Input:**  
`New York, London, Mumbai`

**Output:**  
✅ Common Available Time (UTC): 13:00 - 15:30  
📅 Suggested Meeting Time:
- New York: 09:45 AM
- London: 02:45 PM
- Mumbai: 07:15 PM

---




## 📂 Project Structure

```

time-zone-meeting-scheduler/
├── index.html       # Main HTML page
├── style.css        # Styling for the page
├── script.js        # App logic and time zone calculations
├── README.md        # Project documentation

```

---

## 📌 Future Improvements (Optional)

- Allow users to select their custom availability hours
- Add more cities dynamically using an API (like `worldtimeapi.org`)
- Display overlapping windows on an interactive timeline UI
- Export suggested meeting times as calendar invites

---

## 📃 License

This project is open-source and free to use for educational and personal projects.
