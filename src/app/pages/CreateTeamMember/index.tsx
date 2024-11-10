import React, { useState, useEffect } from 'react';
import { teamMembersService } from '../../../services/teammembers.service';
import { ChevronLeft } from 'lucide-react';
import { MainPanel } from 'app/components/MainPanel';

export const CreateTeamMember: React.FC = () => {
  return <CreateTeamMemberContent />;
};

const CreateTeamMemberContent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('editor'); // Default role
  const [isEditMode, setIsEditMode] = useState(false);
  const [memberId, setMemberId] = useState('');

  useEffect(() => {
    const checkEditMode = async () => {
      const pathParts = window.location.pathname.split('/');
      const isTeamMembersPath = pathParts.includes('teammembers');
      
      if (isTeamMembersPath) {
        setIsEditMode(true);
        const teamMemberId = pathParts[pathParts.length - 1];
        setMemberId(teamMemberId);
        
        try {
          const member = await teamMembersService.getTeamMember(teamMemberId);
          if (member) {
            setEmail(member.email);
            setRole(member.role);
          }
        } catch (error) {
          console.error('Failed to fetch team member:', error);
        }
      }
    };

    checkEditMode();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blog_id = window.location.pathname
        .split('/blogs/')[1]
        ?.split('/')[0];

      if (isEditMode && memberId) {
        await teamMembersService.updateTeamMember(memberId, {
          blog_id,
          email,
          role
        });
      } else {
        await teamMembersService.createTeamMember({
          blog_id,
          email,
          role
        });
      }
      window.location.href = `/blogs/${blog_id}/team`;
    } catch (error) {
      console.error(`Failed to ${isEditMode ? 'update' : 'create'} team member:`, error);
    }
  };

  return (
    <MainPanel className="min-h-screen flex bg-gray-50" style={{marginTop: "3%"}}>
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="flex items-center text-[#f4a261] hover:text-[#e76f51] transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">
                {isEditMode ? 'Edit Team Member' : 'Invite Team Member'}
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                  placeholder="Enter team member's email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors"
                >
                  {isEditMode ? 'Update Team Member' : 'Send Invitation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainPanel>
  );
};
