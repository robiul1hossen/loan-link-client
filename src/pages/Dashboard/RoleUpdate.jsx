import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const RoleUpdate = () => {
  const [roleStatus, setRoleStatus] = useState("");
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: user = {}, refetch } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    setRoleStatus(user.roleStatus);
  }, [user]);

  const handleApprove = () => {
    setRoleStatus("approved");
  };

  const handleSuspend = () => {
    setRoleStatus("suspended");
  };

  const handleSave = async () => {
    const res = await axiosSecure.patch(`/users/role/${id}`, {
      roleStatus,
    });

    if (res.data.modifiedCount) {
      toast.success("Updated successfully!");
      refetch();
    }
  };
  return (
    <div>
      <div className="mt-5">
        <Title
          text1={"Update"}
          text2={"Users"}
          text3={
            "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quidem cupiditate sapiente nemo amet delectus quam quibusdam eaque a possimus?"
          }
        />
      </div>
      <div className="max-w-xl mx-auto p-6">
        <div className="card shadow-xl bg-base-100 p-6">
          <div className="flex gap-4 justify-center">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />

            <div>
              <h2 className="text-xl font-bold">{user.displayName}</h2>
              <p className="text-sm opacity-70">{user.email}</p>

              <p className="mt-1">
                <span className="font-semibold">Role:</span> {user.role}
              </p>

              <p className="mt-1">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`badge ${
                    roleStatus === "approved"
                      ? "badge-success"
                      : roleStatus === "pending"
                      ? "badge-warning"
                      : "badge-error"
                  }`}>
                  {roleStatus}
                </span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-center gap-3">
            {roleStatus !== "approved" && (
              <button
                onClick={handleApprove}
                className="btn btn-success btn-sm">
                Approve
              </button>
            )}

            {/* SUSPEND BUTTON */}
            {roleStatus !== "suspended" && (
              <button onClick={handleSuspend} className="btn btn-error btn-sm">
                Suspend
              </button>
            )}
          </div>

          <button onClick={handleSave} className="btn btn-primary w-full mt-6">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleUpdate;
