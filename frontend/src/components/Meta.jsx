import React from "react";
import { Helmet } from "react-helmet-async";
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps={
    title:'Welcome to HealthChannel.sg',
    description: "Your one-stop specialist search platform",
    keywords: "specialists, doctors, appointments, insurance"
}
export default Meta;
