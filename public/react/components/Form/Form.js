import React from "react";

export const Form = ({ submitHandler, setInputOptions, inputOptions }) => {
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
          value={inputOptions.authorName}
          placeholder="Author Name"
        />
        <input
          onChange={(e) =>
            setInputOptions({ ...inputOptions, email: e.target.value })
          }
          value={inputOptions.authorEmail}
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
