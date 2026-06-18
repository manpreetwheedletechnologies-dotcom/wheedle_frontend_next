import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../lib/api';
import { Plus, Edit2, Trash2, Calendar, Users, X, Activity } from 'lucide-react';

const ProjectsTab = ({ hasPermission = () => true }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentProject, setCurrentProject] = useState(null);

  const [users, setUsers] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    status: 'Active',
    startDate: '',
    endDate: '',
    assignedClients: [],
    assignedTeamMembers: []
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`, getAuthHeaders());
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rbac/users`, getAuthHeaders());
      setUsers(response.data);
    } catch (err) {
      if (err.response?.status !== 403) {
        console.error('Failed to fetch users:', err);
      }
    }
  };

  const handleOpenModal = (mode, project = null) => {
    setModalMode(mode);
    if (mode === 'edit' && project) {
      setCurrentProject(project);
      setFormData({
        projectName: project.projectName,
        description: project.description || '',
        status: project.status,
        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
        assignedClients: project.assignedClients.map(c => c._id),
        assignedTeamMembers: project.assignedTeamMembers.map(t => t._id)
      });
    } else {
      setCurrentProject(null);
      setFormData({
        projectName: '',
        description: '',
        status: 'Active',
        startDate: '',
        endDate: '',
        assignedClients: [],
        assignedTeamMembers: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options).filter(option => option.selected).map(option => option.value);
    setFormData({ ...formData, [name]: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_BASE_URL}/projects`;

      const payload = {
        ...formData,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
      };

      if (modalMode === 'add') {
        await axios.post(url, payload, getAuthHeaders());
      } else {
        await axios.put(`${url}/${currentProject._id}`, payload, getAuthHeaders());
      }
      fetchProjects();
      handleCloseModal();
    } catch (err) {
      console.error('Failed to save project:', err);
      alert('Failed to save project');
    }
  };

  const handleArchive = async (id) => {
    if (!confirm('Are you sure you want to archive this project?')) return;
    try {
      await axios.patch(`${API_BASE_URL}/projects/${id}/archive`, {}, getAuthHeaders());
      fetchProjects();
    } catch (err) {
      console.error('Failed to archive project:', err);
      alert('Failed to archive project');
    }
  };

  const clients = users.filter(u => u.userType === 'client');
  const teamMembers = users.filter(u => u.userType !== 'client');

  if (loading) return <div className="p-8 text-center text-gray-500">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        {hasPermission('tasks', 'tasks.create') && (
          <button
            onClick={() => handleOpenModal('add')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{project.projectName}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2
                  ${project.status === 'Active' ? 'bg-green-100 text-green-800' :
                    project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'Archived' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {project.status}
                </span>
              </div>
              <div className="flex space-x-2">
                {hasPermission('tasks', 'tasks.edit') && (
                  <button onClick={() => handleOpenModal('edit', project)} className="p-1 text-gray-400 hover:text-blue-500">
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
                {project.status !== 'Archived' && hasPermission('tasks', 'tasks.delete') && (
                  <button onClick={() => handleArchive(project._id)} className="p-1 text-gray-400 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 flex-grow mb-4">{project.description}</p>

            <div className="space-y-3 mt-auto">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'No start date'}
                  {' - '}
                  {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'No end date'}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                <span>{project.assignedClients.length} Clients, {project.assignedTeamMembers.length} Team Members</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white rounded-t-xl">
              <h2 className="text-xl font-semibold">{modalMode === 'add' ? 'Create Project' : 'Edit Project'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="project-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                  <input
                    type="text"
                    name="projectName"
                    required
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="w-full text-black px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full text-black px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full text-black px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Completed">Completed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-black">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-black">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Clients</label>
                    <select
                      multiple
                      name="assignedClients"
                      value={formData.assignedClients}
                      onChange={handleMultiSelectChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    >
                      {clients.map(client => (
                        <option key={client._id} value={client._id}>{client.name} ({client.email})</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Team Members</label>
                    <select
                      multiple
                      name="assignedTeamMembers"
                      value={formData.assignedTeamMembers}
                      onChange={handleMultiSelectChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    >
                      {teamMembers.map(member => (
                        <option key={member._id} value={member._id}>{member.name} ({member.email})</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-xl">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                form="project-form"
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {modalMode === 'add' ? 'Create Project' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;
