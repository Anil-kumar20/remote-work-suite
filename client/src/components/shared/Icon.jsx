import React from "react";

const Icon = ({ icon: IconComponent, className }) => {
  return <IconComponent className={`w-6 h-6 ${className}`} />;
};

export default Icon;
