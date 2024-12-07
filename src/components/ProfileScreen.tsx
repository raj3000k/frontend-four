import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUser(response.data[0]); // Load the first user's data
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  if (!user) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-purple-700 text-white py-6 px-10 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
        <div className="flex items-center gap-4">
          <div className="bg-white text-purple-700 w-10 h-10 flex items-center justify-center rounded-full font-semibold">
            {user.name[0]}
          </div>
          <span className="text-white font-medium">{user.name}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center gap-6">
          <div className="bg-gray-200 w-20 h-20 flex items-center justify-center rounded-full text-xl font-semibold text-purple-700">
            {user.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              User ID
            </label>
            <div className="mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md">
              {user.id}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Name
            </label>
            <div className="mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md">
              {user.name}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Email ID
            </label>
            <div className="mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md">
              {user.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Phone
            </label>
            <div className="mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md">
              {user.phone}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500">
              Address
            </label>
            <div className="mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md">
              {user.address.street}, {user.address.suite}, {user.address.city},{" "}
              {user.address.zipcode}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-block bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
