import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'app/components/Table';
import { DeleteTeamMemberModal } from './DeleteTeamMemberModal';
import { teamMembersService } from 'services/teammembers.service';

interface TeamMember {
  id: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  BlogId: number;
  isOwner: boolean;
  name?: string;
  users: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
}

interface DeleteTeamMemberModalProps {
  item: {
    id: string;
    createdAt: string;
    updatedAt: string;
    UserId: number;
    BlogId: number;
    isOwner: boolean;
    name: string;
    users: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
    };
  };
  onClose: () => void;
  isOpen: boolean;
}

export const TeamMembersListing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { blog_id } = useParams<{ blog_id: string }>();

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadMoreClicks, setLoadMoreClicks] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    teamMembersService
      .getTeamMembers({ blog_id })
      .then(response => {
        if (mounted) {
          setTeamMembers(response.teammembers);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [blog_id, loadMoreClicks]);

  const EditButton = ({ item }) => (
    <Link to={`/blogs/${blog_id}/team-members/${item.id}`}>
      <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a365d]">
        Edit
      </button>
    </Link>
  );

  const DeleteModalWrapper = (props: DeleteTeamMemberModalProps) => {
    if (!props.item) return null;
    return <DeleteTeamMemberModal {...props} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8" style={{ marginTop: '3%' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => history.goBack()}
              className="flex items-center text-[#1a365d] hover:text-[#2c5282] transition-colors"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              Team Members
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search team members..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <Link to={`/blogs/${blog_id}/team-members/create`}>
              <button className="px-4 py-2 bg-[#1a365d] hover:bg-[#2c5282] text-white rounded-lg transition-colors">
                Add Team Member
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <Table
            type="teammember"
            fields={[
              {
                key: 'id',
                label: '#',
                render: value => (
                  <span className="text-gray-400">#{value}</span>
                ),
              },
              { key: 'users.first_name', label: 'First Name' },
              { key: 'users.last_name', label: 'Last Name' },
              { key: 'users.email', label: 'Email' },
              {
                key: 'isOwner',
                label: 'Role',
                render: value => (
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      value
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {value ? 'Owner' : 'Member'}
                  </span>
                ),
              },
            ]}
            EditButton={EditButton}
            DeleteModal={DeleteModalWrapper}
            data={teamMembers}
            loading={loading}
            onLoadMore={() => setLoadMoreClicks(prev => prev + 1)}
          />
        </div>
      </div>
    </div>
  );
};
