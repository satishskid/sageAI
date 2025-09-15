import React, { useState } from 'react';
import { WhitelistAdmin } from '../utils/whitelistAdmin';

interface AdminWhitelistManagerProps {
  adminEmail: string;
}

const AdminWhitelistManager: React.FC<AdminWhitelistManagerProps> = ({ adminEmail }) => {
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [bulkEmails, setBulkEmails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const admin = new WhitelistAdmin(adminEmail);

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleAddUser = async () => {
    if (!email.trim()) {
      showMessage('Please enter an email address', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await admin.addUser(email.trim(), notes.trim() || undefined);
      showMessage(`Successfully added ${email} to whitelist`, 'success');
      setEmail('');
      setNotes('');
    } catch (error) {
      showMessage(`Failed to add user: ${error}`, 'error');
    }
    setIsLoading(false);
  };

  const handleRemoveUser = async () => {
    if (!email.trim()) {
      showMessage('Please enter an email address', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await admin.removeUser(email.trim());
      showMessage(`Successfully removed ${email} from whitelist`, 'success');
      setEmail('');
    } catch (error) {
      showMessage(`Failed to remove user: ${error}`, 'error');
    }
    setIsLoading(false);
  };

  const handleCheckUser = async () => {
    if (!email.trim()) {
      showMessage('Please enter an email address', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const isWhitelisted = await admin.checkUser(email.trim());
      showMessage(
        `User ${email} is ${isWhitelisted ? 'WHITELISTED' : 'NOT WHITELISTED'}`,
        isWhitelisted ? 'success' : 'error'
      );
    } catch (error) {
      showMessage(`Failed to check user: ${error}`, 'error');
    }
    setIsLoading(false);
  };

  const handleBulkAdd = async () => {
    if (!bulkEmails.trim()) {
      showMessage('Please enter email addresses', 'error');
      return;
    }

    const emails = bulkEmails
      .split('\n')
      .map(email => email.trim())
      .filter(email => email && email.includes('@'));

    if (emails.length === 0) {
      showMessage('No valid email addresses found', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await admin.bulkAddUsers(emails, notes.trim() || undefined);
      showMessage(`Successfully processed ${emails.length} email addresses`, 'success');
      setBulkEmails('');
      setNotes('');
    } catch (error) {
      showMessage(`Bulk operation failed: ${error}`, 'error');
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🔐 Vedanta BYOK - Whitelist Management
        </h2>
        <p className="text-gray-600">
          Manage user access to the Vedanta BYOK platform. Only whitelisted users can sign in.
        </p>
        <p className="text-sm text-blue-600 mt-1">
          Admin: {adminEmail}
        </p>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          messageType === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Single User Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Single User Management</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Beta tester, Faculty member"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddUser}
              disabled={isLoading}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              ✅ Add User
            </button>
            <button
              onClick={handleCheckUser}
              disabled={isLoading}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              🔍 Check User
            </button>
            <button
              onClick={handleRemoveUser}
              disabled={isLoading}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              ❌ Remove User
            </button>
          </div>
        </div>

        {/* Bulk User Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Bulk User Management</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Addresses (one per line)
            </label>
            <textarea
              value={bulkEmails}
              onChange={(e) => setBulkEmails(e.target.value)}
              placeholder={`user1@example.com\nuser2@example.com\nuser3@example.com`}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleBulkAdd}
            disabled={isLoading}
            className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            📝 Bulk Add Users
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">📋 Instructions:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Add User:</strong> Enter email and optional notes, then click "Add User"</li>
          <li>• <strong>Check User:</strong> Enter email and click "Check User" to see if they're whitelisted</li>
          <li>• <strong>Remove User:</strong> Enter email and click "Remove User" to revoke access</li>
          <li>• <strong>Bulk Add:</strong> Enter multiple emails (one per line) and click "Bulk Add Users"</li>
          <li>• <strong>Note:</strong> Users must be whitelisted before they can sign in with Google</li>
        </ul>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWhitelistManager;
