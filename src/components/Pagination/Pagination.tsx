function Pagination() {
  return (
    <div className="text-center mt-6">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <div className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-violet-500 bg-gray-50 border border-e-0 border-violet-500 rounded-s-lg cursor-pointer hover:text-pink-500">
              Previous
            </div>
          </li>
          {[1, 2, 3, 4, 5].map((item) => (
            <li key={item}>
              <div className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-violet-500 bg-gray-50 border border-violet-500 cursor-pointer hover:text-pink-500">
                {item}
              </div>
            </li>
          ))}

          <li>
            <div className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-violet-500 bg-gray-50 border border-violet-500 rounded-e-lg cursor-pointer hover:text-pink-500">
              Next
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
