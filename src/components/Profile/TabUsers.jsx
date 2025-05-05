import { useEffect, useState } from "react";
import { fetchAllUsers, changeUserRole } from "@/api/adminApi";
import { toast } from "react-toastify";

const roles = ["user", "manager"];

const TabUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      toast.error(err.message || "Помилка завантаження користувачів");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await changeUserRole({ userId, newRole });
      toast.success("Роль оновлено");
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      toast.error(err.message || "Помилка зміни ролі");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (isLoading) return <p className="text-center">Завантаження...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Користувачі</h2>
      <div className="hidden md:block overflow-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Роль</th>
              <th className="p-2">Змінити роль</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, username, email, role }) => (
              <tr key={id} className="border-b">
                <td className="p-2">{id}</td>
                <td className="p-2">{username}</td>
                <td className="p-2">{email}</td>
                <td className="p-2 font-medium">{role}</td>
                <td className="p-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={role}
                    onChange={(e) => handleRoleChange(id, e.target.value)}
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden space-y-4">
        {users.map(({ id, username, email, role }) => (
          <div
            key={id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200"
          >
            <p className="text-sm text-gray-500">ID: {id}</p>
            <p className="font-semibold text-lg">{username}</p>
            <p className="text-sm text-gray-700 mb-2">{email}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Роль: {role}</span>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={role}
                onChange={(e) => handleRoleChange(id, e.target.value)}
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabUsers;
