import React, { use } from "react";
import Title from "../../components/Title";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const ManageUsers = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

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
              {users.map((user, i) => (
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
