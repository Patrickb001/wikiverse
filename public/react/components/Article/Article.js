import React from "react";

export const Article = ({ setData, data }) => {
  const day = new Date(data.createdAt).getUTCDate();
  const month = new Date(data.createdAt).getUTCMonth();
  const year = new Date(data.createdAt).getUTCFullYear();

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
    </>
  );
};
