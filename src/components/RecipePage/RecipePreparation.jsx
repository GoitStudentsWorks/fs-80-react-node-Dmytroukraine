// import stubDrink from '../../images/recipePageCoctail@2x.jpg';

// export const RecipePreparation = ({ data }) => {
//   return (
//     <>
    
//       <div>
      
//         <img src={stubDrink} alt="Coctail Image" width="631" height="480" />
//       </div>
//       <div>
//         <p>{data}</p>
//       </div>
//     </>
//   );
// };

import stubDrink from '../../images/recipePageCoctail@2x.jpg';

export const RecipePreparation = ({ data }) => {
  return (
    <>
      <div>
        {/* заглушка */}
      
        <img src={stubDrink} alt="Coctail" width="631" height="480" />
      </div>
      <div>
        <p>{data}</p>
      </div>
    </>
  );
};

