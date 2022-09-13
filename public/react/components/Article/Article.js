import React from "react";

import apiURL from "../../api";

export const Article = ({ setData, data, fetchPages }) => {
  const day = new Date(data.createdAt).getUTCDate();
  const month = new Date(data.createdAt).getUTCMonth();
  const year = new Date(data.createdAt).getUTCFullYear();
  console.log(data);

  async function deleteArticle() {
    const res = await fetch(`${apiURL}/wiki/${data.slug}`, {
      method: "DELETE",
    });
    const resData = await res.json();

    setData(null);
    await fetchPages();
  }

  return (
    <>
      <h2>{data.title}</h2>
      <div>
        <strong>Author: </strong>
        {data.author.name}
      </div>
      <div>
        <strong>Published: </strong>
        {`${month + 1}/${day}/${year}`}
      </div>
      <div>{data.content}</div>
      <div>
        <strong>Tags: </strong>
      </div>
      <>
        {data.tags.map((tag) => (
          <div>{tag.name}</div>
        ))}
      </>
      <button onClick={() => setData(null)}>Back to Wiki List</button>
      <button onClick={deleteArticle}>DELETE</button>
    </>
  );
};
