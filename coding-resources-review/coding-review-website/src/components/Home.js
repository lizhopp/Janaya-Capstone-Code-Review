import React, { useEffect, useState } from "react";
import ResourceDetail from "../components/ResourceDetail";

function Home() {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch("http://localhost:5000/api/resources"); // Ensure this URL is correct
        const text = await response.text(); // Read raw response
        console.log("Raw response:", text); // Debug log

        const data = JSON.parse(text); // Convert to JSON
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    }

    fetchResources();
  }, []);

  return (
    <div>
      <h3>Resources</h3>
      <div>
        {resources.map((resource) => (
          <ResourceDetail key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

export default Home;
