import React, { use, useEffect, useState } from "react";
import Title from "../../components/Title";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const ManageUsers = () => {
  const { user } = use(AuthContext);
  const [searchData, setSearchData] = useState([]);
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
  const handleSearch = async (e) => {
    const keyword = e.target.value;
    await axiosSecure.get(`/search/user?keyword=${keyword}`).then((res) => {
      // console.log(res.data);
      setSearchData(res.data);
    });
  };
  // console.log("from const", handleSearch);
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
        <div className="md:text-right my-4">
          <input
            type="text"
            // onChange={(e) => setSearch(e.target.value)}
            onChange={(e) => handleSearch(e)}
            placeholder="Find your loan here"
            className="input outline-none "
          />
        </div>
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
