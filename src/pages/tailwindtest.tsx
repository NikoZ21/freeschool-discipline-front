export default function TailwindTest() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-blue-500 text-white p-2 rounded-md cursor-pointer">
        შესვლა
      </div>
      <div className="bg-red-500 text-white p-2 rounded-md cursor-pointer">
        გამოსვლა
      </div>
      <div className="bg-green-500 text-white p-2 rounded-xl w-1/2 cursor-pointer">
        დამატება
      </div>
      <h1 className="text-2xl font-bold bg-red-500 text-white p-4">
        დისციპლინარული ბაზა
      </h1>
    </div>
  );
}
