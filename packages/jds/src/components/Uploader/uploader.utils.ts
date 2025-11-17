export const validateAcceptedFile = (accept: string[], file: File) => {
  return accept.some(type => {
    if (type.startsWith('.')) return file.name.endsWith(type.toLowerCase());
    return file.type === type || file.type.startsWith(`${type}/`);
  });
};
