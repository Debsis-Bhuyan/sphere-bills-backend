import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const hashString = async (useValue) => {
  const salt = await bcrypt.genSalt(10);

  const hashedpassword = await bcrypt.hash(useValue, salt);
  return hashedpassword;
};

export const compareString = async (userPassword, password) => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};

//JSON WEBTOKEN
export function createJWT(id) {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}
export function generateFileName() {
  const currentDate = new Date();
  console.log(currentDate);

  let year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1);
  let day = String(currentDate.getDate());
  const dateFormatted = year + month + day;

  const hours = String(currentDate.getHours());
  const minutes = String(currentDate.getMinutes());
  const timeFormatted = hours + minutes;

  const fileName = "file_$" + dateFormatted + "_$" + timeFormatted + ".pdf";
  return fileName;
}
