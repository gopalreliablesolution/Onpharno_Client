import React from 'react';
import { UserCheck, Plus } from 'lucide-react';

const UsersAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal">Admin Users & Access Control</h1>
          <p className="text-xs text-gray-500 mt-1">Manage system administrators, roles (superadmin, admin, editor), and audit logs.</p>
        </div>
        <button className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow hover:bg-primary-dark">
          + Add Admin User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-warm border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="p-4 font-semibold text-charcoal">System Superadmin</td>
              <td className="p-4 text-gray-600 text-xs">admin@onpharno.com</td>
              <td className="p-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                  superadmin
                </span>
              </td>
              <td className="p-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  Active
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersAdmin;
