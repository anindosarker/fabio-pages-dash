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
        localStorage.setItem("initialLoad", "true"); // Set the flag for the initial load
      } else {
        let endTime = new Date().getTime();
        let timeSpent = endTime - parseInt(localStorage.getItem("startTime"));
        savePageVisit(userId, previousPage, currentPage, timeSpent);
      }

      // Update the start time for the new page
      localStorage.setItem("startTime", startTime.toString());
    }
    // Save the current page for the next iteration
    localStorage.setItem("previousPage", currentPage);
  }
};

const savePageVisit = (userId, prevPage, currentPage, timeSpent) => {
  let data = {
    userId: userId.toString(),
    prevPage,
    currentPage,
    timeSpent,
  };

  // Store the data in local storage
  let history = localStorage.getItem("history");
  if (history) {
    history = JSON.parse(history);
  } else {
    history = [];
  }
  history.push(data);
  localStorage.setItem("history", JSON.stringify(history));

  // Console log the data
  console.log(data);
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

// Only add the event listener on the client-side
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    let currentPage = window.location.href;
    let userId = getSessionUserId();
    let previousPage = localStorage.getItem("previousPage");
    let startTime = parseInt(localStorage.getItem("startTime"));
    let endTime = new Date().getTime();
    let timeSpent = endTime - startTime;

    savePageVisit(userId, previousPage, currentPage, timeSpent);
  });

  window.addEventListener("unload", () => {
    let currentPage = window.location.href;
    let userId = getSessionUserId();
    let previousPage = localStorage.getItem("previousPage");
    let startTime = parseInt(localStorage.getItem("startTime"));
    let endTime = new Date().getTime();
    let timeSpent = endTime - startTime;

    savePageVisit(userId, previousPage, currentPage, timeSpent);
  });

  // Check if the function has already been called during the initial load
  let initialLoad = localStorage.getItem("initialLoad");
  if (!initialLoad) {
    trackActivity();
  }
}

export default trackActivity;
