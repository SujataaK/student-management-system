const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="search"
      className="form-control mb-3"
      placeholder="Search by name or course"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
