export const uploadFile = async (url: string, file: any) => {
  try {
    const formData = new FormData();

    formData.append("files", file);

    const response = await fetch(new URL(`${url}/api/Media/uploads`), {
      method: 'POST',
      body: formData,
      headers: {
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'File upload failed');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
