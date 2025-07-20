/**
 * User utility functions
 */

/**
 * Get user initials from user metadata or email
 * @param {Object} user - Supabase user object
 * @returns {string} - User initials (max 2 characters)
 */
export function getUserInitials(user) {
  if (!user) return '';
  
  // Try to get from full_name in user_metadata
  if (user.user_metadata?.full_name) {
    const nameParts = user.user_metadata.full_name.trim().split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return nameParts[0].substring(0, 2).toUpperCase();
  }
  
  // Try to get from name in user_metadata
  if (user.user_metadata?.name) {
    const nameParts = user.user_metadata.name.trim().split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return nameParts[0].substring(0, 2).toUpperCase();
  }
  
  // Fallback to email
  if (user.email) {
    const emailParts = user.email.split('@')[0].split('.');
    if (emailParts.length >= 2) {
      return `${emailParts[0][0]}${emailParts[1][0]}`.toUpperCase();
    }
    return emailParts[0].substring(0, 2).toUpperCase();
  }
  
  return 'U';
}

/**
 * Get user avatar URL from metadata
 * @param {Object} user - Supabase user object  
 * @returns {string|null} - Avatar URL or null
 */
export function getUserAvatarUrl(user) {
  if (!user) return null;
  
  // Try to get from various avatar fields in user_metadata
  if (user.user_metadata?.avatar_url) {
    return user.user_metadata.avatar_url;
  }
  
  if (user.user_metadata?.picture) {
    return user.user_metadata.picture;
  }
  
  return null;
}

/**
 * Get user display name
 * @param {Object} user - Supabase user object
 * @returns {string} - Display name
 */
export function getUserDisplayName(user) {
  if (!user) return '';
  
  // Try full_name or name from metadata
  if (user.user_metadata?.full_name) {
    return user.user_metadata.full_name;
  }
  
  if (user.user_metadata?.name) {
    return user.user_metadata.name;
  }
  
  // Fallback to email
  if (user.email) {
    return user.email.split('@')[0];
  }
  
  return 'User';
}