import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import { Form } from "./Form/Form";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import { Article } from "./Article/Article";

const initialInputOptions = {
  title: "",
  content: "",
  name: "",
  email: "",
  tags: "",
};

export const App = () => {
  const [pages, setPages] = useState([]);
  const [data, setData] = useState(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [inputOptions, setInputOptions] = useState(initialInputOptions);

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  async function fetchArticleData(page) {
    try {
      const res = await fetch(`${apiURL}/wiki/${page.slug}`);
      const articleData = await res.json();
      setData(articleData);
    } catch (err) {
      console.log("An error has occurred!", err);
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    const articleData = inputOptions;
    console.log(inputOptions);
    const res = await fetch(`${apiURL}/wiki`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });
    const data = await res.json();

    await fetchPages();
    setIsAddingArticle(false);
    resetFields();
  }
  function resetFields() {
    setInputOptions(initialInputOptions);
  }

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div>
      {isAddingArticle ? (
        <Form
          inputOptions={inputOptions}
          setInputOptions={setInputOptions}
          submitHandler={submitHandler}
        />
      ) : (
        <>
          {data ? (
            <Article fetchPages={fetchPages} setData={setData} data={data} />
          ) : (
            <main>
              <h1>WikiVerse</h1>
              <h2>An interesting 📚</h2>
              <PagesList fetchArticleData={fetchArticleData} pages={pages} />
              <button onClick={() => setIsAddingArticle(true)}>
                Create a new page
              </button>
            </main>
          )}
        </>
      )}
    </div>
  );
};
