import React, { useState } from "react";
import "./App.css";
import Cart from "./Cart";
const API_ENDPOINT = "/graphql";
const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);
  const [leetId, setLeetId] = useState([]);
  const displayTitle = (item, titleSlug) => {
    const exisitingTitles = user.map((innerArray) => innerArray[0]);
    const exisitingSlugs = user.map((innerArray) => innerArray[1]);
    const uniqueTitles = [...new Set([...exisitingTitles, ...item])];
    const uniqueSlugs = [...new Set([...exisitingSlugs, ...titleSlug])];
    // const uniquePairs = uniqueTitles.map((name, index) => ({
    //   name,
    //   link: uniqueSlugs[index],
    // }));
    const uniquePairs = [];
    for (let i = 0; i < uniqueSlugs.length; i++) {
      const temp = [uniqueTitles[i], uniqueSlugs[i]];
      uniquePairs.push(temp);
    }
    setUser((prevState) => {
      return uniquePairs;
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const query = `
      {
        recentAcSubmissionList(username: "${username}") {
          id
          title
          titleSlug
        }
      }
    `;

    const url = `${API_ENDPOINT}?query=${encodeURIComponent(query)}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const titles = result.data.recentAcSubmissionList.map(
          (submission) => submission.title
        );
        const titleslugs = result.data.recentAcSubmissionList.map(
          (submission) => submission.titleSlug
        );
        displayTitle(titles, titleslugs);
        // displayTitleSlug(titleslugs);
      })
      .catch((error) => {
        setCartIsShown(true);
      });
  };

  const handleSubmit = (event) => {
    handleFormSubmit(event);
  };
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const isSubmitDisabled = username.trim().length === 0;
  return (
    <div className="app">
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <h1 className="app__title">User Information</h1>
      <form onSubmit={handleSubmit} className="app__form">
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
          className="app__input"
        />
        <button
          type="submit"
          className={`${
            isSubmitDisabled === true ? "app__button_disabled" : "app__button"
          }`}
          disabled={isSubmitDisabled}
        >
          Add Friend
        </button>
      </form>
      {isSubmitDisabled === true && (
        <div style={{ display: "block" }} className="errorShow">
          {" "}
          *Enter atleast one character
        </div>
      )}
      {user.length > 0 ? (
        <ul className="app__list">
          {user.map((item) => (
            <li className="app__item">
              <a
                href={`https://leetcode.com/problems/${item[1]}`}
                target="_blank"
              >
                {item[0]}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="app__message">No User Found</p>
      )}
    </div>
  );
};

export default App;
