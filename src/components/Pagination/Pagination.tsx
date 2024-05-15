function Pagination() {
  return (
    <div className="text-center mt-6">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <div className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white/10 border border-e-0 border-white/5 rounded-s-lg hover:bg-white/5 hover:text-white cursor-pointer ">
              Previous
            </div>
          </li>
          {[1, 2, 3, 4, 5].map((item) => (
            <li>
              <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white/10 border border-white/5 hover:bg-white/5 hover:text-white cursor-pointer">
                {item}
              </div>
            </li>
          ))}

          <li>
            <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white/10 border border-white/5 rounded-e-lg hover:bg-white/5 hover:text-white cursor-pointer">
              Next
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
