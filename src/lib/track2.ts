interface AnalyticsData {
  [url: string]: {
    userId: string;
    previousPage: string;
    currentPage: string;
    timeSpent: number;
    startTime: number;
    endTime: number;
  };
}

const trackAnalytics = (userId: string) => {
  let analytics: AnalyticsData = JSON.parse(localStorage.getItem("analytics")) || {};
  let previousUrl = window.location.pathname;

  const onRouteChange = () => {
    const url = window.location.pathname;
    const d = new Date();
    const dt = (d.getTime() - analytics[url].endTime) / 1000;
    analytics[previousUrl].timeSpent += dt;
    analytics[previousUrl].endTime = d.getTime();
    if (!analytics[url]) {
      analytics[url] = {
        userId: userId,
        previousPage: previousUrl,
        currentPage: url,
        timeSpent: 0,
        startTime: d.getTime(),
        endTime: d.getTime(),
      };
    }
    previousUrl = url;
    localStorage.setItem("analytics", JSON.stringify(analytics));
  };

  const onVisibilityChange = () => {
    // Don't send analytics if it's a bot
    if (
      window.phantom ||
      window._phantom ||
      window.__nightmare ||
      window.navigator.webdriver ||
      window.Cypress
    )
      return;
    if (document.visibilityState === "hidden") {
      const url = window.location.pathname;
      const d = new Date();
      const dt = (d.getTime() - analytics[url].endTime) / 1000;
      analytics[previousUrl].timeSpent += dt;
      analytics[previousUrl].endTime = d.getTime();
      const option = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(analytics[url]),
      };
      fetch(PERF_URL, { ...option })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    } else {
      // Reset analytics
      const url = window.location.pathname;
      const d = new Date();
      if (!analytics[url]) {
        analytics[url] = {
          userId: userId,
          previousPage: previousUrl,
          currentPage: url,
          timeSpent: 0,
          startTime: d.getTime(),
          endTime: d.getTime(),
        };
      }
      previousUrl = url;
      analytics[url].startTime = d.getTime();
      analytics[url].endTime = d.getTime();
      localStorage.setItem("analytics", JSON.stringify(analytics));
    }
  };

  document.addEventListener("visibilitychange", onVisibilityChange, {
    passive: true,
  });
  window.addEventListener("beforeunload", onVisibilityChange, {
    passive: true,
  });
  window.addEventListener("unload", onVisibilityChange, {
    passive: true,
  });
  window.addEventListener("popstate", onRouteChange, {
    passive: true,
  });
  window.addEventListener("hashchange", onRouteChange, {
    passive: true,
  });
  if (!analytics[previousUrl]) {
    const d = new Date();
    analytics[previousUrl] = {
      userId: userId,
      previousPage: null,
      currentPage: previousUrl,
      timeSpent: 0,
      startTime: d.getTime(),
      endTime: d.getTime(),
    };
  }
  localStorage.setItem("analytics", JSON.stringify(analytics));
};

export default trackAnalytics;