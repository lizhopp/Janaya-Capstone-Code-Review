import React, { useState, useEffect } from "react";

function ResourceManagement() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch resources on component mount
  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/resources");
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const data = await response.json();
        setResources(data);
      } catch (error) {
        setError("Failed to load resources");
      } finally {
        setLoading(false);
      }
    };
    loadResources();
  }, []);

  const handleAddResource = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const resourceData = { title, description, type, language, link };

    try {
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resourceData),
      });

      if (!response.ok) {
        throw new Error("Failed to add resource");
      }

      const newResource = await response.json();
      setResources((prevResources) => [...prevResources, newResource]); // Add the new resource to the list
      setTitle("");
      setDescription("");
      setType("");
      setLanguage("");
      setLink("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/resources/${resourceId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete resource");
      }

      // Remove the deleted resource from the list
      setResources((prevResources) =>
        prevResources.filter((resource) => resource.id !== resourceId)
      );
      console.log("Resource deleted successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Add a New Resource</h2>
      <form onSubmit={handleAddResource}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Language:</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Link:</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Resource"}
        </button>
      </form>

      <h2>Resources</h2>
      {resources.length > 0 ? (
        <ul>
          {resources.map((resource) => (
            <li key={resource.id}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <p>Type: {resource.type}</p>
              <p>Language: {resource.language}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                Visit Resource
              </a>
              <button onClick={() => handleDeleteResource(resource.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources found.</p>
      )}
    </div>
  );
}

export default ResourceManagement;