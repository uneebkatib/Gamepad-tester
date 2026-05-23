// String utilities
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')

export const truncate = (str: string, length: number) =>
  str.length > length ? str.slice(0, length) + '...' : str
