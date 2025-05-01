// ==========================================================================
// Setup & Initial Data Loading
// ==========================================================================

const loadingScreen = document.getElementById("loadingScreen");
if (loadingScreen) {
  loadingScreen.classList.add("hidden");
  setTimeout(() => {
    loadingScreen.remove();
  }, 1000);
}

const toastLiveExample = document.getElementById("liveToast");
const globalToastInstance = new bootstrap.Toast(toastLiveExample, {
  delay: 4000,
});

function showToast(message, type = "success") {
  const isDark =
    document.documentElement.getAttribute("data-bs-theme") === "dark";
  const closeBtnClass = isDark ? "btn-close-white" : "";
  const bgType = type === "error" ? "danger" : type === "info" ? "info" : type;

  toastLiveExample.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close ${closeBtnClass} me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
  toastLiveExample.className = `toast align-items-center border-0 text-bg-${bgType}`;
  globalToastInstance.show();
}
let savedTheme = "";
let bookings = [];
let users = [];
let reports = [];
let currentAdmin = {};

try {
  savedTheme = localStorage.getItem("theme");
  bookings = JSON.parse(localStorage.getItem("bookings"));
  users = JSON.parse(localStorage.getItem("users"));
  reports = JSON.parse(localStorage.getItem("reports"));
  currentAdmin = JSON.parse(localStorage.getItem("currUser"));
  console.log(bookings);

  bookings.sort(
    (a, b) => new Date(b?.pickupDate || 0) - new Date(a?.pickupDate || 0)
  );
} catch (error) {
  console.error(error);
}

// ==========================================================================
// Constants & State
// ==========================================================================

const take = 8; // el max ele hyb2a fe el saf7a 3moman

const bookingStatusOptions = [
  "Pending",
  "Confirmed",
  "Ongoing",
  "Completed",
  "Cancelled",
];

// bn3mel zy object 3shan negm3 feeh kol el 7agat ele hnfilter 3ala asasha 3shan yeb2a readable aktar w yet3ml kolo filter m3 b3do

const bookingCriteria = {
  currentPage: 1,
  searchTerm: "",
  statusFilter: "",
  filteredData: [...bookings], //et3mlo filter foo2
};

const userCriteria = {
  currentPage: 1,
  searchTerm: "",
  filteredData: [...users],
};

// ==========================================================================
// Element References
// ==========================================================================

const reportChartCanvas = document.getElementById("reportChart");
const peakHoursChartCanvas = document.getElementById("peakHoursChart");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const htmlElement = document.documentElement;
const summaryCardElements = [
  document.getElementById("summaryCard1"),
  document.getElementById("summaryCard2"),
  document.getElementById("summaryCard3"),
  document.getElementById("summaryCard4"),
];
const customerListDiv = document.getElementById("customerList");
const noCustomersMessageDiv = document.getElementById("noCustomersMessage");
const adminAvatarImg = document.getElementById("adminAvatar");
const adminNameEl = document.getElementById("adminName");
const adminRegDateEl = document.getElementById("adminRegDate");
const logoutBtn = document.getElementById("logoutBtn");
const bookingsTableBody = document.getElementById("bookingsTableBody");
const noBookingsFilteredMessageDiv = document.getElementById(
  "noBookingsFilteredMessage"
);
const bookingSearchInput = document.getElementById("bookingSearchInp");
const bookingStatusFilterEl = document.getElementById("bookingStatFilter");
const bookingClearFiltersBtn = document.getElementById("bookingCriteriaClear");
const bookingPaginationContainer = document.getElementById("bookingPagination");
const usersTableBody = document.getElementById("usersTblBody");
const noUsersFilteredMessageDiv = document.getElementById(
  "noUsersFilteredMessage"
);
const userSearchInput = document.getElementById("userSearchInput");
const userClearFiltersBtn = document.getElementById("userClearFilters");
const userPaginationContainer = document.getElementById("userPagination");
const ctx = reportChartCanvas.getContext("2d");
const ctxPeak = peakHoursChartCanvas.getContext("2d");

let currentTheme =
  document.documentElement.getAttribute("data-bs-theme") || "light";
let isDark = currentTheme === "dark";
let styles = getComputedStyle(document.documentElement);
let textColor = styles.getPropertyValue(
  isDark ? "--clr-light" : "--text-secondary"
);

let gridColor = styles.getPropertyValue(
  isDark ? "--clr-accent-rgb" : "--clr-accent-rgb"
);

let accentColor = styles.getPropertyValue("--clr-accent");
let lightColor = styles.getPropertyValue("--clr-light");
let darkColor = styles.getPropertyValue("--clr-dark");

let reportChartInstance = null;
let peakHoursChartInstance = null;

// ==========================================================================
// Utility Functions
// ==========================================================================

function getMonthLabel(month) {
  if (!month) return "N/A";
  const date = new Date(month);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatDate(stringDate) {
  if (!stringDate) return "N/A";
  const date = new Date(stringDate);
  return date.toLocaleDateString("en-CA");
}

// el delay 3shan tlimit el listeners ele btfire kteer (input,scroll)
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// ==========================================================================
// Theme Management
// ==========================================================================

function setTheme(theme) {
  try {
    htmlElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggleBtn) {
      themeToggleBtn.textContent =
        theme === "dark" ? "Light Mode" : "Dark Mode";
    }
    const closeBtn = toastLiveExample?.querySelector(".btn-close");
    if (closeBtn) {
      closeBtn.classList.toggle("btn-close-white", theme === "dark");
    }
    renderCharts(); // lazem te3mel Re render lel chart 3shan ye8yr lono
  } catch (error) {
    console.error(error);
  }
}

const reportDbClr = isDark
  ? {
      bookBorder: `color-mix(in srgb, ${accentColor}, transparent 20%)`,
      bookBg: `color-mix(in srgb, ${accentColor}, transparent 80%)`,
      revBorder: `color-mix(in srgb, ${lightColor}, transparent 40%)`,
      revBg: `color-mix(in srgb, ${lightColor}, transparent 90%)`,
    }
  : {
      bookBorder: `color-mix(in srgb, ${accentColor}, ${lightColor} 10%)`,
      bookBg: `color-mix(in srgb, ${accentColor}, transparent 70%)`,
      revBorder: `color-mix(in srgb, ${lightColor}, transparent 40%)`,
      revBg: `color-mix(in srgb, ${lightColor}, transparent 90%)`,
    };
const reportDatasetColors = isDark
  ? {
      bookBorder: `color-mix(in srgb, ${accentColor}, transparent 20%)`,
      bookBg: `color-mix(in srgb, ${accentColor}, transparent 80%)`,
      revBorder: `color-mix(in srgb, ${lightColor}, transparent 40%)`,
      revBg: `color-mix(in srgb, ${lightColor}, transparent 90%)`,
    }
  : {
      bookBorder: `color-mix(in srgb, ${accentColor}, ${lightColor} 10%)`,
      bookBg: `color-mix(in srgb, ${accentColor}, transparent 70%)`,
      revBorder: `color-mix(in srgb, ${lightColor}, transparent 40%)`,
      revBg: `color-mix(in srgb, ${lightColor}, transparent 90%)`,
    };

// ==========================================================================
// Component Rendering Functions
// ==========================================================================

const chartLabels = reports.map((report) => getMonthLabel(report?.month));
const totalBookingsData = reports.map((report) => report?.totalBookings || 0);
const totalRevenueData = reports.map((report) => report?.totalRevenue || 0);

function renderCharts() {
  try {
    const reportLabels = reports.map((r) => getMonthLabel(r?.month));
    const reportBookings = reports.map((r) => r?.totalBookings || 0);
    const reportRevenue = reports.map((r) => r?.totalRevenue || 0);

    if (reportChartInstance) reportChartInstance.destroy();
    reportChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Total Bookings",
            data: totalBookingsData,
            borderColor: reportDbClr.bookBorder,
            backgroundColor: reportDbClr.bookBg,
            tension: 0.1,
            fill: true,
            yAxisID: "yBookings",
            pointBackgroundColor: reportDbClr.bookBorder,
          },
          {
            label: "Total Revenue ($)",
            data: totalRevenueData,
            borderColor: reportDbClr.revBorder,
            backgroundColor: reportDbClr.revBg,
            tension: 0.1,
            fill: true,
            yAxisID: "yRevenue",
            pointBackgroundColor: reportDbClr.revBorder,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: false },
          legend: { position: "top", labels: { color: lightColor } },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          x: {
            display: true,
            title: { display: true, text: "Month", color: lightColor },
            ticks: { color: lightColor },
            grid: { color: gridColor },
          },
          yBookings: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Total Bookings",
              color: lightColor,
            },
            beginAtZero: true,
            ticks: { color: lightColor },
            grid: { color: gridColor },
          },
          yRevenue: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Total Revenue ($)",
              color: lightColor,
            },
            beginAtZero: true,
            ticks: { color: lightColor },
            grid: { drawOnChartArea: false },
          },
        },
        interaction: { mode: "index", intersect: false },
      },
    });

    ////////
    const peakHourSlots = reports
      .reduce((slots, report) => {
        if (report?.peakHours) {
          Object.keys(report.peakHours).forEach((slot) => {
            if (!slots.includes(slot)) slots.push(slot);
          });
        }
        return slots;
      }, [])
      .sort();
    const barColors = isDark
      ? [
          `color-mix(in srgb, ${accentColor}, transparent 30%)`,
          `color-mix(in srgb, ${lightColor}, transparent 50%)`,
          `color-mix(in srgb, ${accentColor}, transparent 50%)`,
          `color-mix(in srgb, ${lightColor}, transparent 70%)`,
          `color-mix(in srgb, ${accentColor}, transparent 70%)`,
          `color-mix(in srgb, ${lightColor}, transparent 85%)`,
        ]
      : [
          `color-mix(in srgb, ${accentColor}, ${darkColor} 15%)`,
          `color-mix(in srgb, ${accentColor}, ${darkColor} 35%)`,
          `color-mix(in srgb, ${accentColor}, ${darkColor} 50%)`,
          `color-mix(in srgb, ${accentColor}, ${darkColor} 65%)`,
          `color-mix(in srgb, ${accentColor}, ${darkColor} 75%)`,
          `color-mix(in srgb, ${accentColor}, ${darkColor} 85%)`,
        ];
    const peakHoursDatasets = peakHourSlots.map((slot, index) => {
      const data = reports.map((report) => report?.peakHours?.[slot] || 0);
      return {
        label: slot,
        data: data,
        backgroundColor: barColors[index % barColors.length],
      };
    });

    if (peakHoursChartInstance) peakHoursChartInstance.destroy();
    peakHoursChartInstance = new Chart(ctxPeak, {
      type: "bar",
      data: { labels: chartLabels, datasets: peakHoursDatasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: false },
          legend: { position: "top", labels: { color: lightColor } },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          x: {
            stacked: false,
            title: { display: true, text: "Month", color: lightColor },
            ticks: { color: lightColor },
            grid: { color: gridColor },
          },
          y: {
            stacked: false,
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Bookings",
              color: lightColor,
            },
            ticks: { color: lightColor },
            grid: { color: gridColor },
          },
        },
        interaction: { mode: "index", intersect: false },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function renderSummaryCards() {
  try {
    const totalBookings =
      reports?.reduce((sum, r) => sum + (r?.totalBookings || 0), 0) ?? 0;
    const totalRevenue =
      reports?.reduce((sum, r) => sum + (r?.totalRevenue || 0), 0) ?? 0;
    const totalUsers = users?.length || 0;
    const latestReport =
      reports?.length > 0 ? reports[reports.length - 1] : null;
    const latestBookings = latestReport?.totalBookings || 0;
    const latestMonthLabel = getMonthLabel(latestReport?.month);

    summaryCardElements[0].innerHTML = `
            <div class="col-7">
                <h4 class="mb-0 h6 text-clr-on-dark-bg">Total Bookings</h4>
                <p class="mb-0 small text-clr-muted-on-dark-bg">Sum across reports</p>
            </div>
            <div class="col-5 text-center"><h2 class="summary-card-value mb-0">${totalBookings}</h2></div>`;
    summaryCardElements[1].innerHTML = `
            <div class="col-7">
                <h4 class="mb-0 h6 text-clr-on-dark-bg">Total Revenue</h4>
                <p class="mb-0 small text-clr-muted-on-dark-bg">Sum across reports</p>
            </div>
            <div class="col-5 text-center"><h2 class="summary-card-value mb-0">$${totalRevenue}</h2></div>`;
    summaryCardElements[2].innerHTML = `
            <div class="col-7">
                <h4 class="mb-0 h6 text-clr-on-dark-bg">Total Users</h4>
                <p class="mb-0 small text-clr-muted-on-dark-bg">Registered users count</p>
            </div>
            <div class="col-5 text-center"><h2 class="summary-card-value mb-0">${totalUsers}</h2></div>`;
    summaryCardElements[3].innerHTML = `
            <div class="col-7">
                <h4 class="mb-0 h6 text-clr-on-dark-bg">Bookings (${
                  latestReport ? latestMonthLabel : "N/A"
                })</h4>
                <p class="mb-0 small text-clr-muted-on-dark-bg">Latest report month</p>
            </div>
            <div class="col-5 text-center"><h2 class="summary-card-value mb-0">${
              latestReport ? latestBookings : "N/A"
            }</h2></div>`;
  } catch (error) {
    console.error(error);
  }
}

function renderTopCustomers() {
  try {
    const nonAdminUsers = users?.filter((u) => u?.role !== "admin") || [];
    const customerStats = {};
    bookings?.forEach((booking) => {
      const userId = booking?.userId;
      const revenue = booking?.totalAmount || 0;
      const status = booking?.status;
      if (!userId || status === "cancelled") return;
      const user = nonAdminUsers.find((u) => u?.id === userId);
      if (!user) return;
      if (!customerStats[userId]) {
        customerStats[userId] = {
          name: user.username?.replace(/_/g, " ") || `User ${userId}`,
          count: 0,
          revenue: 0,
        };
      }
      customerStats[userId].count++;
      customerStats[userId].revenue += revenue;
    });

    const topCustomers = Object.values(customerStats)
      .sort((a, b) => b.count - a.count || b.revenue - a.revenue)
      .slice(0, 5);

    customerListDiv.innerHTML = ""; // Clear previous
    if (topCustomers.length > 0) {
      noCustomersMessageDiv.style.display = "none";
      topCustomers.forEach((customer) => {
        customerListDiv.innerHTML += `
                    <div class="data-card d-flex flex-row justify-content-between align-items-center p-2 mb-2 rounded shadow-sm border-standard">
                        <div class="col-7 col-md-8">
                            <h6 class="mb-0 text-truncate text-clr-primary" title="${
                              customer.name
                            }">${customer.name}</h6>
                            <p class="text-clr-secondary mb-0 small">${
                              customer.count
                            } booking${customer.count !== 1 ? "s" : ""}</p>
                        </div>
                        <div class="col-5 col-md-4 text-end">
                            <h6 class="revenue-amount mb-0 fw-bold">$${customer.revenue.toFixed(
                              2
                            )}</h6>
                        </div>
                    </div>`;
      });
    } else {
      noCustomersMessageDiv.textContent = "No valid customer booking data.";
      noCustomersMessageDiv.style.display = "block";
    }
  } catch (error) {
    console.error(error);
  }
}

function populateAdminInfo() {
  try {
    const name = currentAdmin?.username?.replace(/_/g, " ") || "Admin";
    const regDate = formatDate(currentAdmin?.registeredAt);
    const avatar =
      currentAdmin?.userImg ||
      "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg";

    adminNameEl.textContent = name;
    adminRegDateEl.textContent = regDate;
    adminAvatarImg.src = avatar;
    adminAvatarImg.alt = `${name}'s Avatar`;
  } catch (error) {
    console.error(error);
  }
}

function renderPaginationControls(containerId, currentPage, totalPages) {
  const paginationContainer = document.getElementById(containerId);
  paginationContainer.innerHTML = "";
  if (totalPages <= 1) return;

  let paginationHTML =
    '<ul class="pagination pagination-sm justify-content-center">';

  paginationHTML += `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <button class="page-link" data-page="${
              currentPage - 1
            }" aria-label="Previous">
                <span aria-hidden="true">«</span>
            </button>
        </li>`;

  const maxPages = 5;
  let start = Math.max(1, currentPage - Math.floor(maxPages / 2));
  let end = Math.min(totalPages, start + maxPages - 1);
  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1);
  }

  if (start > 1) {
    paginationHTML += `<li class="page-item"><button class="page-link" data-page="1">1</button></li>`;
    if (start > 2) {
      paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }
  }

  for (let i = start; i <= end; i++) {
    paginationHTML += `<li class="page-item ${
      i === currentPage ? "active" : ""
    }"><button class="page-link" data-page="${i}">${i}</button></li>`;
  }
  if (end < totalPages) {
    if (end < totalPages - 1) {
      paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }
    paginationHTML += `<li class="page-item"><button class="page-link" data-page="${totalPages}">${totalPages}</button></li>`;
  }

  paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <button class="page-link" data-page="${
              currentPage + 1
            }" aria-label="Next">
                <span aria-hidden="true">»</span>
            </button>
        </li>`;

  paginationHTML += "</ul>";
  paginationContainer.innerHTML = paginationHTML;

  if (!paginationContainer.dataset.listenerAttached) {
    paginationContainer.addEventListener("click", handlePaginationClick);
    paginationContainer.dataset.listenerAttached = "true";
  }
}

function populateBookingStatusFilter() {
  try {
    const currentVal = bookingCriteria.statusFilter;
    let optionsHTML = '<option value="">All Statuses</option>';
    bookingStatusOptions.forEach((status) => {
      optionsHTML += `<option value="${status.toLowerCase()}">${status}</option>`;
    });
    bookingStatusFilterEl.innerHTML = optionsHTML;
    bookingStatusFilterEl.value = currentVal;
  } catch (error) {
    console.error(error);
  }
}

function filterAndPaginateBookings() {
  try {
    bookingCriteria.searchTerm = bookingSearchInput?.value?.toLowerCase() || "";
    bookingCriteria.statusFilter = bookingStatusFilterEl?.value || "";
    bookingCriteria.filteredData = bookings.filter((booking) => {
      const searchTarget = `${booking?.id || ""} ${
        booking?.customerName || ""
      } ${booking?.customerEmail || ""}`.toLowerCase();
      const matchesSearch =
        !bookingCriteria.searchTerm ||
        searchTarget.includes(bookingCriteria.searchTerm);
      const matchesStatus =
        !bookingCriteria.statusFilter ||
        (booking?.status || "").toLowerCase() === bookingCriteria.statusFilter;
      return matchesSearch && matchesStatus;
    });
    renderBookingsPage(bookingCriteria.currentPage);
  } catch (error) {
    console.error(error);
  }
}

function renderBookingsPage(pageNum) {
  try {
    const totalItems = bookingCriteria.filteredData.length;
    const totalPages = Math.ceil(totalItems / take);

    bookingCriteria.currentPage = Math.max(
      1,
      Math.min(pageNum, totalPages || 1)
    );

    const startIndex = (bookingCriteria.currentPage - 1) * take;
    const endIndex = startIndex + take;
    const displayedBookings = bookingCriteria.filteredData.slice(
      startIndex,
      endIndex
    );

    let tableHTML = "";
    if (displayedBookings.length > 0) {
      noBookingsFilteredMessageDiv.style.display = "none";
      displayedBookings.forEach((booking) => {
        const currentStatus = (booking?.status || "pending").toLowerCase();
        const optionsHTML = bookingStatusOptions
          .map(
            (status) =>
              `<option value="${status.toLowerCase()}" ${
                currentStatus === status.toLowerCase() ? "selected" : ""
              }>${status}</option>`
          )
          .join("");
        tableHTML += `
                    <tr class="border-standard">
                        <td class="text-clr-secondary">${
                          booking?.id || "N/A"
                        }</td>
                        <td class="text-clr-primary">${
                          booking?.customerName || "N/A"
                        }</td>
                        <td class="text-clr-secondary">${
                          booking?.carId || "N/A"
                        }</td>
                        <td class="text-clr-secondary">${formatDate(
                          booking?.pickupDate
                        )}</td>
                        <td class="text-clr-secondary">${formatDate(
                          booking?.dropoffDate
                        )}</td>
                        <td class="booking-amount fw-bold">$${(
                          booking?.totalAmount || 0
                        ).toFixed(2)}</td>
                        <td>
                            <select class="form-select form-select-sm" data-booking-id="${
                              booking?.id || ""
                            }" aria-label="Booking Status">
                                ${optionsHTML}
                            </select>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-action-primary btn-update-status" data-booking-id="${
                              booking?.id || ""
                            }">Update</button>
                        </td>
                    </tr>`;
      });
    } else {
      tableHTML = `<tr><td colspan="8" class="text-center text-clr-muted-on-dark-bg p-3">No bookings found${
        bookingCriteria.searchTerm || bookingCriteria.statusFilter
          ? " matching filters"
          : ""
      }.</td></tr>`;
      noBookingsFilteredMessageDiv.style.display = "none";
    }
    bookingsTableBody.innerHTML = tableHTML;
    renderPaginationControls(
      "bookingPagination",
      bookingCriteria.currentPage,
      totalPages
    );
  } catch (error) {
    console.error(error);
  }
}

function filterAndPaginateUsers() {
  try {
    userCriteria.searchTerm = userSearchInput?.value?.toLowerCase() || "";
    userCriteria.filteredData = users.filter((user) => {
      const searchTarget = `${user?.id || ""} ${user?.username || ""} ${
        user?.email || ""
      }`.toLowerCase();
      return (
        !userCriteria.searchTerm ||
        searchTarget.includes(userCriteria.searchTerm)
      );
    });
    renderUsersPage(userCriteria.currentPage);
  } catch (error) {
    console.error(error);
  }
}

function renderUsersPage(pageNum) {
  try {
    const totalItems = userCriteria.filteredData.length;
    const totalPages = Math.ceil(totalItems / take);
    userCriteria.currentPage = Math.max(1, Math.min(pageNum, totalPages || 1));

    const startIndex = (userCriteria.currentPage - 1) * take;
    const endIndex = startIndex + take;
    const displayedUsers = userCriteria.filteredData.slice(
      startIndex,
      endIndex
    );

    let tableHTML = "";
    if (displayedUsers.length > 0) {
      if (noUsersFilteredMessageDiv)
        noUsersFilteredMessageDiv.style.display = "none";
      displayedUsers.forEach((user) => {
        const isAdmin = (user?.role || "").toLowerCase() === "admin";
        const badgeClass = isAdmin
          ? "bg-clr-accent text-clr-on-accent"
          : "bg-secondary text-body-secondary";
        const actionButtonHTML = !isAdmin
          ? `<button class="btn btn-sm btn-action-primary btn-promote-user" data-user-id="${
              user?.id || ""
            }" title="Promote to Admin"><i class="fas fa-user-shield me-1"></i> Promote</button>`
          : `<button class="btn btn-sm btn-secondary" disabled title="Already Admin"><i class="fas fa-check-circle me-1"></i> Admin</button>`;

        tableHTML += `
                    <tr class="border-standard">
                        <td class="text-clr-secondary">${user?.id || "N/A"}</td>
                        <td class="text-clr-primary fw-medium">${
                          user?.username || "N/A"
                        }</td>
                        <td class="text-clr-secondary">${
                          user?.email || "N/A"
                        }</td>
                        <td><span class="badge rounded-pill ${badgeClass}">${
          user?.role || "N/A"
        }</span></td>
                        <td class="text-clr-secondary">${formatDate(
                          user?.registeredAt
                        )}</td>
                        <td>${actionButtonHTML}</td>
                    </tr>`;
      });
    } else {
      tableHTML = `<tr><td colspan="6" class="text-center text-clr-muted-on-dark-bg p-3">No users found${
        userCriteria.searchTerm ? " matching search" : ""
      }.</td></tr>`;
      if (noUsersFilteredMessageDiv)
        noUsersFilteredMessageDiv.style.display = "none";
    }
    usersTableBody.innerHTML = tableHTML;
    renderPaginationControls(
      "userPagination",
      userCriteria.currentPage,
      totalPages
    );
  } catch (error) {
    console.error(error);
  }
}

// ==========================================================================
// Event Handlers
// ==========================================================================

function handleUpdateBookingStatus(event) {
  try {
    const button = event.target.closest(".btn-update-status");
    if (!button) return;

    const bookingId = parseInt(button.dataset.bookingId);
    const statusSelect = document.querySelector(
      `select[data-booking-id="${bookingId}"]`
    );

    const newStatus = statusSelect.value;
    const bookingIndex = bookings.findIndex((b) => b?.id === bookingId);

    if (bookingIndex > -1) {
      bookings[bookingIndex].status = newStatus;
      localStorage.setItem("bookings", JSON.stringify(bookings));
      showToast(`Booking #${bookingId} status updated.`, "success");
      filterAndPaginateBookings();
    }
  } catch (error) {
    console.error(error);
  }
}

function handlePromoteUser(event) {
  try {
    const button = event.target.closest(".btn-promote-user");
    if (!button) return;

    const userId = parseInt(button.dataset.userId);

    const userIndex = users.findIndex((u) => u?.id === userId);
    if (userIndex > -1) {
      const username = users[userIndex]?.username || `ID: ${userId}`;
      if (confirm(`Promote user "${username}" to Admin?`)) {
        users[userIndex].role = "admin";
        localStorage.setItem("users", JSON.stringify(users));
        showToast(`User ${username} promoted to Admin.`, "success");
        filterAndPaginateUsers();
        renderTopCustomers();
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function handlePaginationClick(event) {
  try {
    const button = event.target.closest(".page-link");
    if (!button.closest(".page-item").classList.contains("disabled")) {
      const pageNum = parseInt(button.dataset.page);
      const containerId = event.currentTarget.id;
      if (containerId === "bookingPagination") renderBookingsPage(pageNum);
      else if (containerId === "userPagination") renderUsersPage(pageNum);
    }
  } catch (error) {
    console.error(error);
  }
}

function handleLogout() {
  try {
    const adminUsername = currentAdmin?.username?.replace(/_/g, " ") || "Admin";
    if (confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("currAdmin");
      localStorage.removeItem("currUser");
      showToast(`Signed out. Goodbye ${adminUsername}.`, "info");
      setTimeout(() => {
        window.location.href = "../../../index.html";
      }, 1500);
    }
  } catch (error) {
    console.error(error);
  }
}

// ==========================================================================
// Event Listeners Setup
// ==========================================================================

function setupEventListeners() {
  try {
    ///////////
    themeToggleBtn.addEventListener("click", () => {
      currentTheme = htmlElement.getAttribute("data-bs-theme");
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });

    ////////////
    logoutBtn.addEventListener("click", handleLogout);

    /////////////
    bookingSearchInput.addEventListener(
      "input",
      debounce(() => {
        bookingCriteria.currentPage = 1;
        filterAndPaginateBookings();
      }, 350)
    );
    ///////////
    bookingStatusFilterEl.addEventListener("change", () => {
      bookingCriteria.currentPage = 1;
      filterAndPaginateBookings();
    });
    ///////////
    bookingClearFiltersBtn.addEventListener("click", () => {
      if (bookingSearchInput) bookingSearchInput.value = "";
      if (bookingStatusFilterEl) bookingStatusFilterEl.value = "";
      bookingCriteria.currentPage = 1;
      bookingCriteria.searchTerm = "";
      bookingCriteria.statusFilter = "";
      filterAndPaginateBookings();
      showToast("Booking filters cleared.", "info");
    });
    ////////

    bookingsTableBody.addEventListener("click", handleUpdateBookingStatus);

    ///////

    userSearchInput.addEventListener(
      "input",
      debounce(() => {
        userCriteria.currentPage = 1;
        filterAndPaginateUsers();
      }, 350)
    );
    ////////////

    userClearFiltersBtn.addEventListener("click", () => {
      if (userSearchInput) userSearchInput.value = "";
      userCriteria.currentPage = 1;
      userCriteria.searchTerm = "";
      filterAndPaginateUsers();
      showToast("User filter cleared.", "info");
    });
    ///////////

    usersTableBody.addEventListener("click", handlePromoteUser);

    //////////////

    if (!bookingPaginationContainer.dataset.listenerAttached) {
      bookingPaginationContainer.addEventListener(
        "click",
        handlePaginationClick
      );
      bookingPaginationContainer.dataset.listenerAttached = "true";
    }
    if (!userPaginationContainer.dataset.listenerAttached) {
      userPaginationContainer.addEventListener("click", handlePaginationClick);
      userPaginationContainer.dataset.listenerAttached = "true";
    }
  } catch (error) {
    console.error(error);
  }
}

// ==========================================================================
// Initialization
// ==========================================================================

function initializeDashboard() {
  console.log("Initializing dashboard...");
  try {
    setTheme(savedTheme || (prefersDark ? "dark" : "light"));
    populateBookingStatusFilter();
    renderSummaryCards();
    renderTopCustomers();
    populateAdminInfo();
    renderBookingsPage(1);
    renderUsersPage(1);
    setupEventListeners();
  } catch (error) {
    console.error(error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeDashboard);
} else {
  initializeDashboard();
}
