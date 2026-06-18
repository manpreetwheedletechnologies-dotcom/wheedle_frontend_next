'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../lib/api';
import { Plus, Edit, Trash2, X, Shield, Users, CheckSquare, Square } from 'lucide-react';
import Toast from './Toast';

const authHeader = () => ({
  Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('adminToken') || '' : ''}`,
});

export default function TeamTab({ currentUser }) {
  const [activeSubTab, setActiveSubTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermMap, setRolePermMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // User form
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [uName, setUName] = useState('');
  const [uEmail, setUEmail] = useState('');
  const [uPassword, setUPassword] = useState('');
  const [uType, setUType] = useState('employee');
  const [uRoleId, setURoleId] = useState('');
  const [uProjectId, setUProjectId] = useState('');

  const [projects, setProjects] = useState([]);

  // Role permission saving
  const [savingRolePerms, setSavingRolePerms] = useState(false);
  const [pendingRolePerms, setPendingRolePerms] = useState({});

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchPermissions();
    fetchProjects();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/rbac/users`, { headers: authHeader() });
      setUsers(res.data);
    } catch (e) {
      console.error('Failed to fetch users', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/rbac/roles`, { headers: authHeader() });
      setRoles(res.data);
    } catch (e) {
      console.error('Failed to fetch roles', e);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/projects`, { headers: authHeader() });
      setProjects(res.data);
    } catch (e) {
      console.error('Failed to fetch projects', e);
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/rbac/permissions`, { headers: authHeader() });
      setPermissions(res.data);
    } catch (e) {
      console.error('Failed to fetch permissions', e);
    }
  };

  const fetchRolePermissions = async (roleId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/rbac/roles/${roleId}/permissions`, { headers: authHeader() });
      setRolePermMap(prev => ({ ...prev, [roleId]: res.data.map(p => String(p)) }));
    } catch (e) {
      console.error('Failed to fetch role permissions', e);
    }
  };

  useEffect(() => {
    if (activeSubTab === 'permissions' && roles.length > 0) {
      roles.forEach(role => fetchRolePermissions(role._id));
    }
  }, [activeSubTab, roles]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/rbac/users`, {
        name: uName,
        email: uEmail,
        password: uPassword,
        userType: uType,
        roleId: uRoleId || undefined,
        projectId: uType === 'client' ? (uProjectId || undefined) : undefined,
      }, { headers: authHeader() });
      setIsUserFormOpen(false);
      resetUserForm();
      fetchUsers();
      setToast({ message: 'User created successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to create user', e);
      setToast({ message: e?.response?.data?.message || 'Failed to create user', type: 'error' });
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUName(user.name || '');
    setUEmail(user.email || '');
    setUPassword('');
    setUType(user.userType || 'employee');
    setURoleId(user.roleId || '');
    setUProjectId(user.projectId || '');
    setIsUserFormOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/rbac/users/${editingUser._id}`, {
        name: uName,
        email: uEmail,
        userType: uType,
        roleId: uRoleId || undefined,
        projectId: uType === 'client' ? (uProjectId || undefined) : undefined,
        password: uPassword || undefined,
      }, { headers: authHeader() });
      setIsUserFormOpen(false);
      resetUserForm();
      fetchUsers();
      setToast({ message: 'User updated successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to update user', e);
      setToast({ message: e?.response?.data?.message || 'Failed to update user', type: 'error' });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/rbac/users/${userId}`, { headers: authHeader() });
      fetchUsers();
      setToast({ message: 'User deleted successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to delete user', e);
      setToast({ message: e?.response?.data?.message || 'Failed to delete user', type: 'error' });
    }
  };

  const resetUserForm = () => {
    setEditingUser(null);
    setUName('');
    setUEmail('');
    setUPassword('');
    setUType('employee');
    setURoleId('');
    setUProjectId('');
  };

  const togglePendingPerm = (roleId, permId) => {
    const current = pendingRolePerms[roleId] ?? (rolePermMap[roleId] || []);
    const permStr = String(permId);
    const updated = current.includes(permStr)
      ? current.filter(p => p !== permStr)
      : [...current, permStr];
    setPendingRolePerms(prev => ({ ...prev, [roleId]: updated }));
  };

  const isPermEnabled = (roleId, permId) => {
    const pending = pendingRolePerms[roleId];
    const list = pending !== undefined ? pending : (rolePermMap[roleId] || []);
    return list.includes(String(permId));
  };

  const saveRolePermissions = async (roleId) => {
    const permIds = pendingRolePerms[roleId] || rolePermMap[roleId] || [];
    const specs = permissions
      .filter(p => permIds.includes(String(p._id)))
      .map(p => ({ moduleKey: p.moduleKey, permissionKey: p.permissionKey }));

    try {
      setSavingRolePerms(true);
      await axios.post(`${API_BASE_URL}/rbac/roles/${roleId}/permissions`, {
        permissionSpecs: specs,
      }, { headers: authHeader() });
      setPendingRolePerms(prev => {
        const copy = { ...prev };
        delete copy[roleId];
        return copy;
      });
      await fetchRolePermissions(roleId);
      setToast({ message: 'Permissions saved successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to save permissions', e);
      setToast({ message: e?.response?.data?.message || 'Failed to save permissions', type: 'error' });
    } finally {
      setSavingRolePerms(false);
    }
  };

  // Group permissions by module for display
  const permsByModule = permissions.reduce((acc, perm) => {
    if (!acc[perm.moduleKey]) acc[perm.moduleKey] = [];
    acc[perm.moduleKey].push(perm);
    return acc;
  }, {});

  const roleColorMap = {
    'Super Admin': 'from-red-500 to-red-700',
    'Admin': 'from-blue-500 to-blue-700',
    'Team Lead': 'from-indigo-500 to-indigo-700',
    'Employee': 'from-emerald-500 to-emerald-700',
    'Client': 'from-amber-500 to-amber-700',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Team Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage team members, roles and access permissions.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border rounded-xl overflow-hidden shadow-sm">
          {[
            { key: 'users', label: 'User Management', Icon: Users },
            { key: 'permissions', label: 'Role Permissions', Icon: Shield },
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveSubTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition ${
                activeSubTab === key
                  ? 'bg-[#2E1A6D] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* USER MANAGEMENT */}
      {activeSubTab === 'users' && (
        <div className="space-y-5">
          <div className="flex justify-end">
            <button
              onClick={() => { resetUserForm(); setIsUserFormOpen(true); }}
              className="flex items-center gap-2 bg-[#0B2CC3] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition"
            >
              <Plus size={18} />
              <span>Add User</span>
            </button>
          </div>

          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b bg-gradient-to-r from-[#2E1A6D] to-[#4B2D73]">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Users size={18} />
                <span>All Team Members</span>
                <span className="ml-auto bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold">{users.length}</span>
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b text-xs font-bold text-gray-500 uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-center">Role</th>
                    <th className="px-6 py-3 text-center">Type</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan={5} className="text-center py-10 text-gray-400">Loading team...</td></tr>
                  ) : users.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${roleColorMap[user.role] || 'from-gray-400 to-gray-600'} text-white flex items-center justify-center text-sm font-bold`}>
                            {user.name?.[0]?.toUpperCase() || '?'}
                          </div>
                          <span className="font-semibold text-gray-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{user.email}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${roleColorMap[user.role] || 'from-gray-400 to-gray-600'} text-white`}>
                          {user.role || 'No Role'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full capitalize">
                          {user.userType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center gap-3 justify-center">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-500 hover:text-blue-700 transition"
                            title="Edit User"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-400 hover:text-red-600 transition"
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ROLE PERMISSIONS MATRIX */}
      {activeSubTab === 'permissions' && (
        <div className="space-y-6">
          {roles.map((role) => (
            <div key={role._id} className="bg-white border rounded-2xl shadow-sm overflow-hidden">
              <div className={`p-5 border-b bg-gradient-to-r ${roleColorMap[role.name] || 'from-gray-500 to-gray-700'} flex justify-between items-center`}>
                <div>
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    <Shield size={18} />
                    {role.name}
                  </h4>
                  <p className="text-white/60 text-xs mt-0.5">Module-wise permission assignment for this role</p>
                </div>
                <button
                  onClick={() => saveRolePermissions(role._id)}
                  disabled={savingRolePerms || !pendingRolePerms[role._id]}
                  className="px-4 py-1.5 bg-white/20 hover:bg-white/30 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition border border-white/20"
                >
                  {savingRolePerms ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="p-6 space-y-5">
                {Object.entries(permsByModule).map(([moduleKey, perms]) => (
                  <div key={moduleKey}>
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      {moduleKey}
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {perms.map((perm) => {
                        const enabled = isPermEnabled(role._id, perm._id);
                        return (
                          <button
                            key={perm._id}
                            onClick={() => togglePendingPerm(role._id, perm._id)}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition ${
                              enabled
                                ? 'bg-purple-50 border-purple-300 text-purple-800'
                                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                            }`}
                          >
                            {enabled
                              ? <CheckSquare size={15} className="text-purple-600 flex-shrink-0" />
                              : <Square size={15} className="text-gray-400 flex-shrink-0" />}
                            <span className="text-xs font-semibold leading-tight">{perm.permissionKey}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* USER FORM MODAL */}
      {isUserFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-popup border">
            <div className="p-6 border-b flex justify-between items-center bg-[#2E1A6D] text-white">
              <h3 className="font-bold text-lg">{editingUser ? 'Edit User' : 'Add New User'}</h3>
              <button onClick={() => { setIsUserFormOpen(false); resetUserForm(); }} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="p-6 space-y-4 text-gray-700">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800"
                  placeholder="e.g. John Doe"
                  value={uName}
                  onChange={(e) => setUName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800"
                  placeholder="email@example.com"
                  value={uEmail}
                  onChange={(e) => setUEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  {editingUser ? 'New Password (leave blank to keep)' : 'Password'}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-800"
                  placeholder="••••••••"
                  value={uPassword}
                  onChange={(e) => setUPassword(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">User Type</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={uType}
                    onChange={(e) => setUType(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="team-lead">Team Lead</option>
                    <option value="employee">Employee</option>
                    <option value="client">Client</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Assign Role</label>
                  <select
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={uRoleId}
                    onChange={(e) => setURoleId(e.target.value)}
                  >
                    <option value="">No Role</option>
                    {roles.map((r) => (
                      <option key={r._id} value={r._id}>{r.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {uType === 'client' && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Assign Project *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] text-gray-600"
                    value={uProjectId}
                    onChange={(e) => setUProjectId(e.target.value)}
                  >
                    <option value="">Select Project</option>
                    {projects.map((p) => (
                      <option key={p._id} value={p._id}>{p.projectName}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="border-t pt-4 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => { setIsUserFormOpen(false); resetUserForm(); }}
                  className="px-4 py-2 border rounded-xl hover:bg-gray-50 text-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2CC3] hover:bg-blue-700 text-white rounded-xl font-semibold transition"
                >
                  {editingUser ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
