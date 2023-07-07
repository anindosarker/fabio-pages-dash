const trackActivity = () => {
  if (typeof window !== "undefined") {
    let previousPage = localStorage.getItem("previousPage");
    let currentPage = window.location.href;
    let userId = getSessionUserId();

    // Check if the user is visiting a new page
    if (currentPage !== previousPage) {
      let startTime = new Date().getTime();

      // Check if this is the first page visit
      if (!previousPage) {
        startTime = new Date().getTime();
      } else {
        let endTime = new Date().getTime();
        let timeSpent = endTime - parseInt(localStorage.getItem("startTime"));
        updatePageVisit(userId, previousPage, timeSpent);
      }

      // Create a new page visit object
      let pageVisit = createPageVisitObject(userId, currentPage, previousPage);

      // Save the page visit object to local storage
      let pageVisits = getPageVisits();
      pageVisits[pageVisit.id] = pageVisit;
      savePageVisits(pageVisits);

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

const getPageVisits = () => {
  return JSON.parse(localStorage.getItem("pageVisits")) || {};
};

const savePageVisits = (pageVisits) => {
  localStorage.setItem("pageVisits", JSON.stringify(pageVisits));
};

const updatePageVisit = (userId, pageUrl, timeSpent) => {
  // Find the page visit object with the matching user ID and page URL
  let pageVisits = getPageVisits();
  let pageVisitId = Object.keys(pageVisits).find(
    (id) =>
      pageVisits[id].userId === userId && pageVisits[id].currentPage === pageUrl
  );

  // Update the time spent value for the page visit object
  if (pageVisitId) {
    pageVisits[pageVisitId].timeSpent = timeSpent;
    savePageVisits(pageVisits);
  }
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
    if (previousPage) {
      updatePageVisit(userId, previousPage, timeSpent);
    }

    // Save the analytics data for the current page
    let pageVisit = getPageVisits()[generatePageVisitId()];
    savePageVisit(pageVisit);
  });

  window.addEventListener("pagehide", () => {
    let userId = getSessionUserId();
    let previousPage = localStorage.getItem("previousPage");
    let startTime = parseInt(localStorage.getItem("startTime"));
    let endTime = new Date().getTime();
    let timeSpent = endTime - startTime;

    // Update the analytics data with the time spent on the previous page
    if (previousPage) {
      updatePageVisit(userId, previousPage, timeSpent);
    }

    // Save the analytics data for the current page
    let pageVisit = getPageVisits()[generatePageVisitId()];
    pageVisit.timeSpent = timeSpent;
    savePageVisit(pageVisit);
  });
}

const savePageVisit = (pageVisit) => {
  // Store the data in local storage
  let history = localStorage.getItem("history");
  if (history) {
    history = JSON.parse(history);
  } else {
    history = [];
  }
  history.push(pageVisit);
  localStorage.setItem("history", JSON.stringify(history));
};

export default trackActivity;
