import { supabase } from '../supabaseClient';

/**
 * Upload file ke Supabase Storage
 * @param {File} file - File yang ingin di-upload
 * @param {string} folderPath - Path di dalam bucket (tanpa bucket name)
 * @param {string} bucketName - Nama bucket di Supabase (default: 'games')
 * @param {string} fileName - Nama file akhir di storage
 * @returns {string|null} Public URL file, atau null jika gagal
 */
export async function uploadToStorage(file, folderPath, fileName, bucketName = 'games') {
  const fullPath = `${folderPath}/${fileName}`;

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(fullPath, file, {
      upsert: true,
      cacheControl: '3600',
    });

  if (error) {
    console.error(`Gagal upload: ${fullPath}`, error.message);
    return null;
  }

  // Ambil URL publik
  const { data } = supabase.storage.from(bucketName).getPublicUrl(fullPath);
  return data?.publicUrl || null;
}
