// Utility function to parse cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const getUserInfo = () => {
  const token = getCookie("token");
  if (token) {
    const decoded = jwt.decode(token); // Decode the JWT token to get user info
    return decoded;
  }
  return null;
};

export { getCookie, getUserInfo };
