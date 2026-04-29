export default function userInfo(username, password) {
  if (username === "admin" && password === "admin123") {
    return { username, role: "Admin", status: "ok", error: null };
  } else if (username === "staff" && password === "staff123") {
    return { username, role: "Staff", status: "ok", error: null };
  } else {
    return {
      username: null,
      role: null,
      status: "fail",
      error: "Username or password not match",
    };
  }
}
