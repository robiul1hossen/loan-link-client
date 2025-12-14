import React, { useEffect, useRef, useState } from "react";
import Title from "../../components/Title";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const RoleUpdate = () => {
  const [roleStatus, setRoleStatus] = useState("");
  const [note, setNote] = useState("");
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const suspendModalRef = useRef();
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
    console.log(roleStatus);
  };
  console.log(roleStatus);

  const handleSuspend = () => {
    setRoleStatus("suspended");
  };

  const handleSave = async () => {
    const rejectNote = {
      message: note,
      roleStatus,
    };
    if (roleStatus === "suspended") {
      const res = await axiosSecure.patch(`/users/role/${id}`, {
        rejectNote,
      });
      if (res.data.modifiedCount) {
        console.log(res.data);
        toast.success("Updated successfully!");
        refetch();
      }
    } else {
      console.log(roleStatus);
      console.log(rejectNote);
      const res = await axiosSecure.patch(`/users/role/${id}`, { rejectNote });
      console.log(res.data);
      if (res.data.modifiedCount) {
        toast.success("Updated successfully!");
        refetch();
      }
    }
  };
  const openSuspendModal = () => {
    suspendModalRef.current.showModal();
  };
  return (
    <div>
      <div className="mt-5">
        <Title text1={"Update"} text2={"Users"} />
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
              <button
                onClick={openSuspendModal}
                className="btn btn-error btn-sm">
                Suspend
              </button>
            )}
          </div>

          <button onClick={handleSave} className="btn btn-primary w-full mt-6">
            Save Changes
          </button>
        </div>
      </div>
      <dialog
        ref={suspendModalRef}
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="max-w-sm w-full rounded-2xl bg-white p-4">
            {/* Header */}
            <h2 className="font-bold text-xl mb-3">Write a suspend note:</h2>
            <div className="flex flex-col items-end">
              <textarea
                name=""
                onChange={(e) => setNote(e.target.value)}
                className="w-full border outline-none px-3"
                color={5}
                rows={5}
                id=""></textarea>
              <button
                onClick={handleSuspend}
                className="btn btn-primary btn-outline mt-2">
                Suspend
              </button>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RoleUpdate;
