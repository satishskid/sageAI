import { addUserToWhitelist, removeUserFromWhitelist, checkUserWhitelist } from '../services/firebaseService';

/**
 * Admin Utility Functions for Managing Vedanta BYOK Whitelist
 * 
 * These functions help administrators manage user access to the platform.
 * Users can only sign in if their email is in the whitelist.
 */

export class WhitelistAdmin {
  private adminEmail: string;

  constructor(adminEmail: string) {
    this.adminEmail = adminEmail;
  }

  /**
   * Add a new user to the whitelist
   */
  async addUser(email: string, notes?: string): Promise<void> {
    try {
      await addUserToWhitelist(email, this.adminEmail, notes);
      console.log(`✅ Successfully added ${email} to whitelist`);
    } catch (error) {
      console.error(`❌ Failed to add ${email} to whitelist:`, error);
      throw error;
    }
  }

  /**
   * Remove a user from the whitelist
   */
  async removeUser(email: string): Promise<void> {
    try {
      await removeUserFromWhitelist(email);
      console.log(`✅ Successfully removed ${email} from whitelist`);
    } catch (error) {
      console.error(`❌ Failed to remove ${email} from whitelist:`, error);
      throw error;
    }
  }

  /**
   * Check if a user is whitelisted
   */
  async checkUser(email: string): Promise<boolean> {
    try {
      const isWhitelisted = await checkUserWhitelist(email);
      console.log(`🔍 User ${email} is ${isWhitelisted ? 'WHITELISTED' : 'NOT WHITELISTED'}`);
      return isWhitelisted;
    } catch (error) {
      console.error(`❌ Failed to check ${email}:`, error);
      return false;
    }
  }

  /**
   * Bulk add users to whitelist
   */
  async bulkAddUsers(emails: string[], notes?: string): Promise<void> {
    console.log(`📝 Adding ${emails.length} users to whitelist...`);
    
    for (const email of emails) {
      try {
        await this.addUser(email, notes);
      } catch (error) {
        console.error(`Failed to add ${email}:`, error);
      }
    }
    
    console.log('✅ Bulk operation completed');
  }
}

// Example usage:
/*
const admin = new WhitelistAdmin('admin@yourdomain.com');

// Add single user
await admin.addUser('user@example.com', 'Beta tester');

// Add multiple users
await admin.bulkAddUsers([
  'teacher1@school.edu',
  'teacher2@school.edu',
  'student1@university.edu'
], 'Educational institution access');

// Check user status
await admin.checkUser('user@example.com');

// Remove user
await admin.removeUser('user@example.com');
*/
