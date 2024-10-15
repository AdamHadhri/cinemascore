import React from 'react'

function Search() {
    return (
        <AutoComplete
            popupClassName="certain-category-search-dropdown"
            popupMatchSelectWidth={500}
            style={{ width: 250 }}
            onSearch={(value) => {
                setPhrase(value);
            }}
            placeholder="Search for a movie"
            options={options}
            size="large">
            <Input.Search
                onSearch={() => { setSearched(true) }}
                size="large"
                enterButton/>
        </AutoComplete>
    )
}

export default Search