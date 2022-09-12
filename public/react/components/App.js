import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import { Form } from "./Form/Form";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import { Article } from "./Article/Article";

const initialInputOptions = {
  title: "",
  content: "",
  authorName: "",
  authorEmail: "",
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

  function submitHandler(e) {
    e.preventDefault();
    console.log(inputOptions);
    setIsAddingArticle(false);
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
            <Article setData={setData} data={data} />
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
