import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type SortOrder = "asc" | "desc" | null;

const CommentsDashboard = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setComments(response.data);
        setFilteredComments(response.data);
      });
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUser(response.data[0]);
    });
  }, []);

  useEffect(() => {
    let updatedComments = [...comments];

    if (search) {
      const lowercasedSearch = search.toLowerCase();
      updatedComments = updatedComments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(lowercasedSearch) ||
          comment.email.toLowerCase().includes(lowercasedSearch) ||
          comment.body.toLowerCase().includes(lowercasedSearch)
      );
    }

    if (sortColumn && sortOrder) {
      updatedComments.sort((a, b) => {
        const valueA = a[sortColumn as keyof Comment];
        const valueB = b[sortColumn as keyof Comment];

        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredComments(updatedComments);
  }, [search, comments, sortColumn, sortOrder]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(
        sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc"
      );
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const paginatedComments = filteredComments.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-purple-700 text-white py-6 px-10 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Comments Dashboard</h1>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="bg-white text-purple-700 w-10 h-10 flex items-center justify-center rounded-full font-semibold">
                {user.name[0]}
              </div>
              <span className="text-white font-medium">{user.name}</span>
            </>
          )}
          <button
            onClick={() => navigate("/profile")}
            className="bg-white text-purple-700 py-2 px-4 rounded hover:bg-purple-100 transition"
          >
            Go to Profile Screen
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button
              className={`py-1 px-3 text-sm rounded-full ${
                sortColumn === "postId" && sortOrder
                  ? "bg-purple-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleSort("postId")}
            >
              Sort Post ID{" "}
              {sortColumn === "postId" &&
                (sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : "")}
            </button>
            <button
              className={`py-1 px-3 text-sm rounded-full ${
                sortColumn === "name" && sortOrder
                  ? "bg-purple-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleSort("name")}
            >
              Sort Name{" "}
              {sortColumn === "name" &&
                (sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : "")}
            </button>
            <button
              className={`py-1 px-3 text-sm rounded-full ${
                sortColumn === "email" && sortOrder
                  ? "bg-purple-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleSort("email")}
            >
              Sort Email{" "}
              {sortColumn === "email" &&
                (sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : "")}
            </button>
          </div>

          <input
            type="text"
            placeholder="Search name, email, comment"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-64"
          />
        </div>

        {/* Table Full */}
        <div className="rounded-lg shadow-lg overflow-hidden border border-gray-300">
          <table className="table-auto w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300">Post ID</th>
                <th className="px-4 py-2 border-b border-gray-300">Name</th>
                <th className="px-4 py-2 border-b border-gray-300">Email</th>
                <th className="px-4 py-2 border-b border-gray-300">Comment</th>
              </tr>
            </thead>
            <tbody>
              {paginatedComments.map((comment, index) => (
                <tr
                  key={comment.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 border-b border-gray-300">
                    {comment.postId}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 capitalize">
                    {comment.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {comment.email}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {comment.body}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination FunctionalIty */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-gray-600">
            {`${(page - 1) * pageSize + 1}-${Math.min(
              page * pageSize,
              filteredComments.length
            )} of ${filteredComments.length} items`}
          </span>
          <div className="flex items-center gap-4">
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-4 py-2"
            >
              <option value={10}>10 / Page</option>
              <option value={50}>50 / Page</option>
              <option value={100}>100 / Page</option>
            </select>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page * pageSize >= filteredComments.length}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsDashboard;
