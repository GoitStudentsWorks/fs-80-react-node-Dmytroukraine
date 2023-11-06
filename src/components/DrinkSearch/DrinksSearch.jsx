import { useCallback, useState } from 'react';
import Select from 'react-select';
import { useDrinkSearchQuery } from '../../redux/searchOperations';
import { useGetCategoriesListQuery } from '../../redux/filtersSlice/filtersSlice';
import { useGetIngredientsListQuery } from '../../redux/filtersSlice/filtersSlice';
import { useGetCategoryQuery } from '../../redux/drinkSlice/drinksSlice';
import { useGetIngredientQuery } from '../../redux/drinkSlice/drinksSlice';
import css from './DrinksSearch.module.css';
import { FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { DrinksListItem } from './DrinksListItem';

const DrinkSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const ingredient = searchParams.get('ingredient');
  const [query, setQuery] = useState('');

  const { data = {}, isLoading } = useDrinkSearchQuery(query);

  const { data: categoryList } = useGetCategoriesListQuery();
  const { data: ingredientsList } = useGetIngredientsListQuery();

  const [categories, setCategory] = useState('');
  const { data: categoryData } = useGetCategoryQuery(categories);

  const [ingred, setIngred] = useState('');
  const { data: ingredientData } = useGetIngredientQuery(ingred);

  let categoriesOptions = [];
  let ingredientsOptions = [];

  const [drinksArr, setDrinksArr] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = inputValue => {
    setInputValue(inputValue);
  };

  const onHandleSubmit = e => {
    e.preventDefault();
  };
  const onHandleChange = e => {
    setQuery(e.target.value);
    setDrinksArr(data);
  };

  const handleSetSearchtParams = useCallback(
    (key, value) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, value);

      console.log('VALUE: ', value.toString());
      setSearchParams(newSearchParams);

      if (key === 'category') {
        setCategory(value.toString());
        setDrinksArr(categoryData);
        console.log('setCategory + ', categoryData);
        return;
      }

      setInputValue(value.toString());
      setIngred(value.toString());
      setDrinksArr(ingredientData);
      console.log('setIngred  + ');
    },
    // eslint-disable-next-line
    [searchParams, setSearchParams]
  );

  console.log('categoryData: ', categoryData);
  console.log('ingredientData: : ', ingredientData);

  if (categoryList && ingredientsList) {
    categoryList.forEach(item =>
      categoriesOptions.push({ value: item, label: item })
    );
    ingredientsList.forEach(item =>
      ingredientsOptions.push({ value: item.title, label: item.title })
    );
  }

  const style = {
    control: baseStyles => ({
      ...baseStyles,
      borderRadius: '200px',
      backgroundColor: '#161F37',
      boxShadow: 'none',
      border: 0,
      width: 'auto',
      padding: '14px 24px',
    }),
    menu: baseStyles => ({
      ...baseStyles,
      borderRadius: '20px',
      backgroundColor: '#161F37',
      width: '199px',
      marginTop: '4px',
      '&::-webkit-scrollbar': {
        width: '0px',
      },
    }),
    menuList: baseStyles => ({
      ...baseStyles,
      '&::-webkit-scrollbar': {
        width: '0px',
      },
    }),
    dropdownIndicator: (baseStyles, { isFocused }) => ({
      ...baseStyles,
      color: 'var(--white-color)',
      '&:hover': {
        color: 'var(--white-color)',
      },
      transition: 'transform 0.25s ease-out',
      transform: isFocused && 'rotate(180deg)',
    }),
    indicatorSeparator: baseStyles => ({
      ...baseStyles,
      display: 'none',
    }),
    placeholder: baseStyles => ({
      ...baseStyles,
      color: 'white',
    }),
    input: baseStyles => ({
      ...baseStyles,
      color: 'white',
    }),
    option: baseStyles => ({
      ...baseStyles,
      backgroundColor: 'none',
      color: 'var(--white-fifty-color)',

      '&:hover': {
        color: 'var(--white-color)',
      },
    }),
    singleValue: baseStyles => ({
      ...baseStyles,
      color: 'white',
    }),
  };

  return { isLoading } ? (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.formWrapper}>
          <form onSubmit={onHandleSubmit}>
            <DebounceInput
              type="text"
              minLength={2}
              debounceTimeout={1000}
              value={query}
              placeholder="Type to search"
              onChange={onHandleChange}
            />
          </form>
          <FiSearch className={css.icon} />

          <Select
            classNamePrefix="drinks-page-selector"
            placeholder="Select..."
            defaultValue={{
              value: 'All categories',
              label: 'All categories',
            }}
            name="category"
            value={{ value: '', label: category || 'All categories' }}
            options={[{ value: 'All categories' }, ...categoriesOptions]}
            onChange={data => handleSetSearchtParams('category', data.value)}
            inputValue={inputValue}
            onInputChange={evt => handleInputChange(evt)}
            // onClick={(evt) => console.log('onClick: ', evt)}
            styles={style}
          />
          <Select
            classNamePrefix="drinks-page-selector"
            placeholder="Select..."
            defaultValue={{
              value: 'All ingredients',
              label: 'All ingredients',
            }}
            name="ingredient"
            value={{ value: '', label: ingredient || 'All ingredients' }}
            options={[{ value: 'All ingredients' }, ...ingredientsOptions]}
            onChange={data => handleSetSearchtParams('ingredient', data.value)}
            inputValue={inputValue}
            onInputChange={evt => handleInputChange(evt)}
            styles={style}
          />
        </div>
        <div>
          <ul className={css.drinkList}>
            {drinksArr?.drinks?.map(({ _id, drink, drinkThumb }) => {
              return (
                <DrinksListItem
                  key={_id}
                  pictureURL={drinkThumb}
                  title={drink}
                  id={_id}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  ) : null;
};

export default DrinkSearch;
