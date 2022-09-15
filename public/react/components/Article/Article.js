import React, { useState, useEffect } from "react";
import { UpdateArticle } from "../UpdateArticle/UpdateArticle";

import apiURL from "../../api";

const blankOptions = {
  title: "",
  content: "",
  name: "",
  email: "",
  tags: "",
};

export const Article = ({ setData, data, fetchPages }) => {
  const [isUpdatingArticle, setIsUpdatingArticle] = useState(false);
  const [updatedData, setUpdatedData] = useState(blankOptions);
  let [updatedInputOptions, setUpdatedInputOptions] = useState({});

  useEffect(() => {
    setUpdatedData({ ...data });
  }, []);

  const day = new Date(data.createdAt).getUTCDate();
  const month = new Date(data.createdAt).getUTCMonth();
  const year = new Date(data.createdAt).getUTCFullYear();

  async function deleteArticle() {
    const res = await fetch(`${apiURL}/wiki/${data.slug}`, {
      method: "DELETE",
    });
    const resData = await res.json();

    setData(null);
    await fetchPages();
  }

  async function submitUpdatedData(e) {
    console.log(updatedInputOptions);
    e.preventDefault();
    const res = await fetch(`${apiURL}/wiki/${data.slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedInputOptions),
    });
    const resData = await res.json();
    setIsUpdatingArticle(false);
    setData(null);
    await fetchPages();

    // return resData;
  }

  return (
    <>
      {!isUpdatingArticle ? (
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
          <button onClick={() => setIsUpdatingArticle(true)}>
            Update Article
          </button>
        </>
      ) : (
        <UpdateArticle
          initialInputOptions={blankOptions}
          submitUpdatedData={submitUpdatedData}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
          setIsUpdatingArticle={setIsUpdatingArticle}
          updatedInputOptions={updatedInputOptions}
          setUpdatedInputOptions={setUpdatedInputOptions}
        />
      )}
    </>
  );
};
