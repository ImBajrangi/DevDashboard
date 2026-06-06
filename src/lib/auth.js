import { db } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';

// Hardcoded initial admins as specified by user requirements
export const INITIAL_ADMINS = [
  'sharmagharsh1@gmail.com',
  'mdark4025@gmail.com',
  'vrindopnishad@gmail.com'
];

/**
 * Checks if a given email is a hardcoded initial admin.
 * @param {string} email 
 * @returns {boolean}
 */
export function isInitialAdmin(email) {
  if (!email) return false;
  return INITIAL_ADMINS.includes(email.toLowerCase().trim());
}

/**
 * Checks the dashboard access status of a user.
 * Returns: { status: 'granted' | 'pending' | 'revoked' | 'none', role: 'admin' | 'editor' | 'viewer' }
 */
export async function checkUserAccess(email) {
  if (!email) return { status: 'none', role: 'viewer' };
  const cleanEmail = email.toLowerCase().trim();
  
  // Hardcoded admins always have full access and admin role
  if (isInitialAdmin(cleanEmail)) {
    return { status: 'granted', role: 'admin' };
  }
  
  try {
    const docRef = doc(db, 'dashboard_access', cleanEmail);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        status: data.status || 'none',
        role: data.role || 'viewer'
      };
    }
  } catch (err) {
    console.error('Error checking user access:', err);
  }
  
  return { status: 'none', role: 'viewer' };
}

/**
 * Creates a pending access request for a user.
 */
export async function requestDashboardAccess(user) {
  if (!user || !user.email) return false;
  const cleanEmail = user.email.toLowerCase().trim();
  
  try {
    const docRef = doc(db, 'dashboard_access', cleanEmail);
    // Use setDoc with merge: true to avoid overwriting existing details if they just request again
    await setDoc(docRef, {
      email: cleanEmail,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      status: 'pending',
      role: 'viewer',
      requestedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Error requesting access:', err);
    return false;
  }
}

/**
 * Gets all user access entries (admins only).
 */
export async function getAllAccessEntries() {
  try {
    const querySnapshot = await getDocs(collection(db, 'dashboard_access'));
    const entries = [];
    querySnapshot.forEach((doc) => {
      entries.push({ id: doc.id, ...doc.data() });
    });
    return entries;
  } catch (err) {
    console.error('Error getting access entries:', err);
    return [];
  }
}

/**
 * Grants or updates access for a user.
 */
export async function grantDashboardAccess(email, role = 'viewer', adminEmail) {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();
  
  try {
    const docRef = doc(db, 'dashboard_access', cleanEmail);
    await setDoc(docRef, {
      email: cleanEmail,
      status: 'granted',
      role,
      grantedBy: adminEmail,
      grantedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Error granting access:', err);
    return false;
  }
}

/**
 * Revokes or removes access for a user.
 */
export async function revokeDashboardAccess(email, adminEmail) {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();
  
  try {
    const docRef = doc(db, 'dashboard_access', cleanEmail);
    await setDoc(docRef, {
      status: 'revoked',
      revokedBy: adminEmail,
      revokedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error('Error revoking access:', err);
    return false;
  }
}

/**
 * Permanently deletes a request or entry.
 */
export async function deleteAccessEntry(email) {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();
  
  try {
    const docRef = doc(db, 'dashboard_access', cleanEmail);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error('Error deleting access entry:', err);
    return false;
  }
}
