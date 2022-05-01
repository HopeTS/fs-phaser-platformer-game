import path from "path";

/** Get the Client build path */
const getClientBuildPath = () => {
  const buildPath = path.join(__dirname, "../../Client/build");
  return buildPath;
};

export default getClientBuildPath;
