export const searchFilter = (
  data,
  searchTerm,
  fields = []
) => {
  if (!searchTerm) return data;

  const term = searchTerm.toLowerCase();

  return data.filter((item) =>
    fields.some((field) =>
      item[field]
        ?.toString()
        .toLowerCase()
        .includes(term)
    )
  );
};