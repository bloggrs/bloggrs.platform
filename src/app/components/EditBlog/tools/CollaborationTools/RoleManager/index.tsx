import React, { useState } from 'react';
import { Select, Button, Badge, Tooltip } from 'antd';

interface Role {
  id: string;
  name: string;
  permissions: string[];
  color?: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  canReview?: boolean;
}

interface RoleManagerProps {
  members: TeamMember[];
  roles: Role[];
  onUpdate: (members: TeamMember[]) => void;
}

export const RoleManager: React.FC<RoleManagerProps> = ({
  members,
  roles,
  onUpdate,
}) => {
  const [editingMember, setEditingMember] = useState<string | null>(null);

  const handleRoleChange = (memberId: string, newRoleId: string) => {
    const updatedMembers = members.map(member => {
      if (member.id === memberId) {
        return {
          ...member,
          role: roles.find(r => r.id === newRoleId)!,
          // Automatically grant review permission for admin/editor roles
          canReview: roles
            .find(r => r.id === newRoleId)
            ?.permissions.includes('review'),
        };
      }
      return member;
    });
    onUpdate(updatedMembers);
    setEditingMember(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Team Roles</h3>
          <span className="text-sm text-gray-500">
            {members.length} member{members.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-3">
          {members.map(member => (
            <div
              key={member.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {member.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {editingMember === member.id ? (
                  <Select
                    value={member.role.id}
                    onChange={value => handleRoleChange(member.id, value)}
                    autoFocus
                    onBlur={() => setEditingMember(null)}
                  >
                    {roles.map(role => (
                      <Select.Option key={role.id} value={role.id}>
                        {role.name}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Tooltip
                    title={`Permissions: ${member.role.permissions.join(', ')}`}
                  >
                    <Badge
                      onClick={() => setEditingMember(member.id)}
                      color={member.role.color}
                      className="cursor-pointer"
                    >
                      {member.role.name}
                    </Badge>
                  </Tooltip>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
