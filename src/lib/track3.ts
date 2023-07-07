const track3 = () => {
  let startTime;
  let previousUrl = null;

  const startTimer = () => {
    startTime = new Date().getTime();
  };

  const stopTimer = () => {
    if (startTime) {
      const endTime = new Date().getTime();
      const timeSpent = endTime - startTime;
      const currentUrl = window.location.href;

      const pageData = {
        currentUrl,
        timeSpent,
        prevUrl: previousUrl,
      };

      let trackData = localStorage.getItem("trackData");
      if (trackData) {
        trackData = JSON.parse(trackData);
      } else {
        trackData = [];
      }
      trackData.push(pageData);
      localStorage.setItem("trackData", JSON.stringify(trackData));

      previousUrl = currentUrl;
      startTime = null;
    }
  };

  window.addEventListener("DOMContentLoaded", startTimer);
  window.addEventListener("beforeunload", stopTimer);
};

export default track3;
