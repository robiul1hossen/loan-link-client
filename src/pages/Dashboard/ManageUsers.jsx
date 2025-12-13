import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const ManageUsers = () => {
  const [searchData, setSearchData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [roles, setRoles] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  useEffect(() => {
    setSearchData(users);
  }, [users]);
  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    setRoles((prev) =>
      checked ? [...prev, value] : prev.filter((role) => role !== value)
    );
  };

  const handleFilter = (e) => {
    e.preventDefault();
    console.log(roles);
    axiosSecure
      .get(`/search/user?`, {
        params: {
          keyword,
          roles,
        },
      })
      .then((res) => {
        setSearchData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="mt-5">
        <Title
          text1={"Manage"}
          text2={"Users"}
          text3={
            "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis, numquam animi mollitia ab ducimus. Perspiciatis error nostrum officiis culpa!"
          }
        />
        <form onSubmit={handleFilter}>
          <div className="flex flex-col justify-end items-end">
            <div className="flex gap-1 items-center mt-4">
              <div>
                <label className="label">
                  <input
                    value="Borrower"
                    onChange={handleRoleChange}
                    type="checkbox"
                    className="checkbox"
                  />
                  Borrower
                </label>
              </div>
              <div>
                <label className="label">
                  <input
                    value="Manager"
                    onChange={handleRoleChange}
                    type="checkbox"
                    className="checkbox"
                  />
                  Manager
                </label>
              </div>
              <div>
                <label className="label">
                  <input
                    value="Admin"
                    onChange={handleRoleChange}
                    type="checkbox"
                    className="checkbox"
                  />
                  Admin
                </label>
              </div>
            </div>
            <div className="md:text-right mt-2">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Users"
                className="input outline-none "
              />
              <button type="submit" className="btn btn-primary w-full mt-2">
                {" "}
                filter
              </button>
            </div>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Role Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchData.map((user, i) => (
                <tr key={user._id}>
                  <th>{i + 1}</th>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.roleStatus}</td>
                  <td>
                    <Link to={`/dashboard/update-role/${user._id}`}>
                      <button className="btn btn-primary btn-xs cursor-pointer">
                        Update Role
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
