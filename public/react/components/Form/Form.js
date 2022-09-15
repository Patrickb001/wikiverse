import React, { useEffect } from "react";

const blankOptions = {
  title: "",
  content: "",
  tags: "",
};

export const Form = ({ submitHandler, setInputOptions, inputOptions }) => {
  useEffect(() => {
    if (inputOptions.title != "") {
      setInputOptions(blankOptions);
    }
  }, []);

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "12.5%",
          margin: "1.2rem 2.4rem",
        }}
        onSubmit={submitHandler}
      >
        <input
          onChange={(e) =>
            setInputOptions({ ...inputOptions, title: e.target.value })
          }
          value={inputOptions.title}
          placeholder="Title"
          type="text"
        />
        <input
          onChange={(e) =>
            setInputOptions({ ...inputOptions, content: e.target.value })
          }
          value={inputOptions.content}
          placeholder="Article Content"
        />
        <input
          onChange={(e) =>
            setInputOptions({ ...inputOptions, name: e.target.value })
          }
          value={inputOptions.name}
          placeholder="Author Name"
        />
        <input
          onChange={(e) =>
            setInputOptions({ ...inputOptions, email: e.target.value })
          }
          value={inputOptions.email}
          placeholder="Author Email"
        />
        <input
          onChange={(e) =>
            setInputOptions({ ...inputOptions, tags: e.target.value })
          }
          value={inputOptions.tags}
          placeholder="Tags"
        />
        <button type="submit">Create Page</button>
      </form>
    </>
  );
};
