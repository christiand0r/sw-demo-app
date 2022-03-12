//Helper  for detect if a word is plural or singular
export default (iterable, separator) => {
  if (iterable instanceof Array && Array.isArray(iterable)) {
    if (separator)
      throw console.warn('Separator params not is valid with iterables Array');

    return iterable.length > 1;
  } else {
    return iterable.split(separator).length > 1;
  }
};
