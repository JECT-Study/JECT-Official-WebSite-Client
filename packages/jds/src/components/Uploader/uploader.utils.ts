export const validateAcceptedFile = (accept: string[], file: File) => {
  return accept.some(type => {
    if (type.startsWith('.')) return file.name.endsWith(type);
    return file.type === type || file.type.startsWith(`${type}/`);
  });
};
