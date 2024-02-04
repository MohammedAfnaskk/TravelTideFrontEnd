import ScaleLoader from "react-spinners/ScaleLoader";

export default function Loading() {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 bg-gray-200'>
    <ScaleLoader color="#f75940"   />
      </div>
 
  );
}
