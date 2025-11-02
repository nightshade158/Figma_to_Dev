import { supabase } from './supabase';
import { Profile } from '../types/profile';

export async function getProfiles(): Promise<Profile[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
}

export async function getProfileById(id: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

/* export async function resetUnlockedProfiles() {
  const { error } = await supabase
    .from('unlocked_profiles')
    .delete()
    .neq('id', ''); // deletes all rows

  if (error) throw error;
  return true;
} */

export async function getUnlockedProfiles(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('unlocked_profiles')
      .select('profile_id');

    if (error) throw error;
    return (data || []).map((item: { profile_id: string }) => item.profile_id);
  } catch (error) {
    console.error('Error fetching unlocked profiles:', error);
    throw error;
  }
}

export async function unlockProfile(profileId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('unlocked_profiles')
      .insert({ profile_id: profileId });

    if (error) {
      if (error.code === '23505') {
        return true;
      }
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Error unlocking profile:', error);
    throw error;
  }
}

export async function isProfileUnlocked(profileId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('unlocked_profiles')
      .select('id')
      .eq('profile_id', profileId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking unlock status:', error);
    throw error;
  }
}
