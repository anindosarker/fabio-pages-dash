const trackActivity = () => {
  if (typeof window !== "undefined") {
    let previousUrl = localStorage.getItem("previousUrl");
    let currentUrl = window.location.href;

    // Check if the user is visiting a new page
    if (currentUrl !== previousUrl) {
      let startTime = new Date().getTime();

      // Check if this is the first page visit
      if (previousUrl !== null) {
        let endTime = new Date().getTime();
        let timeSpent = endTime - parseInt(localStorage.getItem("startTime"));
        let os = navigator.platform;
        let title = document.title;
        let language = navigator.language;
        let user_agent = navigator.userAgent;

        const activity = {
          url_referrer: previousUrl,
          time_spent: timeSpent,
          os: os,
          title: title,
          language: language,
          user_agent: user_agent,
        };
        let activities = JSON.parse(localStorage.getItem("activities")) || [];
        activities.push(activity);
        localStorage.setItem("activities", JSON.stringify(activities));

        // Send the activity data to the API endpoint
        sendData(activity);
      }

      // Update the start time for the new page
      localStorage.setItem("startTime", startTime.toString());
    }
    // Save the current page for the next iteration
    localStorage.setItem("previousUrl", currentUrl);
  }
};

// Only add the event listener on the client-side
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", async () => {
    let previousUrl = localStorage.getItem("previousUrl");
    let startTime = parseInt(localStorage.getItem("startTime"));
    let endTime = new Date().getTime();
    let timeSpent = endTime - startTime;

    // Update the analytics data with the time spent on the previous page
    if (previousUrl !== null) {
      let os = navigator.platform;
      let title = document.title;
      let language = navigator.language;
      let user_agent = navigator.userAgent;

      const activity = {
        url_referrer: previousUrl,
        time_spent: timeSpent,
        os: os,
        title: title,
        language: language,
        user_agent: user_agent,
      };

      let activities = JSON.parse(localStorage.getItem("activities")) || [];
      activities.push(activity);
      localStorage.setItem("activities", JSON.stringify(activities));

      // Send the activity data to the API endpoint
      sendData(activity);

      // Clear the activities data from local storage
      localStorage.removeItem("activities");
    }
  });
}

const sendData = async (activity) => {
  const fetchUrl = "http://localhost:3001/api/store";
  // const fetchUrl = "http://localhost:3000/api/web/access";

  await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  })
    .then((response) => {
      console.log("Activity data sent successfully", response.json());
    })
    .catch((error) => {
      console.error("Error sending activity data:", error);
    });
};

// Start tracking time when the page is loaded
trackActivity();

// Export the trackActivity function
export default trackActivity;
