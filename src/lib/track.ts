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
        const activity = { url: previousUrl, timeSpent: timeSpent };
        let activities = JSON.parse(localStorage.getItem("activities")) || [];
        activities.push(activity);
        localStorage.setItem("activities", JSON.stringify(activities));
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
  window.addEventListener("beforeunload", () => {
    let previousUrl = localStorage.getItem("previousUrl");
    let startTime = parseInt(localStorage.getItem("startTime"));
    let endTime = new Date().getTime();
    let timeSpent = endTime - startTime;

    // Update the analytics data with the time spent on the previous page
    if (previousUrl !== null) {
      const activity = { url: previousUrl, timeSpent: timeSpent };
      let activities = JSON.parse(localStorage.getItem("activities")) || [];
      activities.push(activity);
      localStorage.setItem("activities", JSON.stringify(activities));

      // Send the activities data to the API endpoint
      fetch("http://localhost:3000/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activities),
      })
        .then((response) => {
          console.log("Activities data sent successfully");
        })
        .catch((error) => {
          console.error("Error sending activities data:", error);
        });

      // Clear the activities data from local storage
      localStorage.removeItem("activities");
    }
  });
}

// Start tracking time when the page is loaded
trackActivity();

// Export the trackActivity function
export default trackActivity;
