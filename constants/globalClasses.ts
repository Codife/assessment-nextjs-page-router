import { classnames } from "./globaltypes";

const classes: classnames = {
  mainContainer: "px-0 sm:px-[5%] lg:px-[20%] xl:px-[25%] 2xl:px-[30%] pb-10",
  headerContainer:
    "flex justify-center items-center relative mx-4 my-4 sm:my-8 sm:mx-0",
  productsContainer: "flex justify-between flex-wrap h-full w-full",
  heading: "text-2xl font-bold",
  topImageContainer:
    "h-10 w-10 flex justify-center items-center border-[1px] rounded-full bg-gray-200 absolute right-0",
  topImage: "h-4 w-4",
  productsEnded: "my-20 flex justify-center items-center",
  detailImageContainer: "flex justify-center items-center bg-gray-200",
  detailImage: "w-[50%] sm:w-[40%] lg:w-[45%] xl:w-[45%] 2xl:w-[40%] h-auto object-cover"
};

export default classes;
