const grabInfo = () => {
  let os = navigator.platform;
  let date = new Date();
  let title = document.title;
  let url_referrer =
    window.location.host.length > 0 ? window.location.host.toLowerCase() : "";
  let language = navigator.language;
  let user_agent = navigator.userAgent;

  let userId = getCookie("userId"); // Retrieve the user ID from the cookie

  if (!userId) {
    userId = generateUserId(); // Generate a new user ID if it doesn't exist
    setCookie("userId", userId, 365); // Set the user ID in a cookie that expires in 365 days
  }

  let info = {
    userId,
    os,
    date,
    title,
    url_referrer,
    language,
    user_agent,
  };

  // saveUserInfo(info); // Save the user information in the database

  console.log(info);
};

const generateUserId = () => {
  // Generate a unique user ID
  return Date.now();
};

const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name: string) => {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const saveUserInfo = (info: any) => {
  // Send the user information to your server-side code for database storage
  // You can use an AJAX request or any other method to send the data to your server

  // Example using AJAX:
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/save-user-info", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(info));
};

export default grabInfo;
