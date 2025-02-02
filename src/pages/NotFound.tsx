import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Star, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8 text-center">
          {/* Decorative elements */}
          <div className="relative mb-8">
            <Moon className="w-24 h-24 mx-auto text-amber-500" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
            <div className="absolute top-1/4 right-1/4">
              <Star className="w-4 h-4 text-yellow-400 animate-pulse delay-75" />
            </div>
            <div className="absolute bottom-1/4 left-1/4">
              <Star className="w-5 h-5 text-yellow-400 animate-pulse delay-150" />
            </div>
          </div>

          {/* Error message */}
          <h1 className="text-6xl font-bold text-amber-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t('notFound.title', 'Page Not Found')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('notFound.description', 'The stars have aligned, but this page seems to be in another constellation.')}
          </p>

          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('notFound.backHome', 'Back to Home')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
