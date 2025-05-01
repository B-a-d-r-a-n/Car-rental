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
  const bgType =
    type === "error" ? "danger" : type === "info" ? "info" : "success";

  toastLiveExample.innerHTML = `
    <div class="d-flex">
      <div class="toast-body"><i class="fas fa-info-circle me-1 icoo"></i> ${message}</div>
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
  bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  users = JSON.parse(localStorage.getItem("users")) || [];
  reports = JSON.parse(localStorage.getItem("reports")) || [];
  currentAdmin = JSON.parse(localStorage.getItem("currUser")) || {};
  bookings.sort(
    (a, b) => new Date(b?.pickupDate || 0) - new Date(a?.pickupDate || 0)
  );
} catch (error) {
  console.error("Error parsing localStorage data:", error);
}

const take = 8;
const bookingStatusOptions = [
  "Pending",
  "Confirmed",
  "Ongoing",
  "Completed",
  "Cancelled",
];

const bookingCriteria = {
  currentPage: 1,
  searchTerm: "",
  statusFilter: "",
  filteredData: [...bookings],
};

const userCriteria = {
  currentPage: 1,
  searchTerm: "",
  filteredData: [...users],
};

const htmlElement = document.documentElement;
const reportChartCanvas = document.getElementById("reportChart");
const peakHoursChartCanvas = document.getElementById("peakHoursChart");
const themeToggleBtn = document.getElementById("themeToggleBtn");
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

const bookingSearchInput = document.getElementById("bookingSearchInp");
const bookingStatusFilterEl = document.getElementById("bookingStatFilter");
const bookingClearFiltersBtn = document.getElementById("bookingCriteriaClear");
const bookingPaginationContainer = document.getElementById("bookingPagination");
const usersTableBody = document.getElementById("usersTblBody");
const userSearchInput = document.getElementById("userSearchInput");
const userClearFiltersBtn = document.getElementById("userClearFilters");
const userPaginationContainer = document.getElementById("userPagination");
const offCanvasNav = document.getElementById("offCanvasNav");
const ctx = reportChartCanvas.getContext("2d");
const ctxPeak = peakHoursChartCanvas.getContext("2d");
const plainTextEls = document.querySelectorAll(".plain-text");

let currentTheme = htmlElement.getAttribute("data-bs-theme") || "light";
let isDark = currentTheme === "dark";
let styles = getComputedStyle(document.documentElement);
let accentColor = styles.getPropertyValue("--clr-accent");
let accentDarker = styles.getPropertyValue("--clr-accent-darker");
let lightColor = styles.getPropertyValue("--clr-light");
let darkColor = styles.getPropertyValue("--clr-dark");
let textPrimary = styles.getPropertyValue("--text-primary");
let textSecondary = styles.getPropertyValue("--text-secondary");
let gridColor = `rgba(${
  isDark
    ? styles.getPropertyValue("--clr-light-rgb")
    : styles.getPropertyValue("--clr-dark-rgb")
}, 0.2)`;

let reportChartInstance = null;
let peakHoursChartInstance = null;

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

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function setTheme(theme) {
  try {
    htmlElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    currentTheme = theme;
    isDark = theme === "dark";
    styles = getComputedStyle(document.documentElement);
    accentColor = styles.getPropertyValue("--clr-accent");
    accentDarker = styles.getPropertyValue("--clr-accent-darker");
    lightColor = styles.getPropertyValue("--clr-light");
    darkColor = styles.getPropertyValue("--clr-dark");
    textPrimary = styles.getPropertyValue("--text-primary");
    textSecondary = styles.getPropertyValue("--text-secondary");
    gridColor = `rgba(${
      isDark
        ? styles.getPropertyValue("--clr-light-rgb")
        : styles.getPropertyValue("--clr-dark-rgb")
    }, 0.2)`;
    themeToggleBtn.innerHTML = `<i class="fas ${
      theme === "dark" ? " fa-moon " : " fa-sun "
    } me-1 icoo"></i> ${theme === "dark" ? "Dark Mode" : "Light Mode"}`;
    const closeBtn = toastLiveExample?.querySelector(".btn-close");
    if (closeBtn) {
      closeBtn.classList.toggle("btn-close-white", isDark);
    }
    plainTextEls.forEach((element) => {
      if (isDark) {
        element.classList.add("text-clr-muted-on-dark-bg");
        element.classList.remove("text-clr-primary");
      } else {
        element.classList.add("text-clr-primary");
        element.classList.remove("text-clr-muted-on-dark-bg");
      }
    });
    renderCharts();
  } catch (error) {
    console.error("Error setting theme:", error);
  }
}

const chartLabels = reports.map((report) => getMonthLabel(report?.month));
const totalBookingsData = reports.map((report) => report?.totalBookings || 0);
const totalRevenueData = reports.map((report) => report?.totalRevenue || 0);

function renderCharts() {
  try {
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
          revBorder: `color-mix(in srgb, ${darkColor}, transparent 40%)`,
          revBg: `color-mix(in srgb, ${darkColor}, transparent 90%)`,
        };

    if (reportChartInstance) reportChartInstance.destroy();
    reportChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Total Bookings",
            data: totalBookingsData,
            borderColor: reportDatasetColors.bookBorder,
            backgroundColor: reportDatasetColors.bookBg,
            tension: 0.1,
            fill: true,
            yAxisID: "yBookings",
            pointBackgroundColor: reportDatasetColors.bookBorder,
          },
          {
            label: "Total Revenue ($)",
            data: totalRevenueData,
            borderColor: reportDatasetColors.revBorder,
            backgroundColor: reportDatasetColors.revBg,
            tension: 0.1,
            fill: true,
            yAxisID: "yRevenue",
            pointBackgroundColor: reportDatasetColors.revBorder,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: false },
          legend: {
            position: "top",
            labels: { color: isDark ? lightColor : textPrimary },
          },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Month",
              color: isDark ? lightColor : textPrimary,
            },
            ticks: { color: isDark ? lightColor : textPrimary },
            grid: { color: gridColor },
          },
          yBookings: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Total Bookings",
              color: isDark ? lightColor : textPrimary,
            },
            beginAtZero: true,
            ticks: { color: isDark ? lightColor : textPrimary },
            grid: { color: gridColor },
          },
          yRevenue: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Total Revenue ($)",
              color: isDark ? lightColor : textPrimary,
            },
            beginAtZero: true,
            ticks: { color: isDark ? lightColor : textPrimary },
            grid: { drawOnChartArea: false },
          },
        },
        interaction: { mode: "index", intersect: false },
      },
    });

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
          `color-mix(in srgb, ${accentColor}, transparent 50%)`,
          `color-mix(in srgb, ${accentDarker}, transparent 50%)`,
          `color-mix(in srgb, ${accentColor}, transparent 70%)`,
          `color-mix(in srgb, ${accentDarker}, transparent 70%)`,
          `color-mix(in srgb, ${accentColor}, transparent 85%)`,
        ]
      : [
          `color-mix(in srgb, ${accentColor}, ${darkColor} 15%)`,
          `color-mix(in srgb, ${accentColor}, ${darkColor} 25%)`,
          `color-mix(in srgb, ${accentColor}, ${darkColor} 35%)`,
          `color-mix(in srgb, ${accentColor}, ${darkColor} 50%)`,
          `color-mix(in srgb, ${accentColor}, ${darkColor} 65%)`,
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
          legend: {
            position: "top",
            labels: { color: isDark ? lightColor : textPrimary },
          },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          x: {
            stacked: false,
            title: {
              display: true,
              text: "Month",
              color: isDark ? lightColor : textPrimary,
            },
            ticks: { color: isDark ? lightColor : textPrimary },
            grid: { color: gridColor },
          },
          y: {
            stacked: false,
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Bookings",
              color: isDark ? lightColor : textPrimary,
            },
            ticks: { color: isDark ? lightColor : textPrimary },
            grid: { color: gridColor },
          },
        },
        interaction: { mode: "index", intersect: false },
      },
    });
  } catch (error) {
    console.error("Error rendering charts:", error);
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
        <h4 class="mb-0 h6 text-clr-primary">Total Bookings</h4>
        <p class="mb-0 small text-clr-secondary">Sum across reports</p>
      </div>
      <div class="col-5 text-center"><h2 class="summary-card-value mb-0">${totalBookings}</h2></div>`;
    summaryCardElements[1].innerHTML = `
      <div class="col-7">
        <h4 class="mb-0 h6 text-clr-primary">Total Revenue</h4>
        <p class="mb-0 small text-clr-secondary">Sum across reports</p>
      </div>
      <div class="col-5 text-center"><h2 class="summary-card-value mb-0">$${totalRevenue}</h2></div>`;
    summaryCardElements[2].innerHTML = `
      <div class="col-7">
        <h4 class="mb-0 h6 text-clr-primary">Total Users</h4>
        <p class="mb-0 small text-clr-secondary">Registered users count</p>
      </div>
      <div class="col-5 text-center"><h2 class="summary-card-value mb-0">${totalUsers}</h2></div>`;
    summaryCardElements[3].innerHTML = `
      <div class="col-7">
        <h4 class="mb-0 h6 text-clr-primary">Bookings (${
          latestReport ? latestMonthLabel : "N/A"
        })</h4>
        <p class="mb-0 small text-clr-secondary">Latest report month</p>
      </div>
      <div class="col-5 text-center"><h2 class="summary-card-value mb-0">${
        latestReport ? latestBookings : "N/A"
      }</h2></div>`;
  } catch (error) {
    console.error("Error rendering summary cards:", error);
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

    customerListDiv.innerHTML = "";
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
              <h6 class="revenue-amount mb-0 fw-bold text-clr-accent">$${customer.revenue.toFixed(
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
    console.error("Error rendering top customers:", error);
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
    console.error("Error populating admin info:", error);
  }
}

function renderPaginationControls(containerId, currentPage, totalPages) {
  const paginationContainer = document.getElementById(containerId);
  paginationContainer.innerHTML = "";
  if (totalPages <= 1) return;

  let paginationBox =
    '<ul class="pagination pagination-sm justify-content-center">';
  paginationBox += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <button class="page-link" data-page="${
        currentPage - 1
      }" aria-label="Previous">
        <i class="fas fa-chevron-left icoo"></i>
      </button>
    </li>`;

  const maxPages = 5;
  let start = Math.max(1, currentPage - Math.floor(maxPages / 2));
  let end = Math.min(totalPages, start + maxPages - 1);
  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1);
  }

  if (start > 1) {
    paginationBox += `<li class="page-item"><button class="page-link" data-page="1">1</button></li>`;
    if (start > 2) {
      paginationBox += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }
  }

  for (let i = start; i <= end; i++) {
    paginationBox += `<li class="page-item ${
      i === currentPage ? "active" : ""
    }"><button class="page-link" data-page="${i}">${i}</button></li>`;
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      paginationBox += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }
    paginationBox += `<li class="page-item"><button class="page-link" data-page="${totalPages}">${totalPages}</button></li>`;
  }

  paginationBox += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <button class="page-link" data-page="${
        currentPage + 1
      }" aria-label="Next">
        <i class="fas fa-chevron-right icoo"></i>
      </button>
    </li>`;
  paginationBox += "</ul>";
  paginationContainer.innerHTML = paginationBox;

  if (!paginationContainer.dataset.listenerAttached) {
    paginationContainer.addEventListener("click", handlePaginationClick);
    paginationContainer.dataset.listenerAttached = "true";
  }
}

function populateBookingStatusFilter() {
  try {
    const currentVal = bookingCriteria.statusFilter;
    let optionsBox = '<option value="">All Statuses</option>';
    bookingStatusOptions.forEach((status) => {
      optionsBox += `<option value="${status.toLowerCase()}">${status}</option>`;
    });
    bookingStatusFilterEl.innerHTML = optionsBox;
    bookingStatusFilterEl.value = currentVal;
  } catch (error) {
    console.error("Error populating booking status filter:", error);
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
    console.error("Error filtering bookings:", error);
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

    let tableBox = "";
    if (displayedBookings.length > 0) {
      displayedBookings.forEach((booking) => {
        const currentStatus = (booking?.status || "pending").toLowerCase();
        const optionsBox = bookingStatusOptions
          .map(
            (status) =>
              `<option value="${status.toLowerCase()}" ${
                currentStatus === status.toLowerCase() ? "selected" : ""
              }>${status}</option>`
          )
          .join("");
        tableBox += `
          <tr class="border-standard text-center">
            <td class="text-clr-secondary">${booking?.id || "N/A"}</td>
            <td class="text-clr-primary">${booking?.customerName || "N/A"}</td>
            <td class="text-clr-secondary">${booking?.carId || "N/A"}</td>
            <td class="text-clr-secondary">${formatDate(
              booking?.pickupDate
            )}</td>
            <td class="text-clr-secondary">${formatDate(
              booking?.dropoffDate
            )}</td>
            <td class="booking-amount fw-bold text-clr-accent">$${(
              booking?.totalAmount || 0
            ).toFixed(2)}</td>
            <td>
              <select class="form-select form-select-sm bg-clr-card text-clr-primary border-standard" data-booking-id="${
                booking?.id || ""
              }" aria-label="Booking Status">
                ${optionsBox}
              </select>
            </td>
            <td>
              <button class="btn btn-sm btn-action-primary btn-update-status" data-booking-id="${
                booking?.id || ""
              }"><i class="fas fa-sync-alt me-1 icoo"></i> Update</button>
            </td>
          </tr>`;
      });
    } else {
      tableBox = `<tr><td colspan="8" class="text-center plain-text p-3">No bookings found${
        bookingCriteria.searchTerm || bookingCriteria.statusFilter
          ? " matching filters"
          : ""
      }.</td></tr>`;
    }
    bookingsTableBody.innerHTML = tableBox;
    renderPaginationControls(
      "bookingPagination",
      bookingCriteria.currentPage,
      totalPages
    );
  } catch (error) {
    console.error("Error rendering bookings page:", error);
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
    console.error("Error filtering users:", error);
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

    let tableBox = "";
    if (displayedUsers.length > 0) {
      displayedUsers.forEach((user) => {
        const isAdmin = (user?.role || "").toLowerCase() === "admin";
        const badgeClass = isAdmin
          ? "bg-clr-accent text-clr-on-accent"
          : "bg-clr-card text-clr-secondary";
        const promoteBtn = !isAdmin
          ? `<button class="btn btn-sm btn-action-primary btn-promote-user" data-user-id="${
              user?.id || ""
            }" title="Promote to Admin"><i class="fas fa-user-shield me-1 icoo"></i> Promote</button>`
          : `<button class="btn btn-sm btn-secondary text-clr-muted-on-dark-bg" disabled title="Already Admin"><i class="fas fa-check-circle me-1 icoo"></i> Admin</button>`;

        tableBox += `
          <tr class="border-standard text-center">
            <td class="text-clr-secondary">${user?.id || "N/A"}</td>
            <td class="text-clr-primary fw-medium">${
              user?.username || "N/A"
            }</td>
            <td class="text-clr-secondary">${user?.email || "N/A"}</td>
            <td><span class="badge rounded-pill ${badgeClass}">${
          user?.role || "N/A"
        }</span></td>
            <td class="text-clr-secondary">${formatDate(
              user?.registeredAt
            )}</td>
            <td>${promoteBtn}</td>
          </tr>`;
      });
    } else {
      tableBox = `<tr><td colspan="6" class="text-center plain-text p-3">No users found${
        userCriteria.searchTerm ? " matching search" : ""
      }.</td></tr>`;
    }
    usersTableBody.innerHTML = tableBox;
    renderPaginationControls(
      "userPagination",
      userCriteria.currentPage,
      totalPages
    );
  } catch (error) {
    console.error("Error rendering users page:", error);
  }
}

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
    console.error("Error updating booking status:", error);
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
    console.error("Error promoting user:", error);
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
    console.error("Error handling pagination click:", error);
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
    console.error("Error handling logout:", error);
  }
}

function setupEventListeners() {
  try {
    themeToggleBtn.addEventListener("click", () => {
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });

    logoutBtn.addEventListener("click", handleLogout);

    bookingSearchInput.addEventListener(
      "input",
      debounce(() => {
        bookingCriteria.currentPage = 1;
        filterAndPaginateBookings();
      }, 350)
    );

    bookingStatusFilterEl.addEventListener("change", () => {
      bookingCriteria.currentPage = 1;
      filterAndPaginateBookings();
    });

    bookingClearFiltersBtn.addEventListener("click", () => {
      bookingSearchInput.value = "";
      bookingStatusFilterEl.value = "";
      bookingCriteria.currentPage = 1;
      bookingCriteria.searchTerm = "";
      bookingCriteria.statusFilter = "";
      filterAndPaginateBookings();
      showToast("Booking filters cleared.", "info");
    });

    bookingsTableBody.addEventListener("click", handleUpdateBookingStatus);

    userSearchInput.addEventListener(
      "input",
      debounce(() => {
        userCriteria.currentPage = 1;
        filterAndPaginateUsers();
      }, 350)
    );

    userClearFiltersBtn.addEventListener("click", () => {
      userSearchInput.value = "";
      userCriteria.currentPage = 1;
      userCriteria.searchTerm = "";
      filterAndPaginateUsers();
      showToast("User filter cleared.", "info");
    });
    usersTableBody.addEventListener("click", handlePromoteUser);
  } catch (error) {
    console.error("Error setting up event listeners:", error);
  }
}

function initializeDashboard() {
  console.log("Initializing dashboard...");
  try {
    setTheme(
      savedTheme ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
    );
    populateBookingStatusFilter();
    renderCharts();
    renderSummaryCards();
    renderTopCustomers();
    populateAdminInfo();
    renderBookingsPage(1);
    renderUsersPage(1);
    setupEventListeners();
  } catch (error) {
    console.error("Error initializing dashboard:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeDashboard);
} else {
  initializeDashboard();
}
