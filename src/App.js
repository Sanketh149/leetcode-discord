import React, { useState } from "react";

const API_ENDPOINT = "/graphql";
const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);

  const print = (item) => {
    const uniqueValues = [...new Set([...user, ...item])];
    setUser((prevState) => {
      return uniqueValues;
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const query = `
      {
        recentAcSubmissionList(username: "${username}") {
          id
          title
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
        print(titles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    handleFormSubmit(event);
  };

  return (
    <div>
      <h1>User Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
        />
        <button type="submit">Submit</button>
      </form>
      {user.length > 0 ? (
        <p>
          {user.map((e) => (
            <li>{e}</li>
          ))}
        </p>
      ) : (
        <p>No User Found</p>
      )}
    </div>
  );
};

export default App;
