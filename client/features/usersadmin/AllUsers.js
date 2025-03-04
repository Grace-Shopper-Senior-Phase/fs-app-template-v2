import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectUsers } from "../usersadmin/usersSlice";
import { fetchUsersAsync } from "../usersadmin/usersSlice";
import { deleteSingleUserAsync } from "../usersadmin/usersSlice";
import { deleteSingleCartAsync } from "../usersadmin/usersSlice";

const AllUsersAdmin = () => {
  const users = useSelector(selectUsers);

  const dispatch = useDispatch();

  const handleDelete = (userId) => {
    dispatch(deleteSingleCartAsync(userId))
      .then(() => dispatch(deleteSingleUserAsync(userId)))
      .then(() => dispatch(fetchUsersAsync()));
  };

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <div id="allUsers" className="flex flex-col items-center">
        <div className="grid grid-cols-8 gap-4">
            {users.map((user) => (
                <div className="p-4 rounded-full border-2 border-indigo-500">
                    <Link to={`/users/${user.id}`}>
                        <p className="text-indigo-500 text-lg">{user.username}</p>
                    </Link>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full" onClick={() => handleDelete(user.id)}>Delete User</button>
                </div>
            ))}
        </div>
    </div>
)
};
export default AllUsersAdmin; 