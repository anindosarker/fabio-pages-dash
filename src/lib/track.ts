const trackActivity = () => {
  if (typeof window !== "undefined") {
    let previousPage = localStorage.getItem("previousPage");
    let currentPage = window.location.href;
    let userId = getSessionUserId();

    // Check if the user is visiting a new page
    if (currentPage !== previousPage) {
      let startTime = parseInt(localStorage.getItem("startTime"));
      let endTime = new Date().getTime();

      // Check if this is the first page visit
      if (!previousPage) {
        startTime = endTime;
      } else {
        savePageVisit(userId, previousPage, startTime, endTime);
      }

      // Update the start time for the new page
      localStorage.setItem("startTime", startTime.toString());
    }

    // Save the current page for the next iteration
    localStorage.setItem("previousPage", currentPage);
  }
};

const savePageVisit = (userId, pageUrl, startTime, endTime) => {
  let data = {
    userId: userId.toString(),
    pageUrl,
    startTime,
    endTime,
  };

  // Store the data in local storage
  let visits = localStorage.getItem("visits");
  if (visits) {
    visits = JSON.parse(visits);
  } else {
    visits = [];
  }
  visits.push(data);
  localStorage.setItem("visits", JSON.stringify(visits));

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
  window.addEventListener("beforeunload", trackActivity);

  // Calculate average time spent per page when the user leaves the website
  window.addEventListener("unload", () => {
    let previousPage = localStorage.getItem("previousPage");
    let userId = getSessionUserId();
    let startTime = parseInt(localStorage.getItem("startTime"));
    let endTime = new Date().getTime();

    savePageVisit(userId, previousPage, startTime, endTime);
    calculateAverageTimePerPage(userId);
  });
}

const calculateAverageTimePerPage = (userId) => {
  let visits = localStorage.getItem("visits");
  if (visits) {
    visits = JSON.parse(visits);
    let totalTime = 0;
    visits.forEach((visit) => {
      let visitTime = visit.endTime - visit.startTime;
      totalTime += visitTime;
    });
    let averageTimePerPage = totalTime / visits.length;
    // set the average time per page in local storage
    localStorage.setItem("averageTimePerPage", averageTimePerPage.toString());
    console.log("Average time per page:", averageTimePerPage);
  }
};

export default trackActivity;
