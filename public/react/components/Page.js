import React from "react";

export const Page = ({ fetchArticleData, page }) => {
  return (
    <>
      <h3 onClick={() => fetchArticleData(page)}>{page.title}</h3>
      {/* <h3 onClick={() => console.log(page)}>{page.title}</h3> */}
    </>
  );
};
