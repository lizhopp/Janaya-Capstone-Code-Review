export default function SearchBar({ searchTerm, setSearchTerm }) {
    return (
      <div className="search input">
        <input
          name="Search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>
    );
  }