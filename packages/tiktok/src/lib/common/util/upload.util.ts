export const extractChunkUploadPlan = (fileBuffer: Buffer | Blob) => {
  const totalBytes =
    fileBuffer instanceof Blob ? fileBuffer.size : fileBuffer.length;

  const MIN_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_CHUNK_SIZE = 64 * 1024 * 1024; // 64MB
  const FINAL_CHUNK_MAX = 128 * 1024 * 1024; // 128MB
  const MAX_CHUNKS = 1000;

  // If video smaller than 5MB, upload whole as one chunk
  if (totalBytes < MIN_CHUNK_SIZE) {
    return {
      total_chunk_count: 1,
      chunk_size: totalBytes,
      size: totalBytes,
      chunks: [
        {
          index: 0,
          start: 0,
          end: totalBytes - 1,
          contentRange: `bytes 0-${totalBytes - 1}/${totalBytes}`,
        },
      ],
    };
  }

  // Default chunk size - choose a value between MIN and MAX
  let chunkSize = 10 * 1024 * 1024;

  // Make sure chunkSize fits min/max limits
  chunkSize = Math.max(MIN_CHUNK_SIZE, Math.min(chunkSize, MAX_CHUNK_SIZE));

  // Calculate total_chunk_count using floor (per rules)
  let totalChunkCount = Math.floor(totalBytes / chunkSize);

  // Ensure minimum 1 chunk
  totalChunkCount = Math.max(totalChunkCount, 1);

  // Cap at MAX_CHUNKS
  if (totalChunkCount > MAX_CHUNKS) {
    // Adjust chunkSize to reduce chunk count <= 1000
    chunkSize = Math.ceil(totalBytes / MAX_CHUNKS);
    chunkSize = Math.min(chunkSize, MAX_CHUNK_SIZE);
    totalChunkCount = Math.floor(totalBytes / chunkSize);
  }

  // Build chunk ranges:
  // All chunks except final chunk have chunkSize bytes
  // Final chunk = remaining bytes, can be larger than chunkSize, up to 128MB

  const chunks = [];
  let offset = 0;

  for (let index = 0; index < totalChunkCount; index++) {
    const start = offset;
    let end = start + chunkSize - 1;

    // If last chunk, merge trailing bytes into it
    if (index === totalChunkCount - 1) {
      end = totalBytes - 1;

      const lastChunkSize = end - start + 1;
      if (lastChunkSize > FINAL_CHUNK_MAX) {
        // If last chunk too big, throw error or adjust (optional)
        throw new Error(
          `Last chunk size ${lastChunkSize} exceeds max allowed ${FINAL_CHUNK_MAX}`
        );
      }
    }

    chunks.push({
      index,
      start,
      end,
      contentRange: `bytes ${start}-${end}/${totalBytes}`,
    });

    offset = end + 1;
  }

  return {
    total_chunk_count: totalChunkCount,
    chunk_size: chunkSize,
    size: totalBytes,
    chunks,
  };
};
