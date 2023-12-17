import React from "react";
import Accordion from "./Accordion";

const FourAccordions = () => {
  return (
    <>
      <Accordion
        title={"Контрола на квалитет"}
        content={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis eum recusandae magni maxime vitae, tempore necessitatibus veritatis rerum illum labore, laudantium aspernatur. Doloribus voluptate unde eius exercitationem error quaerat beatae."
        }
      />
      <Accordion
        title={"Политика на враќање"}
        content={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis eum recusandae magni maxime vitae, tempore necessitatibus veritatis rerum illum labore, laudantium aspernatur. Doloribus voluptate unde eius exercitationem error quaerat beatae."
        }
      />
      <Accordion
        title={"Достава"}
        content={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis eum recusandae magni maxime vitae, tempore necessitatibus veritatis rerum illum labore, laudantium aspernatur. Doloribus voluptate unde eius exercitationem error quaerat beatae."
        }
      />
      <Accordion
        title={"Помош"}
        content={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis eum recusandae magni maxime vitae, tempore necessitatibus veritatis rerum illum labore, laudantium aspernatur. Doloribus voluptate unde eius exercitationem error quaerat beatae."
        }
      />
    </>
  );
};

export default FourAccordions;
