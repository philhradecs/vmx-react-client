function combineSearchData(data) {
  return data.reduce((acc, curr) => {
    const hasItems = curr.items > 1;
    return {
      ...curr,
      items: acc.items + curr.items,
      pages: hasItems ? acc.pages + curr.pages : acc.pages,
      results: hasItems ? acc.results.concat(curr.results) : acc.results
    };
  });
}

function readStatsFromData(data) {
  const { items, page, pages } = data;
  return { items, page, pages };
}

export { combineSearchData, readStatsFromData };
