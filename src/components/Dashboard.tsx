import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950">
      <nav className="bg-indigo-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">AstroLumina</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-white">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{user?.profile?.username || user?.email}</span>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Profile Information</h2>
            <button
              onClick={() => navigate('/edit-profile')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 text-gray-900">{user?.email}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1 text-gray-900">{user?.profile?.username || 'Not set'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 text-gray-900">{user?.profile?.full_name || 'Not set'}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
