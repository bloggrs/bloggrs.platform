import React from 'react';

interface SaveButtonProps {
  onClick?: () => Promise<void> | void;
  disabled?: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  onClick = () => {},
  disabled = false,
}) => {
  const [saving, setSaving] = React.useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onClick();
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={disabled || saving}
      className="px-4 py-2 bg-[#f4a261] hover:bg-[#e76f51] text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 shadow-sm"
    >
      {saving && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {saving ? 'Saving...' : 'Save'}
    </button>
  );
};
