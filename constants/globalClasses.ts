import { classnames } from './globaltypes';

const classes: classnames = {
  mainContainer: 'overflow-auto px-0 sm:px-[5%] lg:px-[20%] xl:px-[25%] 2xl:px-[30%]',
  headerContainer: 'flex justify-center items-center relative mx-4 my-4 sm:my-8 sm:mx-0',
  productsContainer: 'flex justify-between flex-wrap h-screen w-full',
  heading: 'text-2xl font-bold',
  topImageContainer:
    'h-10 w-10 flex justify-center items-center border-[1px] rounded-full bg-gray-200 absolute right-0',
  topImage: 'h-4 w-4',
};

export default classes;
