import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => {
        if (checked) {
          return { ...prevData, interests: [...prevData.interests, value] };
        } else {
          return {
            ...prevData,
            interests: prevData.interests.filter((interest) => interest !== value),
          };
        }
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Sign up for our newsletter</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <div>
          <h3>Interests</h3>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="React"
              checked={formData.interests.includes("React")}
              onChange={handleChange}
            />
            React
          </label>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="JavaScript"
              checked={formData.interests.includes("JavaScript")}
              onChange={handleChange}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="CSS"
              checked={formData.interests.includes("CSS")}
              onChange={handleChange}
            />
            CSS
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div>
          <h2>Thank you for signing up, {formData.name}!</h2>
          <p>We'll send updates to {formData.email}.</p>
          <p>Interests: {formData.interests.join(", ")}</p>
        </div>
      )}
    </main>
  );
}

export default App;