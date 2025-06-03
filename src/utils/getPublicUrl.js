import { supabase } from '../supabaseClient';

/**
 * Mendapatkan public URL file dari Supabase Storage
 * @param {string} pathInBucket - Path lengkap relatif terhadap bucket (contoh: 'abc123/Build/Build.loader.js')
 * @param {string} bucketName - Nama bucket Supabase (default 'games')
 * @returns {string|null} Public URL file, atau null jika gagal
 */
export function getPublicUrl(pathInBucket, bucketName = 'games') {
    const { data, error } = supabase.storage.from(bucketName).getPublicUrl(pathInBucket);
    if (error) {
        console.error(`Gagal mendapatkan URL untuk: ${pathInBucket}`, error.message);
        return null;
    }
    return data.publicUrl;
}
