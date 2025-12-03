export const validateAcceptedFile = (accept: string[], file: File) => {
  const fileName = file.name.toLowerCase();
  const extension = fileName.includes(".") ? "." + fileName.split(".").pop() : "";
  const mime = file.type;

  return accept.some(type => {
    const normalized = type.toLowerCase();

    if (normalized.startsWith(".")) return extension === normalized;

    if (mime) return mime === normalized || mime.startsWith(`${normalized}/`);

    if (!mime && extension) {
      if (normalized.includes("/")) return false;

      return extension === `.${normalized}`;
    }

    return false;
  });
};
