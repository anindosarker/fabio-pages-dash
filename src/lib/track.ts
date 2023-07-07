const trackActivity = () => {
  if (typeof window !== "undefined") {
    let previousPage = localStorage.getItem("previousPage");
    let currentPage = window.location.href;
    let userId = getSessionUserId();

    // Check if the user is visiting a new page
    if (currentPage !== previousPage) {
      let startTime = new Date().getTime();

      // Check if this is the first page visit
      if (previousPage !== null) {
        let endTime = new Date().getTime();
        let timeSpent = endTime - parseInt(localStorage.getItem("startTime"));
        updatePageVisit(userId, previousPage, timeSpent);
      }

      // Check if a page visit object has already been created for the current page
      let pageVisits = getPageVisits();
      let currentVisit = pageVisits.find(
        (visit) => visit.currentPage === currentPage
      );

      if (!currentVisit) {
        // Create a new page visit object
        let pageVisit = createPageVisitObject(
          userId,
          currentPage,
          previousPage
        );

        // Save the page visit object to local storage
        pageVisits.push(pageVisit);
        savePageVisits(pageVisits);
      }

      // Update the start time for the new page
      localStorage.setItem("startTime", startTime.toString());
    }
    // Save the current page for the next iteration
    localStorage.setItem("previousPage", currentPage);
  }
};

const getSessionUserId = () => {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    userId = generateUserId();
    localStorage.setItem("userId", userId);
  }

  return userId;
};

const generateUserId = () => {
  return "user_" + Date.now();
};

const generatePageVisitId = () => {
  return "pageVisit_" + Date.now();
};

const createPageVisitObject = (userId, currentPage, previousPage) => {
  return {
    id: generatePageVisitId(),
    userId: userId.toString(),
    currentPage: currentPage,
    previousPage: previousPage,
    timeSpent: null,
  };
};

function getPageVisits() {
  let pageVisits = localStorage.getItem("pageVisits");

  if (!pageVisits) {
    pageVisits = [];
  } else {
    pageVisits = JSON.parse(pageVisits);
  }

  return pageVisits;
}

function savePageVisits(pageVisits) {
  localStorage.setItem("pageVisits", JSON.stringify(pageVisits));
}

function updatePageVisit(userId, pageUrl, timeSpent) {
  let pageVisits = getPageVisits();
  let lastPageVisit = pageVisits[pageVisits.length - 1];

  if (lastPageVisit.currentPage === pageUrl) {
    lastPageVisit.timeSpent = timeSpent;
    savePageVisits(pageVisits);
  }
}

const savePageVisit = (pageVisit) => {
  // Retrieve the existing page visits array from local storage
  let pageVisits = getPageVisits();

  // Push the new page visit object into the array
  pageVisits.push(pageVisit);

  // Save the updated page visits array to local storage
  localStorage.setItem("pageVisits", JSON.stringify(pageVisits));
};

// Only add the event listener on the client-side
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    let userId = getSessionUserId();
    let previousPage = localStorage.getItem("previousPage");
    let startTime = parseInt(localStorage.getItem("startTime"));
    let endTime = new Date().getTime();
    let timeSpent = endTime - startTime;

    // Update the analytics data with the time spent on the previous page
    if (previousPage !== null) {
      updatePageVisit(userId, previousPage, timeSpent);
    }

    // Save the analytics data for the current page
    let pageVisit = createPageVisitObject(userId, previousPage, null);
    pageVisit.timeSpent = timeSpent;
    savePageVisit(pageVisit);
  });

  window.addEventListener("pagehide", () => {
    let userId = getSessionUserId();
    let previousPage = localStorage.getItem("previousPage");
    let startTime = parseInt(localStorage.getItem("startTime"));
    let endTime = new Date().getTime();
    let timeSpent = endTime - startTime;

    // Update the analytics data with the time spent on the previous page
    if (previousPage !== null) {
      updatePageVisit(userId, previousPage, timeSpent);
    }

    // Save the analytics data for the current page
    let pageVisit = createPageVisitObject(userId, previousPage, null);
    pageVisit.timeSpent = timeSpent;
    savePageVisit(pageVisit);
  });
}

export default trackActivity;
