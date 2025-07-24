import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../api';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchProfile()
      .then(data => {
        if (data && data._id) {
          setUser(data);
        } else {
          setError(data.message || 'Failed to fetch user info');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch user info');
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    if (!loading && (!user || !user._id || error)) {
      navigate('/login');
    }
  }, [loading, user, error, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChanged'));
    navigate('/login');
  };

  if (loading) {
    return <div className="container py-5 mt-5 text-center"><h2>Loading...</h2></div>;
  }

  if (!user || !user._id) {
    return null; // Don't render anything if not valid
  }

  return (
    <div className="container py-5 mt-5 d-flex justify-content-center align-items-center" style={{minHeight: '70vh'}}>
      <style>{`
        .profile-card {
          max-width: 400px;
          width: 100%;
          border-radius: 18px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
          background: #fff;
          padding: 2.5rem 2rem 2rem 2rem;
          margin: 0 auto;
        }
        .profile-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: #6c757d;
          margin: 0 auto 1.5rem auto;
        }
        .profile-info {
          font-size: 1.1rem;
          margin-bottom: 1.2rem;
        }
        .profile-label {
          color: #888;
          font-weight: 500;
          margin-right: 0.5rem;
        }
        .profile-logout-btn {
          width: 100%;
          margin-top: 1.5rem;
          font-size: 1.1rem;
          padding: 0.7rem 0;
          border-radius: 8px;
          background: linear-gradient(90deg, #ff5858 0%, #f857a6 100%);
          color: #fff;
          border: none;
          box-shadow: 0 2px 8px rgba(248,87,166,0.10);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .profile-logout-btn:hover, .profile-logout-btn:focus {
          background: linear-gradient(90deg, #f857a6 0%, #ff5858 100%);
          box-shadow: 0 4px 16px rgba(248,87,166,0.18);
          color: #fff;
          transform: translateY(-2px) scale(1.03);
        }
      `}</style>
      <div className="profile-card">
        <div className="profile-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : '?'}
        </div>
        <h3 className="text-center mb-4">My Profile</h3>
        <div className="profile-info"><span className="profile-label">Name:</span> {user.name}</div>
        <div className="profile-info"><span className="profile-label">Email:</span> {user.email}</div>
        <div className="profile-info"><span className="profile-label">Role:</span> {user.role}</div>
        {/* Add more user info here as needed */}
        <button className="btn btn-danger profile-logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile; 