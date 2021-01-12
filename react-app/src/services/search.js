export const getSearchResults = async (search_input) => {
    const res = await fetch(`/api/search/${search_input}`);
    return await res.json();
}