
import React from 'react';
import { X } from 'lucide-react';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

type AuthType = 'signin' | 'signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  authType: AuthType;
  onSwitchAuthType: (type: AuthType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  authType, 
  onSwitchAuthType 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 flex justify-end">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="px-4 pb-6">
          {authType === 'signin' ? (
            <SignIn isModal onSwitchAuthType={() => onSwitchAuthType('signup')} />
          ) : (
            <SignUp isModal onSwitchAuthType={() => onSwitchAuthType('signin')} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
