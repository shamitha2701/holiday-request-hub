Holiday Request Hub

A modern frontend application for managing employee holiday requests.
This project features a static dashboard UI with a dynamic Holiday Requests module integrated using a mock backend (JSON Server)

Live Demo: https://holiday-request-hub.vercel.app

Features
Static Dashboard UI
Summary cards
Charts & statistics
Clean and responsive layout
Holiday Requests (Dynamic)
Fetch holiday requests from API
Display employee leave details
Status handling (Pending / Approved / Rejected)
Client-side Filtering & Sorting
Pagination for better UX
Responsive Design (Desktop & Mobile)

Tech Stack
 Frontend: React (Vite)
 Styling: CSS / Tailwind CSS
 Backend (Mock): JSON Server
 Deployment: Vercel

Getting Started (Run Locally)
Follow these steps to run the project on your local machine:

1) Clone the Repository
git clone https://github.com/your-username/holiday-request-hub.git
cd holiday-request-hub

2️) Install Dependencies
npm install

3️) Start JSON Server (Mock API)
npx json-server --watch db.json --port 4000

Make sure db.json is present in the root folder.

4️) Start the React App
npm run dev


App will run on:
http://localhost:5173
API will run on:
http://localhost:4000

Component Structure
src/
│── components/
│   ├── layout/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Navbar.jsx
│   │
│   ├── dashboard/
│   │   ├── SummaryCards.jsx
│   │   ├── WorkingHoursChart.jsx
│   │   ├── DonutStats.jsx
│   │   └── HolidayRequestsStatic.jsx
│   │
│   └── holidayRequests/
│       ├── HolidayRequests.jsx
│       ├── RequestTable.jsx
│       ├── Filters.jsx
│       └── Pagination.jsx
│
│── pages/
│   └── Dashboard.jsx
│
│── services/
│   └── api.js
│
│── styles/
│   └── App.css
│
│── App.jsx
│── main.jsx

Component Explanation
Layout – Wraps the entire dashboard structure (Sidebar + Navbar + Content)
Sidebar – Navigation menu (static)
Navbar – Top bar with user actions and icons
SummaryCards – Displays static statistics
Charts – Static visual data (working hours, donut stats)
HolidayRequests – Dynamic section fetching API data
Filters & Pagination – Client-side data handling


API Usage & Endpoints
The application uses JSON Server as a mock backend.

Endpoints
Get All Holiday Requests
GET /holidays
Example Response
{
  "id": 1,
  "employeeName": "John Doe",
  "startDate": "2025-12-10",
  "endDate": "2025-12-12",
  "halfDay": false,
  "type": "Paid",
  "status": "Pending",
  "reason": "Family trip"
}

Update Holiday Status
PATCH /holidays/:id

Delete a Request
DELETE /holidays/:id

Notes
All dashboard sections are static except Holiday Request.
Filtering, sorting, and pagination are handled on the client-side
This project is designed to match a given Figma UI

Author
Shamitha
Frontend Developer | React Enthusiast
