import React from "react";
import { Helmet } from "react-helmet-async";
const Meta = ({ title, description, keywords }) => {
  const changeFavicon = () => {
    // Replace 'new-favicon.ico' with the path to your new favicon
    const newFavicon = "/api/webimage/66407bb03c516e3cea4baed1";

    // Update the favicon using Helmet
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = newFavicon;
    document.getElementsByTagName("head")[0].appendChild(link);
  };
  // Call changeFavicon when component mounts
  React.useEffect(() => {
    changeFavicon();

    // Cleanup function to remove added link element when component unmounts
    return () => {
      const link = document.querySelector("link[rel*='icon']");
      if (link) {
        document.getElementsByTagName("head")[0].removeChild(link);
      }
    };
  }, []);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to WikiDoctors.com",
  description: "Your one-stop specialist search platform",
  keywords: "specialists, doctors, appointments, insurance",
};
export default Meta;
